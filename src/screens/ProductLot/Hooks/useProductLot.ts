import { api } from '@screens/Authenticate/Login';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

export type ProductLot = {
  id: number;
  lotNumber: string;
  internalReference: string;
  productName: string;
  quantity: number;
}

const useProductLot = ({ id }: { id?: number }) => {
  const [result, setResult] = useState<ProductLot[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    setLoading(true);
    const controller = new AbortController();
    const endpoint = id ? `/api/product-lot/${id}` : '/api/product-lot';
    api.get(endpoint, { signal: controller.signal })
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

export default useProductLot;
