import { useEffect, useState } from "react";

function useFetchAll(reqs) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(new Map());
  const [error, setError] = useState(new Map());
  useEffect(() => {
    const fetching = async () => {
      try {
        const responses = await Promise.all(
          Array.from(reqs, ([url, opts]) => fetch(url, opts))
        );
        const errorTemp = new Map();
        const dataTemp = new Map();
        for (let i = 0; i < responses.length; i++) {
          const res = responses[i];
          if (res.status !== 200) errorTemp.set(i, await res.json());
          const loadedData = await res.json();
          if (loadedData.success) dataTemp.set(i, loadedData);
          if (!loadedData.success) errorTemp.set(i, loadedData);
        }

        if (errorTemp.size > 0) setError(errorTemp);
        if (dataTemp.size > 0) setData(dataTemp);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [JSON.stringify(reqs)]);
  return { loading, data, error, setLoading, setData, setError };
}

export default useFetchAll;
