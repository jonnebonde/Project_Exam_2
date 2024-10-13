import { useQuery } from "@tanstack/react-query";
import { UserDataStore } from "../../../GlobalStates/UserData";

function useGetDataAuth(url, queryKey) {
  const token = UserDataStore((state) => state.user.accessToken);
  const apiKey = import.meta.env.VITE_API_KEY;

  const { isPending, error, data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          "X-Noroff-API-Key": apiKey,
        },
      });

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

export default useGetDataAuth;
