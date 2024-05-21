import { api } from '@screens/Authenticate/Login';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'

export type Inventory = {
  id: number;
  lot_number: string;
  location: string;
  quantity: number;
  created_at?: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;
  from_location: string;
  comments: string;
}

type Props = {
  id?: number;
  lot_number?: string;
  location?: string;
  created_by?: string;
  updated_by?: string;
  startDate?: string;
  endDate?: string;
}
const useInventory = ({ id, lot_number, location, created_by, updated_by, startDate, endDate }: Props) => {
  const [result, setResult] = useState<Inventory[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const params: URLSearchParams = new URLSearchParams();
  if (id) params.append('id', id.toString());
  if (lot_number) params.append('lot_number', lot_number);
  if (location) params.append('location', location);
  if (created_by) params.append('created_by', created_by);
  if (updated_by) params.append('updated_by', updated_by);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  useEffect(() => {
    if (
      id === 0 ||
      lot_number === '' ||
      location === '' ||
      created_by === '' ||
      updated_by === '' ||
      startDate === '' ||
      endDate === ''
    ) return;
    setLoading(true);
    const controller = new AbortController();
    const endpoint = id ? `/api/inventory/${id}` : '/api/inventory';
    api.get(endpoint, { signal: controller.signal, params })
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
