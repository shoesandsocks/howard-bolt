FROM node:lts-alpine3.11
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/howard-bolt
COPY --chown=node:node . .
RUN npm ci --only=production
EXPOSE 8081
USER node
CMD ["dumb-init", "node", "./src/index.js"]
