// src/hooks/useGetUserInfo.js
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/api";

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
