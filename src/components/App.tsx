import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPerson = async (id: number) => {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
};

export default function App() {
  const [count, setCount] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['person', count],  // змінюємо ключ запиту залежно від count
    queryFn: () => fetchPerson(count),
  });

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Get next character</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}
