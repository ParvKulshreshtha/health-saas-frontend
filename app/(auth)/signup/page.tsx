"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/services/authService";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    try {
      await signUp(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? (err as { code?: string }).code
          : undefined;

      if (code === "auth/email-already-in-use")
        setError("An account with this email already exists");
      else if (code === "auth/invalid-email")
        setError("Invalid email address");
      else if (code === "auth/weak-password")
        setError("Password is too weak");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(20,184,166,0.22),transparent_55%),radial-gradient(700px_circle_at_90%_20%,rgba(59,130,246,0.16),transparent_50%),linear-gradient(180deg,var(--color-surface),var(--color-background))] opacity-100" />

      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-px shadow-xl">
        <div className="rounded-2xl bg-card p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email */}
          <div className="relative">
            <label htmlFor="signup-email" className="sr-only">
              Email
            </label>
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              id="signup-email"
              type="email"
              placeholder="Email"
              className="h-11 w-full rounded-xl border border-border bg-transparent pl-10 pr-3 text-foreground placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="signup-password" className="sr-only">
              Password
            </label>
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-11 w-full rounded-xl border border-border bg-transparent pl-10 pr-10 text-foreground placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground/80"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="signup-confirm" className="sr-only">
              Confirm password
            </label>
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              id="signup-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="h-11 w-full rounded-xl border border-border bg-transparent pl-10 pr-10 text-foreground placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200/50 transition"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground/80"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm text-danger-500 bg-danger-50 p-2 rounded-xl border border-danger-500/20"
            >
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-primary-600 font-semibold text-white transition hover:bg-primary-700 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sign up
              </span>
            ) : (
              "Sign up"
            )}
          </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}