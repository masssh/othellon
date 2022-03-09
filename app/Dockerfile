FROM node:16 AS builder
RUN npm install
RUN npm run build

##########################################

FROM gcr.io/distroless/nodejs:16
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

COPY --from=builder /next.config.js ./
COPY --from=builder /package.json ./
COPY --from=builder /public ./
COPY --from=builder /.next ./

EXPOSE 3000
CMD ["node", "server.js"]
