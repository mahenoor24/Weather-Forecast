import { signal } from "@preact/signals";
export const WEATHER_API_KEY = new signal('');
export const RapidAPI_KEY_SIGNAL = new signal({
  method: "GET",
  headers: {
    "X-RapidAPI-Key":'',// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RapidAPI_KEY_SIGNAL,// enter your rapid api key here
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

