import { useEffect, useState } from "react";
import axios from "../../src/lib/api";
import { useAuth } from "../../src/lib/auth";
import { ThemeToggle } from "../../src/components/ThemeToggle";
import { useNavigate } from "react-router";

export function Welcome() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status
  useEffect(() => {
    console.log('Welcome page - isAuthenticated:', isAuthenticated);
    // Small delay to ensure auth context is properly initialized
    const timer = setTimeout(() => {
      setAuthChecked(true);
      console.log('Auth check completed - isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        console.log('Redirecting to login...');
        navigate('/login');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <main className="flex items-center justify-center pt-16 pb-8 px-4">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get<Post[]>('/api/v1/posts')
      .then((res) => {
        if (mounted) setLocalPosts(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to fetch posts', err);
        if (mounted) setError('Failed to load posts');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      title: title.trim() || "Untitled",
      content: content.trim(),
    };
    // Optimistic update
    setLocalPosts([newPost, ...localPosts]);
    setTitle("");
    setContent("");

    // Send to server
    axios
      .post('/api/v1/posts', { title: newPost.title, content: newPost.content })
      .then((res) => {
        // replace optimistic item (matched by id) with server-saved one (has real id)
        setLocalPosts((prev) => {
          const withoutOptimistic = prev.filter((p) => p.id !== newPost.id);
          return [res.data, ...withoutOptimistic];
        });
      })
      .catch((err) => {
        console.error('Failed to save post', err);
        setError('Failed to save post');
        // remove optimistic post
        setLocalPosts((prev) => prev.filter((p) => p.id !== newPost.id));
      });
  }

  return (
    <main className="flex items-center justify-center pt-16 pb-8 px-4">
      <div className="w-full max-w-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-2xl shadow-lg p-8">
        <header className="flex flex-col items-center gap-3 mb-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-center gap-3 flex-1">
              <h1 className="text-3xl font-semibold">Posts</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share something with the world</p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={async () => await logout()}
                className="inline-flex items-center gap-2 bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="flex-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
              disabled={!title.trim() && !content.trim()}
            >
              Post
            </button>
          </form>
        </section>

        <section>
          {loading ? (
            <p className="text-center text-gray-500">Loading posts…</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : localPosts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {localPosts.map((post) => (
                <li
                  key={post.id}
                  className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800"
                >
                  <h2 className="text-lg font-medium">{post.title}</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{post.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

type Post = {
  id: number;
  title: string;
  content: string;
};