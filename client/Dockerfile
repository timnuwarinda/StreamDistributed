### STAGE 1: Build ###

FROM node:12.2.0 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.13.12-alpine

RUN rm -rf /usr/share/nginx/html/*


COPY --from=node /usr/src/app/dist/client /usr/share/nginx/html

#EXPOSE 8081

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
