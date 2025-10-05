export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: WeatherInfo[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  cod: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}