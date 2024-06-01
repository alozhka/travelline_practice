import {useEffect, useState} from "react";

const useFetch = (url: string): [object | undefined] => {
    const [data, setData] = useState<object | undefined>(undefined);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setData(data))
    }, [url])

    return [data];
};


export { useFetch }