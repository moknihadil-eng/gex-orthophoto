import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { toast } from 'react-toastify';  

const useAuthRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Compte créé. Vous pouvez vous connecter.");
      navigate('/signin');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Inscription impossible. Veuillez réessayer.");
    },
  });
};

export default useAuthRegister;
