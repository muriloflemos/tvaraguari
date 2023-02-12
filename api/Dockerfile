FROM node:16.15.0-alpine3.15
WORKDIR /usr/src/app
COPY . .
RUN npm ci --unsafe-perm

CMD ["node", "index.mjs"]
EXPOSE 3000