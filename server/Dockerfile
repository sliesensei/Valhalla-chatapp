FROM node:latest
WORKDIR /server
COPY package.json ./
RUN npm install
RUN npm install -g nodemon
CMD nodemon --exec npm start -- --port 8080
#CMD npm test
EXPOSE 8080
