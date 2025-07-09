import heart from "../../assets/heart.svg";
import redHeart from "../../assets/heart-red.svg";
import { useContext, useEffect, useState } from "react";
import { FavouriteContext, WeatherContext } from "../../contexts";
export default function AddToFavourite() {
    const [isFavorite, toggleFavorite] = useState(false);
    const { weatherData } = useContext(WeatherContext);
    const { location, longitude, latitude } = weatherData;
    const { favorites, addToFavorite, removeFavorite } =
        useContext(FavouriteContext);

    useEffect(() => {
        const found = favorites.find((fav) => fav.location == location);
        if (found) {
            toggleFavorite(found);
        }
    }, []);
    const handleAddToFav = () => {
        const StorLocation = favorites.find((fav) => fav.location == location); //storageLocation
        if (!StorLocation) {
            addToFavorite(latitude, longitude, location);
        } else {
            removeFavorite(location);
        }
        toggleFavorite(!isFavorite);
    };

    return (
        <div className="md:col-span-2">
            <div className="flex items-center justify-end space-x-6">
                <button
                    onClick={() => handleAddToFav()}
                    className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
                >
                    <span>Add to Favourite</span>
                    <img src={isFavorite ? redHeart : heart} alt="" />
                </button>
            </div>
        </div>
    );
}
