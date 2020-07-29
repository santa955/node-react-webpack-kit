FROM node:12-slim

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Building code for production
RUN npm install --production

# Bundle app source
COPY ./dist ./dist

COPY ./server ./server

EXPOSE 8080
CMD [ "npm", "run", "server" ]