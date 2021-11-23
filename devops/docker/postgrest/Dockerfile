FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-pip python3-psycopg2 \
    ca-certificates curl wget \
    software-properties-common \
    nginx gettext-base python-jinja2\
    xz-utils supervisor

RUN pip3 install -U pip
RUN pip3 install -U j2cli

RUN curl -LSs -o /tmp/postgrest.tar.xz "https://github.com/PostgREST/postgrest/releases/download/v7.0.1/postgrest-v7.0.1-linux-x64-static.tar.xz" \
 && tar -x -v -J -f /tmp/postgrest.tar.xz -C /tmp \
 && mv -f /tmp/postgrest /usr/local/bin/ \
 && chmod +x /usr/local/bin/postgrest

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
 && apt-get install -y nodejs build-essential

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /

ENV PATH=${HOME}/.local/bin:${HOME}/bin:/sbin:/usr/sbin:${PATH}

ENV PGST_DB_URI 'postgresql://reclada:secret@localhost:5432/db'
ENV PGST_DB_SCHEMA "api"
ENV PGST_ANON_ROLE "reclada"
ENV PGST_SERVER_HOST "0.0.0.0"
ENV PGST_SERVER_PORT "3000"

COPY run.sh /
RUN chmod 755 /run.sh
COPY nginx.conf /etc/nginx/sites-available/default
COPY supervisord.conf /etc/supervisor/supervisord.conf
COPY postgrest.conf.j2 /etc/postgrest.conf.j2
CMD ["tail -f /dev/null"]
