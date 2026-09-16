import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import OrderForm from './OrderForm';

const PAGE_SIZE = 5;
const TOTAL_PEOPLE = 82;

type Character = {
  name: string;
  height: string;
  url: string;
};

// Симулюємо "сторінку" даних: swapi.info віддає весь список одразу,
// тож для прикладу нескінченного завантаження ми самі ділимо людей на групи по id.
const fetchPeoplePage = async (page: number): Promise<Character[]> => {
  const start = (page - 1) * PAGE_SIZE + 1;
  const ids = Array.from({ length: PAGE_SIZE }, (_, i) => start + i).filter(
    (id) => id <= TOTAL_PEOPLE
  );

  const responses = await Promise.all(
    ids.map((id) => axios.get(`https://swapi.info/api/people/${id}`))
  );

  return responses.map((response) => response.data);
};

export default function App() {
  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['people'],
    queryFn: ({ pageParam }) => fetchPeoplePage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return (nextPage - 1) * PAGE_SIZE < TOTAL_PEOPLE ? nextPage : undefined;
    },
  });

  return (
    <>
      <h1>Star Wars characters</h1>

      <OrderForm />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}

      <ul>
        {data?.pages.flat().map((person) => (
          <li key={person.url}>{person.name}</li>
        ))}
      </ul>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load more'}
        </button>
      )}
    </>
  );
}
