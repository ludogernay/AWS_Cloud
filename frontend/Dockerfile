# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

# ✅ Installer wget pour le healthcheck
RUN apk add --no-cache wget

WORKDIR /app
RUN addgroup nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production

CMD ["npm", "start"]
