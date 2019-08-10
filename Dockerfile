FROM nginx:1.15.2-alpine

COPY dockers /etc/ssl/maniacs
COPY ../build /usr/share/nginx/html
COPY dockers /tmp/

CMD /bin/sh -c "envsubst < /tmp/crix-ui.conf.tmpl > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
