import { promises as sensor } from "node-dht-sensor";

const TYPE = 22;
const PIN = 14;

const run = async () => {
    try {
        const {temperature, humidity} = await sensor.read(TYPE, PIN);

        const timeStr = new Date().toLocaleString();
        const tempStr = `${temperature.toFixed(1)}°C`;
        const humStr = `${humidity.toFixed(1)}%`;
        console.log(`${timeStr}\t${tempStr}\t${humStr}`);
    } catch (e) {
        console.error(e);
    }
};

setInterval(run, 5000);
