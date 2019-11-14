FROM node:carbon
 
# Create app directory
WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
 
RUN npm install
 
COPY . .
 
EXPOSE 3333

FROM jrottenberg/ffmpeg:latest

CMD [ "node", "app.js" ]