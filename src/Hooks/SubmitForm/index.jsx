import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "../../Hooks/LocalStorage"; // Import your localStorage hook

export function useSubmitForm() {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [user, setUserData] = useLocalStorageState("userData", null);

  const mutation = useMutation({
    mutationFn: async ({ url, formData }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Form submitted successfully:", data);
      setUserData(data.data);

      navigate("/");
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  return mutation;
}
