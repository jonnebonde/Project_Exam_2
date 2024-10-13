import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDataStore } from "../../../GlobalStates/UserData";

// Custom hook for mutations with auth token and API key
function useMutationDataAuth(url, method = "POST") {
  const token = UserDataStore((state) => state.user.accessToken);
  const apiKey = import.meta.env.VITE_API_KEY;
  const queryClient = useQueryClient(); // to invalidate queries after success

  const mutation = useMutation({
    mutationFn: async (dataToSend) => {
      const response = await fetch(url, {
        method: method, // dynamic method (POST, PUT, DELETE)
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          "X-Noroff-API-Key": apiKey,
        },
        body: dataToSend ? JSON.stringify(dataToSend) : null, // Send body for POST/PUT
      });

      if (!response.ok) {
        throw new Error(`Error: ${method} request failed`);
      }

      return response.json();
    },
    onSuccess: () => {
      console.log("Mutation successful");
      queryClient.invalidateQueries(); // Invalidate queries to trigger refetch
    },
    onError: (error) => {
      console.error("Mutation failed:", error.message);
    },
  });

  return mutation;
}

export default useMutationDataAuth;
