import { useQuery } from "@tanstack/react-query";

function useFetchData(url, queryKey) {
  const { isPending, error, data, fetchNextPage } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("There was an error fetching the data");
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.page + 1 : undefined;
    },
  });

  return { isPending, error, data, fetchNextPage };
}

export default useFetchData;
