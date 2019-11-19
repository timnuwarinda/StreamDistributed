FROM node:alpine
RUN apk add  --no-cache ffmpeg
 
# Create app directory
WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
 
RUN npm install
 
COPY . .
 
EXPOSE 8080


CMD [ "node", "index.js" ]