FROM nginx:mainline-alpine

ARG NGINX_DOM
ARG NGINX_WWWDOM
ARG CERT_PATH
ARG CERTKEY_PATH
ARG CH_ONLY

RUN apk update && apk add bash && apk add --no-cache coreutils

COPY ./prod.conf.template /etc/nginx/conf.d
COPY ./conf_other/onlych.conf /etc/nginx/conf.d
COPY ./logs /var/www/logs
COPY wait-for-nodejs.sh wait-for-nodejs.sh

RUN envsubst '$NGINX_DOM $NGINX_WWWDOM $CERT_PATH $CERTKEY_PATH $CH_ONLY' < /etc/nginx/conf.d/prod.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE 80 443

RUN chmod +x wait-for-nodejs.sh
CMD ["./wait-for-nodejs.sh", "nodejs:8000", "--timeout=30", "--strict", "--", "nginx", "-g", "daemon off;"]