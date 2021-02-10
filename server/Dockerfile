FROM node:alpine

RUN apk update && apk add bash && apk add --no-cache coreutils

RUN mkdir ./nodejs
WORKDIR /nodejs

COPY package*.json ./

RUN npm install --only=production
RUN npm install pm2 -g
RUN npm install express-mysql-session

COPY ./ .

EXPOSE 8000

RUN chmod +x wait-for-mysql.sh
CMD ["./wait-for-mysql.sh", "mysql:3306", "--timeout=30", "--strict", "--", "pm2-runtime", "--output", "/var/log/pm2_output.log", "--error", "/var/log/pm2_error.log", "server.js"]
