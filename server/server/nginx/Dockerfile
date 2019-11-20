FROM tiangolo/nginx-rtmp

RUN apt-get update -y && \
    apt-get install lsb-release -y && \
    export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s` && \
    echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list && \
    apt-get install -y curl && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    apt-get update -y && \
    apt-get install gcsfuse -y

RUN mkdir -p /mnt/data

COPY ./nginx.conf /etc/nginx/nginx.conf
