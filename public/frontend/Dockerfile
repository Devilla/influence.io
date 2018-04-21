FROM node:carbon

## Check out latest source code from the git


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000


## Remove stack docker from the dir



CMD ["sh", "frontend.sh"]


