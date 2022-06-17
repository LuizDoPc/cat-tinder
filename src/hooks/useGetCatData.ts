import {useEffect, useState} from 'react';
import {CatCardProps} from '../components/CatCard';
import {getCats} from '../services';

export const useGetCatData = () => {
  const [catData, setCatData] = useState<CatCardProps[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getCats();
      setCatData(data);
      setLoading(false);
    })();
  }, []);

  return {
    catData,
    isLoading,
  };
};
