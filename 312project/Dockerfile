FROM ubuntu:18.04

RUN apt-get update

ENV HOME /root

WORKDIR /root

RUN apt-get update --fix-missing
RUN apt-get install -y nodejs
RUN apt-get install -y npm

COPY . .

RUN npm install --save-dev bufferutil@^4.0.1
RUN npm install --save-dev utf-8-validate@^5.0.2


RUN npm install

EXPOSE 8000

CMD ["node","server.js"]
