FROM ubuntu:18.04

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

RUN apt-get update && apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash

RUN apt-get install -y nodejs

RUN npm install

RUN npm run tsc

CMD npm start