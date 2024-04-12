import { api } from '@screens/Login/Login';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react'
import { ProductLot } from './useProductLot';

export type LotQuery = {
  lotNumber?: string;
  internalReference?: string;
  productName?: string;
}

const useLotLookup = ({ lotNumber, internalReference, productName }: LotQuery) => {
  const [result, setResult] = useState<ProductLot[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!lotNumber && !internalReference && !productName) return;
    if (lotNumber === '' || internalReference === '' || productName === '') return;
    setLoading(true);

    const controller = new AbortController();
    const queryParams = new URLSearchParams({
      lotNumber: lotNumber || '',
      internalReference: internalReference || '',
      productName: productName || ''
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
  }, [lotNumber, internalReference, productName]);

  if (typeof result === 'string') {
    setResult([]);
  }

  return { result, error, isLoading };
}

export default useLotLookup;

