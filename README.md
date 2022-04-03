# zero-weather
DIY a simple weather station using a Raspberry Pi Zero W and a DHT22 temperature/humidity sensor.

<p align="center">
    <a href="https://github.com/zachstence/zero-weather/blob/main/LICENSE">
        <img alt="license mit" src="https://img.shields.io/github/license/zachstence/zero-weather?style=for-the-badge" />
    </a>
    <br />
    <a href="https://hub.docker.com/r/zachstence/zero-weather">
        <img alt="docker pulls" src="https://img.shields.io/docker/pulls/zachstence/zero-weather?style=for-the-badge" />
        <img alt="docker size" src="https://img.shields.io/docker/image-size/zachstence/zero-weather?style=for-the-badge" />
    </a>
    <br />
    <a href="#">
        <img alt="wakatime" src="https://wakatime.com/badge/user/2a0a4013-ea89-43b7-99d9-1a215b4c34d0/project/b06aa0fa-f2b5-40fa-9639-0382daedde63.svg?style=for-the-badge" />
    </a>
</p>

## Table of Contents
- [Usage](#usage)
  - [Run using `npm`](#run-using-npm)
  - [Run using Docker](#run-using-docker)
  - [Run using `docker-compose`](#run-using-docker-compose)
- [Config](#config)
- [Grafana Dashboard](#grafana-dashboard)
- [Future Features](#future-features)

## Usage
All methods require a [configuration file](#config).
### Run using `npm`
```sh
# Clone the repository
git clone https://github.com/zachstence/zero-weather.git && cd zero-weather

# Add your config
nano config/production.json

# Start the app
npm start
```

### Run using Docker
```sh
docker run \
    --device /dev/gpiomem:/dev/gpiomem
    -v /path/to/config.json:/app/config/production.json:ro \
    zachstence/zero-weather
```

### Run using `docker-compose`
```yaml
version: "3.8"

services:
zero-weather:
    image: zachstence/zero-weather
    devices:
    - /dev/gpiomem:/dev/gpiomem
    volumes:
    - /home/zach/config.json:/app/config/production.json:ro
    restart: unless-stopped
```

## Config
Create a config file following the format in [`config/default.json`](config/default.json)

```json
{
    "sensor": {
        "type": 22,
        "pin": 14,
        "interval": 30
    },
    "influxdb": {
        "org": "",
        "bucket": "",
        "token": ""
    }
}
```

| Config                  | Description                                                                                                                                          | Example                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `sensor.type`           | Whether your connected sensor is a DHT11 or DHT22 sensor                                                                                             | `11` or `22`                                                                               |
| `sensor.pin`            | The [GPIO pin](https://pinout.xyz/) that your DHT sensor is connected to                                                                             | `14`                                                                                       |
| `sensor.interval`       | The interval in seconds that the sensor should be polled.<sup>1</sup>                                                                                | `30`                                                                                       |
| `influxdb.org`          | The name of your [InfluxDB organization](https://docs.influxdata.com/influxdb/v2.1/organizations/create-org/)                                        | `org-name`                                                                                 |
| `influxdb.bucket`       | The name of the [InfluxDB bucket](https://docs.influxdata.com/influxdb/v2.1/organizations/buckets/create-bucket/) to store the data in               | `zero-weather`                                                                             |
| `influxdb.token`        | An [InfluxDB token](https://docs.influxdata.com/influxdb/v2.1/security/tokens/create-token) with write permissions to the specified bucket           | `9jPxAm8tEZSnRlw8nAsEDWZbvHCYeUetIAUrT_vj6RdHfG43RF5UKfazyZ1Z9dYu1o7prU7-kC4X8oUP-PSxTg==` |

<sup>1</sup> The DHT11 can be polled at most once every second (1Hz, `sensor.interval=1`). The DHT22 can be polled at most once every half-second (0.5Hz, `sensor.interval=0.5`).

## Grafana Dashboard
https://grafana.com/grafana/dashboards/16035

## Future Features
- Accept file for Influx token to enable better security (Docker secrets)
