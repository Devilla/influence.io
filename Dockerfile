FROM node:alpine

## Check out latest source code from the git


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .


##Create /tmp/log/websocket.log

RUN mkdir -p /tmp/log/ && cd /tmp/log && touch websocket.log

EXPOSE 1337


## Remove stack docker from the dir

CMD ["rm", "-rf", "stack-docker"]

CMD ["sh", "api.sh"]


