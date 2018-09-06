FROM node:10

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .

EXPOSE 4000:4000

RUN npm run prebuild
RUN npm run build

CMD ["npm", "start"]