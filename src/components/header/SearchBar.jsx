import { useContext } from "react";
import searchBtn from "../../assets/search.svg";
import { LocationContext } from "../../contexts";
import { getLocationByLocation } from "../../data/locationdata";
import useDebounce from "../../hooks/useDebounce";
export default function SearchBar() {
    const { setSelectedLocation } = useContext(LocationContext);
    const doSearch = useDebounce((term) => {
        const fetchedLocation = getLocationByLocation(term);

        setSelectedLocation({ ...fetchedLocation });
    }, 500);
    const handleChange = (e) => {
        const value = e.target.value;

        doSearch(value);
    };

    return (
        <form action="#">
            <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
                <input
                    className="bg-transparent  placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
                    type="search"
                    onChange={handleChange}
                    placeholder="Search Location"
                    required
                />
                <button type="submit">
                    <img src={searchBtn} />
                </button>
            </div>
        </form>
    );
}
