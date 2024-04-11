import api from '@src';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

export type Inventory = {
  id: number;
  lotNumber: string;
  location: string;
  quantity: number;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy: string;
}

const useInventory = ({ id }: { id?: number }) => {
  const [result, setResult] = useState<Inventory[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    setLoading(true);
    const controller = new AbortController();
    const endpoint = id ? `/api/inventory/${id}` : '/api/inventory';
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

export default useInventory;
