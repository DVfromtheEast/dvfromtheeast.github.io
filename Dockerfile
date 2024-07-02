FROM node:16

WORKDIR /app
COPY ./ /app

RUN rm -rf node_modules

RUN npm i -f
RUN npm run lint 
RUN npm run build 

RUN echo test runner

CMD ["npm", "run", "start"]

EXPOSE 3000
