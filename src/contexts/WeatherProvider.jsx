import useWeather from "../hooks/useWeather";
import { WeatherContext } from ".";
export default function WeatherProvider({ children }) {
    const { weatherData, error, loading } = useWeather();

    return (
        <WeatherContext.Provider value={{ weatherData, error, loading }}>
            {children}
        </WeatherContext.Provider>
    );
}
