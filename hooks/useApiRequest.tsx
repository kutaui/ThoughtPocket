import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useApiRequest = (url: string) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + url)
        .then((response) => {
          setIsLoaded(true);
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, [url]);

  return { error, isLoaded, data };
};
