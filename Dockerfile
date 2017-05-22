FROM node:7
RUN mkdir /langApp
ADD . /langApp
WORKDIR /langApp
RUN npm i
EXPOSE 80
CMD ["npm", "start"]