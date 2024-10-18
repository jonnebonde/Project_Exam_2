import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDataStore } from "../../../GlobalStates/UserData";

function useMutationDataAuth(url, method = "POST") {
  const token = UserDataStore((state) => state.user.accessToken);
  const apiKey = import.meta.env.VITE_API_KEY;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (dataToSend) => {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          "X-Noroff-API-Key": apiKey,
        },
        body: dataToSend ? JSON.stringify(dataToSend) : null,
      });

      if (response.status === 204) {
        return Promise.resolve();
      }

      if (!response.ok) {
        throw new Error(`Error: ${method} request failed`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  return mutation;
}

export default useMutationDataAuth;
