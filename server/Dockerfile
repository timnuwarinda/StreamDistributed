FROM node:carbon
 
# Create app directory
WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
 
RUN npm install
 
COPY . .
 
EXPOSE 3333

FROM ffmpeg/coverity

CMD [ "node", "app.js" ]