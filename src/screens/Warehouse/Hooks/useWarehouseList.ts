import api from '@src';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

const useWarehouseList = () => {
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    api.get('/api/warehouse/list', { signal: controller.signal })
      .then(response => {
        setResult(response.data);
        setLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  if (typeof result === 'string') {
    setResult([]);
  }

  return { result, error, isLoading };
}

export default useWarehouseList;
