import tempMax from "../../assets/icons/temp-max.svg";
import tempMin from "../../assets/icons/temp-min.svg";
import humidity from "../../assets/icons/humidity.svg";
import cloudy from "../../assets/icons/cloud.svg";
import wind from "../../assets/icons/wind.svg";
import { useContext } from "react";
import { WeatherContext } from "../../contexts";

export default function WeatherCondition() {
    const { weatherData } = useContext(WeatherContext);
    return (
        <div>
            <p className="text-sm lg:text-lg font-bold uppercase mb-8">
                The climate is {weatherData.climate.description}
            </p>
            <ul className="space-y-6 lg:space-y-6">
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp max</span>
                    <div className="inline-flex space-x-4">
                        <p>{weatherData.maxTemperature}°</p>
                        <img src={tempMax} alt="temp-max" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Temp min</span>
                    <div className="inline-flex space-x-4">
                        <p>{weatherData.minTemperature}°</p>
                        <img src={tempMin} alt="temp-min" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Humadity</span>
                    <div className="inline-flex space-x-4">
                        <p>{weatherData.humidity}%</p>
                        <img src={humidity} alt="humidity" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Cloudy</span>
                    <div className="inline-flex space-x-4">
                        <p>{weatherData.cloudPercentage}%</p>
                        <img src={cloudy} alt="cloudy" />
                    </div>
                </li>
                <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
                    <span>Wind</span>
                    <div className="inline-flex space-x-4">
                        <p>{weatherData.wind}km/h</p>
                        <img src={wind} alt="wind" />
                    </div>
                </li>
            </ul>
        </div>
    );
}
