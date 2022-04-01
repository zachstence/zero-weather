import { promises as sensor } from "node-dht-sensor";
import config from "config";

import { report } from "./api";

const TYPE = 22;
const PIN = 14;

console.log("App started!");

setInterval(async () => {
    try {
        const data = await sensor.read(TYPE, PIN);
        await report(data);
    } catch (e) {
        console.error("Data collection failed", e);
    }
}, 5000);
