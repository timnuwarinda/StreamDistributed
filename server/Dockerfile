
FROM tiangolo/nginx-rtmp

RUn apt-get update && apt-get install -y && software-properties-common

RUN add-apt-repository ppa:jonathonf/ffmpeg-4

RUN apt-get update -y && \
    apt-get install lsb-release -y && \
    export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s` && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list && \
    apt-get install -y curl && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update -y && \
    apt-get install gcsfuse -y && apt-get install ffmpeg && apt-get install nodejs

RUN mkdir -p /mnt/data

# RUN apk add  --no-cache ffmpeg


WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
 
RUN npm install

COPY . .
 
EXPOSE 1935

CMD ["node","app.js"]







