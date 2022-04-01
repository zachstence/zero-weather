import { promises as sensor } from "node-dht-sensor";
import config from "config";

import { report } from "./api";

const { type, pin, interval } = config.get("sensor");

console.log("App started!");

setInterval(async () => {
    try {
        const data = await sensor.read(type, pin);
        await report(data);
    } catch (e) {
        console.error("Data collection failed", e);
    }
}, interval * 1000);
