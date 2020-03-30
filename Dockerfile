FROM node:10
RUN mkdir /sbf-frontend
ADD . /sbf-frontend
WORKDIR /sbf-frontend
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]