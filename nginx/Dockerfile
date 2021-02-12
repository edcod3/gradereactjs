FROM nginx:mainline-alpine

RUN apk update && apk add bash && apk add --no-cache coreutils

COPY ./default.conf.template /etc/nginx/conf.d
COPY ./conf_other/onlych.conf /etc/nginx/conf.d
COPY wait-for-react.sh wait-for-react.sh
COPY ./logs /var/www/logs

RUN envsubst '$$NGINX_DOM $$NGINX_WWWDOM $$CERT_PATH $$CERTKEY_PATH $$TEST_IP $$CH_ONLY' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN chmod +x wait-for-react.sh
CMD ["./wait-for-react.sh", "nodejs:8000", "--timeout=30", "--strict", "--", "nginx", "-g", "daemon off;"]