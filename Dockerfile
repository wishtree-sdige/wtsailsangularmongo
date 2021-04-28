FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install && npm install sails@~1.2.3  --save -g 
RUN npm install -g create-react-app
COPY . /usr/src/app
EXPOSE 8080
EXPOSE 1337
CMD npm run startDocker