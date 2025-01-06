import { useEffect, useState } from "react";

function useFetch(url, opts = {}, deps = []) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(url, opts);
        if (res.status !== 200) return setError(await res.json());
        const loadedData = await res.json();
        if (loadedData.success) return setData(loadedData);
        return setError(loadedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetching();
    return () => {
      setData(false);
      setError(false);
      setLoading(true);
    };
  }, [url, ...deps]);

  return { loading, data, error, setLoading, setData, setError };
}

export default useFetch;
