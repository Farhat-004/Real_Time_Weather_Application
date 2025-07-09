import { FavouriteContext } from ".";
import useLocalStorage from "../hooks/useLocalStorage";

export default function FavoriteProvider({ children }) {
    const [favorites, setFavorite] = useLocalStorage("favorites", []);
    const addToFavorite = (latitude, longitude, location) => {
        setFavorite([...favorites, { latitude, longitude, location }]);
    };
    const removeFavorite = (location) => {
        const newList = favorites.filter((fav) => fav.location !== location);
        setFavorite(newList);
    };
    return (
        <FavouriteContext value={{ favorites, addToFavorite, removeFavorite }}>
            {children}
        </FavouriteContext>
    );
}
