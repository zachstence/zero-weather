import axios from "axios";
import config from "config";

import { cToF } from "./util";

const { url, org, bucket, token } = config.get("influxdb");

const api = axios.create({
    baseURL: `${url}/api/v2/write`,
    method: "POST",
    params: {
        org,
        bucket,
        precision: "s",
    },
    headers: {
        "Authorization": `Token ${token}`,
    },
});

export interface Measurement {
    temperature: number;
    humidity: number;
}

export const report = async ({ temperature, humidity }: Measurement) => {
    const ts = Math.floor(new Date().getTime() / 1000);
    const tC = temperature.toFixed(2);
    const tF = cToF(temperature).toFixed(2);
    const h = humidity.toFixed(2);

    const data = `weather,host=zero-weather tC=${tC},tF=${tF},h=${h} ${ts}`;
    return api({ data });
};
