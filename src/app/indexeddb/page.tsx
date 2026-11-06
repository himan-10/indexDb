"use client";

import { useEffect, useState } from "react";
import type { Post } from "@/app/types/post";

import {
  savePosts,
  getPosts,
} from "@/app/lib/indexeddb/postDb";

export default function IndexedDBPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAndStorePosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data: Post[] = await response.json();

      // Store API data in IndexedDB
      await savePosts(data);

      // Retrieve stored data
      const storedPosts = await getPosts();

      setPosts(storedPosts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndStorePosts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        IndexedDB Posts
      </h1>

      <button
        onClick={fetchAndStorePosts}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Fetching..." : "Fetch & Store Posts"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="font-semibold">
              {post.id}. {post.title}
            </h2>

            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}