FROM node:18 AS builder

ENV TZ=Asia/Jakarta
RUN apt-get update && apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY package*.json ./
# Clean cache and force install
RUN npm cache clean --force
RUN npm install --legacy-peer-deps --force || cat /root/.npm/_logs/*.log
COPY . .
COPY envfile .env

RUN npm run build
RUN npm prune --production

FROM node:18-alpine AS runner

RUN apk add --no-cache tzdata
ENV TZ=Asia/Jakarta
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY --from=builder /app /app

ENV NODE_ENV=production

ENTRYPOINT ["npm", "start"]
