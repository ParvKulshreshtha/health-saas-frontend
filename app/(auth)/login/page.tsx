"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/services/authService";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    try {
      await signIn(email, password); // sets cookie + Firebase auth
      router.push("/dashboard"); // now cookie exists, middleware allows it
    } catch (err: unknown) {
      const code =
        typeof err === "object" && err !== null && "code" in err
          ? (err as { code?: string }).code
          : undefined;

      if (code === "auth/user-not-found")
        setError("No account found with this email");
      else if (code === "auth/wrong-password")
        setError("Incorrect password");
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
            Sign in
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email */}
          <div className="relative">
            <label htmlFor="login-email" className="sr-only">
              Email
            </label>
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              className="h-11 w-full rounded-xl border border-border bg-transparent pl-10 pr-3 text-foreground placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label htmlFor="login-password" className="sr-only">
              Password
            </label>
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
            />
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              className="h-11 w-full rounded-xl border border-border bg-transparent pl-10 pr-3 text-foreground placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
                Sign in
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

          <p className="mt-5 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="font-medium text-primary-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
