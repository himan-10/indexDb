import { getDB } from "./db";
import type { Post } from "@/app/types/post";

export const savePosts = async (posts: Post[]) => {
  const db = await getDB();

  const tx = db.transaction("posts", "readwrite");

  //	Waits for all Promises to fulfil
//   Wait for all operations and transaction completion

  await Promise.all([
    ...posts.map((post) => tx.store.put(post)),
    tx.done,
  ]);
};

export const getPosts = async () => {
  const db = await getDB();

  return db.getAll("posts");
};

export const deletePost = async (id: number) => {
  const db = await getDB();

  return db.delete("posts", id);
};

export const clearPosts = async () => {
  const db = await getDB();

  return db.clear("posts");
};