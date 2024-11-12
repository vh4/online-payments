FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY envfile .env

RUN npm run build
RUN npm prune --production

FROM node:18-alpine as runner

RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta
RUN cp /usr/share/zoneinfo/$ZT /etc/localtime && $TZ > /etc/timezone

WORKDIR /app
COPY --from=builder /app /app

ENV NODE_ENV production

ENTRYPOINT ["npm", "start"]