#!/bin/sh

echo 'j2 templating'
j2 /etc/postgrest.conf.j2 > /etc/postgrest.conf

echo 'START supervisord'
/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
