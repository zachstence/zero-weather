FROM arm64v8/node:16-alpine

RUN apk add --no-cache make gcc g++ python3

# node-dht-sensor will attempt to access /dev/mem if the user is root
# So create a new user in the gpio group to access /dev/gpiomem instead,
# which is more secure and all we need
RUN addgroup -g 997 gpio
RUN adduser -D zero-weather -G gpio
USER zero-weather

WORKDIR /app
COPY . .

RUN npm ci

CMD ["npm", "start"]
