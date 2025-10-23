import { useState } from "react";
import axios from "../../src/lib/api";
import { useAuth } from "../../src/lib/auth";
import { ThemeToggle } from "../../src/components/ThemeToggle";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Sign in to your account." },
  ];
}

export function loader({}: Route.LoaderArgs) {
  return null;
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    axios
      .post("/api/v1/auth/login", { 
        username: username.trim(), 
        password: password.trim() 
      })
      .then((res) => {
        setSuccess("Login successful!");
        // Use the auth context to handle login
        if (res.data.accessToken) {
          login(res.data.accessToken);
          // Clear form
          setUsername("");
          setPassword("");
          // Navigate to home page using React Router
          setTimeout(() => {
            navigate('/');
          }, 100);
        }
      })
      .catch((err) => {
        console.error('Login failed', err);
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Login failed. Please check your credentials.');
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-8 px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-lg p-8">
        <header className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center gap-3 flex-1">
              <h1 className="text-3xl font-semibold">Login</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account</p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <section>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                id="username"
                className="rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                className="rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
              disabled={loading || !username.trim() || !password.trim()}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Login;
