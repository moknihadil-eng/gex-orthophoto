// src/hooks/useConfirmEmail.js
import { useQuery }      from "@tanstack/react-query";
import { useParams }     from "react-router-dom";
import { confirmEmail }  from "../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function useConfirmEmail() {
  const { token } = useParams();
  // On n’appelle la requête que si on a bien un token
  return useQuery({
    queryKey:   ["confirmEmail", token],
    queryFn:    () => confirmEmail(token),
    enabled:    !!token,
    staleTime:  Infinity,
    retry:      false,
  });
}
