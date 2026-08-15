FROM ghcr.io/nubjs/nub:0.7.5 AS build
WORKDIR /app

COPY --chown=node:node package.json nub.lock ./
RUN nub ci

COPY --chown=node:node . .

RUN nub run build


FROM ghcr.io/nubjs/nub:0.7.5 AS production
WORKDIR /app

COPY --chown=node:node package.json nub.lock ./
RUN nub install --prod --frozen-lockfile

COPY --chown=node:node ./native ./native
COPY --from=build --chown=node:node /app/.output ./.output

CMD ["nub", "run", "start"]