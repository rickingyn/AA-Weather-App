import { Component } from "react";
import { BsClouds, BsCloudRain, BsSun } from "react-icons/bs";
import "./WeatherCard.scss";
import { MyProps } from '../types';

// Map weather text to Icon
const iconsMap: any = {
  'Clouds': BsClouds,
  'Rain': BsCloudRain,
  'Clear': BsSun,
};

class WeatherCard extends Component<MyProps, {}> {
  render() {
    const { currWeather, day, temperature, weatherText, iconSize } = this.props;
    let Icon = iconsMap[weatherText];

    return (
      <div className={currWeather ? "weather today" : "weather"}>
        <p className="day">{day}</p>
        {currWeather ? (
          <div className="weather-info">
            {Icon && <Icon size={iconSize} />}
            <div className="weather-texts">
              <p className="temperature">{temperature}°</p>
              <p>{weatherText}</p>
            </div>
          </div>
        ) : (
          <div>
            {Icon && <Icon size={iconSize} />}
            <p className="temperature">{temperature}°</p>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherCard;
