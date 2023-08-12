ARG WORKDIR=/opt/app
ARG NODE_VERSION=node:18-alpine3.17

FROM ${NODE_VERSION} AS base
LABEL builder=true
RUN npm i -g pnpm
USER node

FROM base as installer
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts --frozen-lockfile

FROM installer as builder
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --chown=node:node . .
RUN pnpm build

FROM ${NODE_VERSION} as runner
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --chown=node:node --from=builder ${WORKDIR}/dist .
USER node

EXPOSE 3000
CMD ["node", "main.js"]
