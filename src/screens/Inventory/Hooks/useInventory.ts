import { api } from '@screens/Authenticate/Login';
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

  // Sending not recieving
  fromLocation?: string;
  comments?: string;
}

type Props = {
  id?: number;
  lotNumber?: string;
  location?: string;
  createdBy?: string;
  updatedBy?: string;
  startDate?: string;
  endDate?: string;
}
const useInventory = ({ id, lotNumber, location, createdBy, updatedBy, startDate, endDate }: Props) => {
  const [result, setResult] = useState<Inventory[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const params: URLSearchParams = new URLSearchParams();
  if (id) params.append('id', id.toString());
  if (lotNumber) params.append('lotNumber', lotNumber);
  if (location) params.append('location', location);
  if (createdBy) params.append('createdBy', createdBy);
  if (updatedBy) params.append('updatedBy', updatedBy);
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);

  useEffect(() => {
    if (
      id === 0 ||
      lotNumber === '' ||
      location === '' ||
      createdBy === '' ||
      updatedBy === '' ||
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
