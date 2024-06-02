import {useEffect, useState} from "react";

const useFetch = <T>(url: string): [T | undefined, boolean] => {
    const [data, setData] = useState<T | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data satisfies T)
                setLoading(false)
            })
    }, [url])

    return [data, loading];
};


export { useFetch }