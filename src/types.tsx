export interface MyProps {
  currWeather: boolean;
  day: string;
  temperature: any;
  weatherText: string;
  iconSize: string;
}

export interface MyState {
  apiKey: string;
  cities: string[];
  activeCity: string;
  weatherForecast: any[];
}

export interface City {
  id: number,
  name: string,
  state: string,
  country: string,
  coord: LonLat
}
  
export interface LonLat {
  lon: number
  lat: number,
}

export interface Weather {
  clouds: any,
  dt: number,
  dt_txt: string,
  main: any,
  pop: number,
  style: any,
  sys: any,
  visibility: number,
  weather: any[],
  wind: any,
}
