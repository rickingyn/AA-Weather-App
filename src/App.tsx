import { Component } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import citiesData from './data/city.list.json';
import "./App.scss";

import { City, Weather, MyState } from './types';

class App extends Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      apiKey: "206b6e2fcd079e0ea51b726211cfd683",
      cities: [],
      activeCity: "Toronto",
      weatherForecast: [],
    };

    // Bind functions
    this.setCities = this.setCities.bind(this);
    this.getWeatherForecast = this.getWeatherForecast.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // On Ready
  async componentDidMount() {
    try {
      this.setCities();
      this.getWeatherForecast('Toronto');
    } catch (err) {
      console.error(err);
    }
  }

  // get list of cities from json data
  setCities() {
    const cities = citiesData.map(c => c.name);
    this.setState({ cities: [...cities] });
  }

  // Get weather forecast from Open Weather api
  async getWeatherForecast(cityName: string) {
    try {
      const { id }: City = citiesData.find(c => c.name === cityName)!;
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${this.state.apiKey}`);

      // Find weather for the first 5 days
      const fiveDayForecast = data.list.filter((weather: Weather, index: number) => weather.dt_txt.includes('00:00:00') || index === 0).splice(0, 5);

      this.setState((state, props) => ({
        weatherForecast: [...fiveDayForecast]
      }));
    } catch (err) {
      console.error(err);
    }
  }

  // Fetch new weather forecast for selected city
  handleClick(city: string) {
    this.getWeatherForecast(city);
    this.setState({
      activeCity: city,
    });

  }

  render() {
    const { activeCity, cities, weatherForecast } = this.state;
    const currWeather = weatherForecast[0];

    return (
      <div className="App">
        <div className="container">
          <div className="cities">
            {cities.map((city) => {
              return (
                <button
                  key={city}
                  onClick={() => this.handleClick(city)}
                  className={activeCity === city ? "active" : ""}
                >
                  {city}
                </button>
              );
            })}
          </div>
          <section className="weather-container">
            {currWeather &&
              <WeatherCard
                currWeather={true}
                day={'Today'}
                temperature={parseInt(currWeather.main.temp)}
                weatherText={currWeather.weather[0].main}
                iconSize={"8rem"}
              />
            }

            <div className="four-day-forecast">
              {weatherForecast.map((weather: Weather, index: number) => {
                if (index !== 0) {
                  // get day from date
                  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                  const date = new Date(weather.dt_txt);
                  const day = weekday[(date.getUTCDay())]

                  return (
                    <WeatherCard
                      key={index}
                      currWeather={false}
                      day={day}
                      temperature={parseInt(weather.main.temp)}
                      weatherText={weather.weather[0].main}
                      iconSize={"3rem"}
                    />
                  );
                }
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
