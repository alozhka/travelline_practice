import {useEffect, useState} from "react";

const useFetch = <T>(url: string, refetchInterval?: number): [T | undefined, boolean] => {
    const [data, setData] = useState<T | undefined>(undefined)
    const [loading, setLoading] = useState(false)

  const get = () => {
    setLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
        console.log(data)
      })
  }

  useEffect(() => {
    get()
    if (refetchInterval) {
      const intervalId = setInterval(() => get(), refetchInterval);
      return () => clearInterval(intervalId)
    }
  }, [url])

  return [data, loading];
};
export { useFetch }