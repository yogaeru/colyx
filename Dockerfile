FROM ghcr.io/nubjs/nub:0.7.5 AS development-build
COPY . /app
WORKDIR /app
RUN nub ci

FROM ghcr.io/nubjs/nub:0.7.5 AS production-build
COPY . /app
WORKDIR /app
RUN nub ci --omit=dev

FROM ghcr.io/nubjs/nub:0.7.5 AS build
COPY . /app/
COPY --from=development-build /app/node_modules /app/node_modules
WORKDIR /app
RUN nub run build

FROM ghcr.io/nubjs/nub:0.7.5
COPY ./package.json package-lock.json /app/
COPY --from=production-build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
WORKDIR /app
CMD [ "nub", "run", "preview" ]
