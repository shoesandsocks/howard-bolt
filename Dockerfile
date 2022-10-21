FROM node:18.9.1-slim
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
ENV NODE_ENV production
WORKDIR /usr/src/howard-bolt
COPY --chown=node:node . .
RUN npm ci --only=production
EXPOSE 8081
USER node
CMD ["dumb-init", "node", "./src/index.js"]
