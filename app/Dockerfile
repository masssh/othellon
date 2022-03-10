FROM node:16 AS builder
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

##########################################

FROM gcr.io/distroless/nodejs:16
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "run", "start"]
