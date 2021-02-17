#reactjs build environment
FROM node:alpine AS build

RUN mkdir ./reactjs
WORKDIR /reactjs

COPY . .

RUN npm install --only=production
#RUN npm install -g serve
RUN npm run build

#production nginx environment
FROM nginx:mainline-alpine AS nginx-web

RUN apk update && apk add bash && apk add --no-cache coreutils

COPY --from=build /reactjs/build /usr/share/nginx/html
COPY ./web/prod.conf.template /etc/nginx/conf.d
COPY ./web/conf_other/onlych.conf /etc/nginx/conf.d
COPY ./web/logs /var/www/logs
COPY wait-for-nodejs.sh wait-for-nodejs.sh

RUN envsubst '$$NGINX_DOM $$NGINX_WWWDOM $$CERT_PATH $$CERTKEY_PATH $$TEST_IP $$CH_ONLY' < /etc/nginx/conf.d/prod.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE 80 443

RUN chmod +x wait-for-nodejs.sh
CMD ["./wait-for-nodejs.sh", "nodejs:8000", "--timeout=30", "--strict", "--", "nginx", "-g", "daemon off;"]