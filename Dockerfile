# build : docker build . -t express-storage-api
FROM node:20.4.0-alpine3.18
WORKDIR /src
ADD . /src
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]

