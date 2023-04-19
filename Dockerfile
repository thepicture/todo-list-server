FROM node:16-alpine

WORKDIR /app

COPY package*.json .
COPY jest.config.js .
COPY tsconfig.json .
COPY knexfile.js .
COPY tsconfig.json .

COPY .env .

RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 5432

CMD ["npm", "start"]