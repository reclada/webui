#!/bin/bash

__DIR="$( realpath "$( dirname "${BASH_SOURCE[0]}" )" )"
export BASE_URI="/${DOMINO_PROJECT_OWNER}/${DOMINO_PROJECT_NAME}/r/notebookSession/${DOMINO_RUN_ID}"

## The following code copies web root to writable location and builds it
if [[ ! -d "${STATIC_ROOT}" ]] ; then
  STATIC_ROOT="$(realpath "${__DIR}/../web")"
fi
echo "STATIC_ROOT=${STATIC_ROOT}"

mkdir -p "${HOME}/web" && \
cp -rvf "${STATIC_ROOT}/." "${HOME}/web"
export STATIC_ROOT="${HOME}/web/build"

#### Build UI
## This adds PUBLIC_URI to build env, so that UI is built with correct URLs inside
export PUBLIC_URL="${BASE_URI}"
( cd "${HOME}/web" && npm install && npm run build )
_ec="$?"
if [[ ${_ec} -ne 0 ]] ; then
  echo "Web UI build failed. See messages above. Will exit." >&2
  exit ${_ec}
fi

#### Generating configs
echo "Generating PostgREST config"
env | cut -d '=' -f 1 | grep '^PGRST_' | while read -r ev; do echo "$(echo "${ev}" | sed -e 's/^PGRST_//' | tr '_' '-' | tr '[:upper:]' '[:lower:]') = \"${!ev}\"" ; done > /etc/postgrest.conf
echo "OK"

## Nginx does 3 things:
## 1. Serves UI at root path
## 2. Serves PostgREST at /api path
## 3. Proxies S3 files requests at /media path

echo "Generating Nginx config"

[[ "$DOMINO_URL" ]] && _DOMINO_CORS_STR="add_header 'Access-Control-Allow-Origin' '${DOMINO_URL}'"

cat <<-EOD > /etc/nginx/sites-enabled/default
upstream postgrest { 
  server localhost:3000;
}
server {
  listen 8888 default_server;
  listen [::]:8888 default_server;
  server_name _;
  client_max_body_size 0;
  location ~ ^${BASE_URI}/api(/?)(.*) {
    ${_DOMINO_CORS_STR};
    proxy_pass http://postgrest/\$2;
  }
  location ~ ^/api(/?)(.*) {
    ${_DOMINO_CORS_STR};
    proxy_pass http://postgrest/\$2;
  }
EOD

if [[ "$S3_MEDIA_BUCKET" ]] && [[ $S3_MEDIA_USER_AGENT ]] ; then
cat <<-EOD >> /etc/nginx/sites-enabled/default
  location ~ ^${BASE_URI}/media(/?)(.*) {
    limit_except GET {
      deny all;
    }
    ${_DOMINO_CORS_STR};
    proxy_buffering off;
    resolver ${DNS_RESOLVERS:-8.8.8.8 8.8.4.4} valid=300;
    proxy_set_header       User-Agent "${S3_MEDIA_USER_AGENT}";
    proxy_http_version     1.1;
    proxy_redirect         off;
    proxy_set_header       X-Real-IP \$remote_addr;
    proxy_set_header       X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header       Connection "";
    proxy_set_header       Authorization '';   
    proxy_set_header       Host ${S3_MEDIA_BUCKET}.s3.${AWS_DEFAULT_REGION}.amazonaws.com;
    proxy_hide_header      x-amz-id-2;
    proxy_hide_header      x-amz-request-id;
    proxy_hide_header      x-amz-meta-server-side-encryption;
    proxy_hide_header      x-amz-server-side-encryption;
    proxy_hide_header      Set-Cookie;
    proxy_ignore_headers   Set-Cookie;
    proxy_intercept_errors on;
    proxy_pass https://${S3_MEDIA_BUCKET}.s3.${AWS_DEFAULT_REGION}.amazonaws.com/\$2;
  }
  location ~ ^/media(/?)(.*) {
    limit_except GET {
      deny all;
    }
    ${_DOMINO_CORS_STR};
    proxy_buffering off;
    resolver ${DNS_RESOLVERS:-8.8.8.8 8.8.4.4} valid=300;
    proxy_set_header       User-Agent "${S3_MEDIA_USER_AGENT}";
    proxy_http_version     1.1;
    proxy_redirect         off;
    proxy_set_header       X-Real-IP \$remote_addr;
    proxy_set_header       X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header       Connection "";
    proxy_set_header       Authorization '';   
    proxy_set_header       Host ${S3_MEDIA_BUCKET}.s3.${AWS_DEFAULT_REGION}.amazonaws.com;
    proxy_hide_header      x-amz-id-2;
    proxy_hide_header      x-amz-request-id;
    proxy_hide_header      x-amz-meta-server-side-encryption;
    proxy_hide_header      x-amz-server-side-encryption;
    proxy_hide_header      Set-Cookie;
    proxy_ignore_headers   Set-Cookie;
    proxy_intercept_errors on;
    proxy_pass https://${S3_MEDIA_BUCKET}.s3.${AWS_DEFAULT_REGION}.amazonaws.com/\$2;
  }
EOD
fi

if [[ -d "$STATIC_ROOT" ]] ; then
cat <<-EOD >> /etc/nginx/sites-enabled/default
  root ${STATIC_ROOT};
  index index.html;
  location / {
    ${_DOMINO_CORS_STR};
    try_files \$uri \$uri/ =404;
  }
EOD
fi

echo '}' >> /etc/nginx/sites-enabled/default

echo "OK"
echo '================ /etc/nginx/sites-enabled/default ================'
cat /etc/nginx/sites-enabled/default
echo '=================================================================='

echo "URL for redirect: /${DOMINO_PROJECT_OWNER}/${DOMINO_PROJECT_NAME}/app"
echo "Real URL: /${DOMINO_PROJECT_OWNER}/${DOMINO_PROJECT_NAME}/r/notebookSession/${DOMINO_RUN_ID}"

exec /usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
