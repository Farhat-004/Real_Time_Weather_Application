import { useEffect, useRef } from "react";

export default function useDebounce(callback, delay) {
    const timeOut = useRef(null);
    useEffect(() => {
        return () => {
            if (timeOut.current) {
                clearInterval(timeOut.current);
            }
        };
    }, []);
    const debounceCallback = (...args) => {
        if (timeOut.current) {
            clearInterval(timeOut.current);
        }
        timeOut.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
    return debounceCallback;
}
