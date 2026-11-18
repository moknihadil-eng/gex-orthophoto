// src/hooks/useAuthLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function useAuthLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.resetQueries({ queryKey: ["currentUser"] });
      navigate("/dashboard", { replace: true });
    },
  });
}
