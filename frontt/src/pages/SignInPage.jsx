// src/pages/SignInPage.jsx
import React, { useState } from "react";
import useAuthLogin         from "../hooks/useAuthLogin";
import SigninCard           from "../components/auth/SigninCard";

export default function SignInPage() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const { mutate: loginMutate, isLoading } = useAuthLogin();

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    loginMutate(form, {
      onError: err => setError(err.response?.data?.message || "Invalid credentials")
    });
  };

  return (
    <div style={{ maxWidth:400, margin:"2rem auto" }}>
      <h2>Sign In</h2>
      <SigninCard
        email        = {form.email}
        password     = {form.password}
        onChange     = {handleChange}
        onSubmit     = {handleSubmit}
        error        = {error}
        isSubmitting = {isLoading}
      />
    </div>
  );
}
