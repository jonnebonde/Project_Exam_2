import { useQuery } from "@tanstack/react-query";

function useFetchData(url, queryKey) {
  const { isPending, error, data } = useQuery({
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
  });

  return { isPending, error, data };
}

export default useFetchData;
