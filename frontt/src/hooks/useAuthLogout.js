import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../services/api";

const useAuthLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    
    mutationFn: logout,
    onSettled: async () => {
      await queryClient.resetQueries({ queryKey: ["currentUser"] });
      navigate("/signin", { replace: true });
    },
  });
};

export default useAuthLogout;
