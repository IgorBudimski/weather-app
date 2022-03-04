import { url, apiKey } from "../api/apiWeather";

export const getWeather = async (city, forecast, days, lat, lon) => {
    try {
        const URL =  url + (city ? `${forecast ? 'forecast' : 'weather'}?q=${city}` : `${'forecast/daily?'}lat=${lat}&lon=${lon}`) + `&units=metric&cnt=${days}&APPID=${apiKey}`;
        let response = await fetch(URL);
        response = await response.json();

        return response;

    } catch (error) {
        return error;
    }
}