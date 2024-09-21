import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { globalState } from "../../Hooks/GlobalStates"; // Import Zustand store
import { base_Url } from "../../Constants/API";

export function useSubmitForm() {
  const navigate = useNavigate();
  const login = globalState((state) => state.login); // Access Zustand login action

  const mutation = useMutation({
    mutationFn: async ({ url, formData, isRegistration }) => {
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

      const data = await response.json();

      // If it's a registration, log in the user after successful registration
      if (isRegistration) {
        const { email, password } = formData;
        await loginUser({ email, password });
      } else {
        await loginUser({ email: formData.email, password: formData.password });
      }

      return data;
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const loginUser = async ({ email, password }) => {
    const loginUrl = base_Url + "auth/login?_holidaze=true";
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const loginData = await response.json();

    // Use Zustand's login action to update both Zustand state and localStorage
    login(loginData.data);

    navigate("/");
  };

  return mutation;
}
