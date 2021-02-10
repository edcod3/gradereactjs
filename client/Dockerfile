FROM node:alpine

RUN apk update && apk add bash && apk add --no-cache coreutils

RUN mkdir ./reactjs
WORKDIR /reactjs

COPY . .
RUN npm install --only=production
RUN npm install -g serve
RUN npm run build

RUN chmod +x wait-for-nodejs.sh
CMD ["./wait-for-nodejs.sh", "nodejs:8000", "--timeout=30", "--strict", "--", "serve", "-s", "build"]