import { useEffect, useState } from "react";

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
        time: "",
        longitude: "",
        latitude: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState({
        state: false,
        message: "",
    });

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
            console.log("API response -", data);

            const updatedWeatherData = {
                ...weatherData,
                location: data?.name,
                climate: data?.weather?.[0],
                temperature: data?.main?.temp,
                maxTemperature: data?.main?.temp_max,
                minTemperature: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                cloudPercentage: data?.clouds?.all,
                wind: data?.wind?.speed,
            };
            setWeatherData(updatedWeatherData);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading({
                ...loading,
                state: true,
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
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.longitude, position.coords.latitude);

            fetchWeatherData(
                position.coords.longitude,
                position.coords.latitude
            );
        });
    }, []);
    return {
        weatherData,
        loading,
        error,
    };
}
