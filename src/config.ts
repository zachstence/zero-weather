import _config from "config";
import { SensorType } from "node-dht-sensor";

export const config = {
    sensor: {
        type: _config.get<SensorType>("sensor.type"),
        pin: _config.get<number>("sensor.pin"),
        interval: _config.get<number>("sensor.interval"),
    },
    influxdb: {
        url: _config.get<string>("influxdb.url"),
        org: _config.get<string>("influxdb.org"),
        bucket: _config.get<string>("influxdb.bucket"),
        token: _config.get<string>("influxdb.token"),
    }
}

console.log("Config loaded", config);
