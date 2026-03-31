"use client";

import { toast } from "react-toastify";
import FormLogin from "@/components/auth/form_login";
import FormRegister from "@/components/auth/form_register";
import validateLoginInput from "@/validators/validate-login";
import validateRegisterInput from "@/validators/validate-register";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthCard from "@/components/auth/authCard";
import AuthTabs from "@/components/auth/authTabs";
import AuthHeader from "@/components/auth/authHeader";

const INITIAL_INPUT = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
};

export default function AuthPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [input, setInput] = useState(INITIAL_INPUT);
  const [mode, setMode] = useState("login");
  const [error, setError] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  // handle input (optimize)
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  // toggle mode (clean)
  const handleToggleMode = () => {
    setMode(prev => (prev === "login" ? "register" : "login"));
    setInput(INITIAL_INPUT);
    setError({});
  };

  // register
  const handleRegister = async () => {
    const err = validateRegisterInput(input);
    if (err) return setError(err);

    setError({});

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");
      handleToggleMode();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // login
  const handleLogin = async () => {
    const err = validateLoginInput(input);
    if (err) return setError(err);

    setError({});

    setIsLoading(true);

    try {
      await login(input.email, input.password);
      toast.success("Login successful");
      router.push("/home");
    } catch (err) {
      toast.error(err.message || "Login failed");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // submit
  const handleSubmit = e => {
    e.preventDefault();
    mode === "login" ? handleLogin() : handleRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 w-full max-w-sm px-4">
        <AuthHeader mode={mode} />

        <AuthCard>
          <AuthTabs mode={mode} toggleMode={handleToggleMode} />

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" ? (
              <FormRegister
                input={input}
                handleChangeInput={handleChangeInput}
                error={error}
              />
            ) : (
              <FormLogin
                input={input}
                handleChangeInput={handleChangeInput}
                error={error}
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2"
            >
              {isLoading && mode === "login" ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Logging in ...
                </>
              ) : mode === "login" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}
