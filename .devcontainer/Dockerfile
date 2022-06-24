FROM node:16-buster

ENV POSTGRES_VERSION=13
ENV AWS_SDK_VERSION=2.0.30

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    wget \
    lsb-release \
    procps \
    make \
    g++ \
    gyp \
    python \
    groff-base \
    chromium \
    locales-all \
    vim \
    less \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# ~/.bashrc
COPY .devcontainer/files/.bashrc /root/.bashrc

# PostgreSQL
RUN curl -s https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update && apt-get install -y \
    postgresql-client-${POSTGRES_VERSION} \
    libpq-dev \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# AWS SDK
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-$(arch)-${AWS_SDK_VERSION}.zip" -o "awscliv2.zip" && \
      unzip awscliv2.zip && \
      ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update && \
      rm -rf aws

# Redis
RUN apt-get update && apt-get install -y redis-server
