import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UserDataStore } from "../../../../GlobalStates/UserData";
import { base_Url } from "../../../../../Constants/API";

export function useSubmitForm() {
  const navigate = useNavigate();
  const login = UserDataStore((state) => state.login);

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

      // Log in user after successful registration
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

    login(loginData.data);

    navigate("/");
  };

  return mutation;
}
