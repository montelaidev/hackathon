FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

FROM node:16-alpine as run

WORKDIR /usr/src/app
RUN chown node -R .

USER node
EXPOSE 9000

ENV PORT 9000

COPY --from=build --chown=node:node  /usr/src/app/src ./src
COPY --from=build --chown=node:node  /usr/src/app/node_modules ./node_modules

CMD [ "node", "src/index"]
