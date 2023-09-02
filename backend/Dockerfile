FROM node:16-alpine
WORKDIR /backend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --save
EXPOSE 8000
CMD ["npx", "nodemon", "app"]