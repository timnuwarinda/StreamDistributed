 
FROM ubuntu:16.04

RUN apt-get update



# Install.

# Add files.
# ADD root/.bashrc /root/.bashrc
# ADD root/.gitconfig /root/.gitconfig
# ADD root/.scripts /root/.scripts
RUN apt-get update
RUN apt-get install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential



RUN mkdir -p /mnt/data


RUN apt-get update -y && \
    apt-get install lsb-release -y && \
    export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s` && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list && \
    apt-get install -y curl && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update -y && \
    apt-get install gcsfuse -y

RUN apt-get install --yes software-properties-common

RUN add-apt-repository -y ppa:jonathonf/ffmpeg-4

RUN apt-get update

RUN apt install --yes ffmpeg


WORKDIR /usr/src/app
 
COPY package.json .
COPY package-lock.json .
 
RUN npm install

COPY . .
 
# EXPOSE 1935


CMD ["node","app.js"]

