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
        const errorData = await response.json();
        const errorMessage = errorData.errors?.[0]?.message || "Request failed";
        console.log(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // automatically log in user after a successful registration
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
      const errorData = await response.json();
      const errorMessage = errorData.errors[0] || "Request failed";
      console.log(errorMessage);
      throw new Error("Login failed");
    }

    const loginData = await response.json();

    login(loginData.data);

    navigate("/");
  };

  return mutation;
}
