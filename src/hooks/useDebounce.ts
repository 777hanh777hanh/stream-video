import { useState, useEffect } from 'react';

function useDebounce(value: any, duration: number = 500) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, duration);
        return () => {
            clearTimeout(timer);
        };
    }, [value, duration]);
    return debounceValue;
}

export default useDebounce;
