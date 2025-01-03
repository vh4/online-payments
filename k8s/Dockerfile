# FROM node:20-alpine AS builder

# ENV TZ=Asia/Jakarta
# RUN apk add --no-cache tzdata && \
#     cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# COPY envfile .env

# RUN npm run build:icons
# RUN npm run build

# FROM node:20-alpine AS runner

# RUN apk add --no-cache tzdata
# ENV TZ=Asia/Jakarta
# RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# WORKDIR /app

# COPY --from=builder /app /app

# ENV NODE_ENV=production
# ENTRYPOINT ["npm", "start"]



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
