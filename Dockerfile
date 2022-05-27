FROM node:current-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
CMD ["node", "index.js"]

# NOT EXPOSE ANY PORT -> Image should not be aware of ports service used
# container has to be run with "PORT" and "APIKEY" Environment variables