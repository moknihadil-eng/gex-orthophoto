import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConnectButton from "./ConnectButton";
import SignupLink from "./SignupLink";

import { useForm } from "react-hook-form";
import useAuthLogin from "../../hooks/useAuthLogin";

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: login, isPending, error: loginError } = useAuthLogin();

  return (
    <form
      onSubmit={handleSubmit((data) => login(data))}
      className="w-full max-w-lg bg-white rounded shadow-md p-6 flex flex-col gap-4"
    >
      <EmailInput
        {...register("email", {
          required: "L’adresse email est requise",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Adresse email invalide",
          },
        })}
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-gray-700 text-sm font-bold">
            Mot de passe
          </label>
        </div>
        <PasswordInput
          {...register("password", { required: "Mot de passe requis" })}
          error={errors.password}
        />
      </div>

      {loginError && (
        <div className="text-red-500 text-xs">
          {loginError.response?.status === 401
            ? "Identifiants incorrects."
            : "Connexion impossible. Veuillez réessayer."}
        </div>
      )}
      <ConnectButton disabled={isPending} />
      <SignupLink />
    </form>
  );
};

export default SigninForm;
