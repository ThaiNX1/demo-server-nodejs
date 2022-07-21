FROM node:16.11-alpine As runner
WORKDIR /app

ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN chown -R node:node /app
USER node

ARG NODE_ENV=production

COPY --chown=node:node ./dist ./dist
COPY --chown=node:node ./node_modules ./node_modules
COPY --chown=node:node ./config/.env.production ./config/.env
COPY --chown=node:node config/ormconfig.production.env ./config/ormconfig.env
COPY --chown=node:node ./src/templates ./dist/templates

EXPOSE 4000

CMD ["node", "dist/main"]
