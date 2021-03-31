FROM node:12-alpine
WORKDIR /usr/src/howard-bolt
COPY . .
RUN npm install
RUN npm run build
#RUN npm ci --only=production
EXPOSE 8081
CMD ["node", "build/main.js"]
