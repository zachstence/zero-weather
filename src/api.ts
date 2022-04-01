import axios from "axios";
import config from "config";

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
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const data = `weather,host=zero-weather temperature=${temperature},humidity=${humidity} ${timestamp}`;

    return api({ data });
};
