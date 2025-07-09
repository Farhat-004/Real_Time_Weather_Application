import Page from "./Page";
import { WeatherContext } from "./contexts";
import FavoriteProvider from "./contexts/FavoriteProvider";
import LocationProvider from "./contexts/LocationProvider";
import WeatherProvider from "./contexts/WeatherProvider";

function App() {
    return (
        <LocationProvider>
            <WeatherProvider>
                <FavoriteProvider>
                    <Page />
                </FavoriteProvider>
            </WeatherProvider>
        </LocationProvider>
    );
}

export default App;
