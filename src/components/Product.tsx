// src/components/Product.tsx

import { useQuery } from '@tanstack/react-query';

type ProductData = { name: string; price: number };

function myQueryFunction() {
  return new Promise<ProductData>((resolve) => {
    setTimeout(() => resolve({ name: 'Tacos', price: 999 }), 1000);
  });
}

export default function Product() {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['myQueryKey'],
    queryFn: myQueryFunction,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {String(error)}</p>;

  if (isSuccess) {
    return (
      <div>
        <h2>{data.name}</h2>
        <p>Price: {data.price} credits</p>
      </div>
    );
  }

  return null;
}
