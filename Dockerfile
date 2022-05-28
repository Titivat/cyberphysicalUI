FROM node:16-alpine

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package*.json /home/app/
RUN npm ci

COPY . /home/app

EXPOSE 3000

CMD ["npm", "start"]