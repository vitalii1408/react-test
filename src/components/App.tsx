import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCharacter = async (id: string) => {
  const response = await axios.get(`https://swapi.info/api/people/${id}`);
  return response.data;
};

export default function App() {
  const [characterId, setCharacterId] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: characterId !== '',
  });

  const handleSearch = (formData: FormData) => {
    const id = formData.get('id') as string;
    setCharacterId(id);
  };

  return (
    <>
      <form action={handleSearch}>
        <input type="text" name="id" placeholder="Enter character ID" />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! {error?.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}
