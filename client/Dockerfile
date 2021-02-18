#reactjs build environment
FROM node:alpine

RUN mkdir ./reactjs
WORKDIR /reactjs

COPY . .

RUN npm install --only=production
#RUN npm install -g serve
CMD ["npm", "run", "build"]