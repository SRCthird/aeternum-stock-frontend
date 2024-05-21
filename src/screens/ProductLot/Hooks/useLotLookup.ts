import { api } from '@screens/Authenticate/Login';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'
import { ProductLot } from './useProductLot';

export type LotQuery = {
  lot_number?: string;
  internal_reference?: string;
  product_name?: string;
}

const useLotLookup = ({ lot_number, internal_reference, product_name }: LotQuery) => {
  const [result, setResult] = useState<ProductLot[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!lot_number && !internal_reference && !product_name) return;
    if (lot_number === '' || internal_reference === '' || product_name === '') return;
    setLoading(true);

    const controller = new AbortController();
    const queryParams = new URLSearchParams({
      lot_number: lot_number || '',
      internal_reference: internal_reference || '',
      product_name: product_name || ''
    });

    api.get(
      `/api/product-lot?${queryParams.toString()}`,
      { signal: controller.signal }
    )
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
  }, [lot_number, internal_reference, product_name]);

  if (typeof result === 'string') {
    setResult([]);
  }

  return { result, error, isLoading };
}

export default useLotLookup;

