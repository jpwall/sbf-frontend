FROM node:10.16.0-alpine
WORKDIR /sbf-frontend
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start"]