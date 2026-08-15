FROM ghcr.io/nubjs/nub:0.7.5 AS development-build
COPY . /app
WORKDIR /app
RUN nub ci

FROM ghcr.io/nubjs/nub:0.7.5 AS production-build
COPY . /app
WORKDIR /app
RUN nub install --prod --frozen-lockfile

FROM ghcr.io/nubjs/nub:0.7.5 AS build
WORKDIR /app

COPY --chown=node:node . . 
COPY --from=development-build \
  --chown=node:node \
  /app/node_modules \
  /app/node_modules
  
RUN nub run build

FROM ghcr.io/nubjs/nub:0.7.5
WORKDIR /app
COPY ./native /app/native
COPY ./package.json ./nub.lock /app/
COPY --from=production-build /app/node_modules /app/node_modules
COPY --from=build /app/.output /app/.output
CMD [ "nub", "run", "start" ]
