FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY src/assets/iconify-icons/bundle-icons-css.ts ./src/assets/iconify-icons/
RUN npm i

COPY . .

RUN npm run build:icons
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
