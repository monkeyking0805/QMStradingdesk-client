FROM node:11-alpine

ARG CLIENT_URI
ARG LOG_ROCKET

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Need to rebuild node-sass due docker linux environment problem
RUN npm install
RUN npm rebuild node-sass

# Fix package vulnerabilities
RUN npm audit fix

RUN npm run build:react:production

EXPOSE 3000
CMD [ "npm", "run", "start:production"]
