import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../contexts";

export default function useWeather() {
    const [weatherData, setWeatherData] = useState({
        location: "",
        climate: "",
        temperature: "",
        maxTemperature: "",
        minTemperature: "",
        humidity: "",
        cloudPercentage: "",
        wind: "",

        longitude: "",
        latitude: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({
        state: false,
        message: "",
    });
    const { selectedLocation } = useContext(LocationContext) || {};

    const fetchWeatherData = async (longitude, latitude) => {
        try {
            setLoading({
                ...loading,
                state: true,
                message: "fetching weather data....",
            });
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
                    import.meta.env.VITE_WEATHER_API_KEY
                }`
            );
            if (!response.ok) {
                const errorMessage = `fetching failed deu to : ${response.status}`;
                throw new Error(errorMessage);
            }
            const data = await response.json();

            const updatedWeatherData = {
                ...weatherData,
                location: data?.name || selectedLocation.location,
                climate: data?.weather?.[0],
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,

                longitude: data?.coord.lon,
                latitude: data?.coord.lat,
            };
            setWeatherData(updatedWeatherData);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: "",
            });
        }
    };

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: "finding location...",
        });
        if (selectedLocation.latitude && selectedLocation.longitude) {
            fetchWeatherData(
                selectedLocation.latitude,
                selectedLocation.longitude
            );
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                fetchWeatherData(
                    position.coords.longitude,
                    position.coords.latitude
                );
            });
        }
    }, [selectedLocation.latitude, selectedLocation.longitude]);
    return {
        weatherData,
        loading,
        error,
    };
}
