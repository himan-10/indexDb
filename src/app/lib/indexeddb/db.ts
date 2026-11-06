import { openDB, type DBSchema } from "idb";
import type { Post } from "@/app/types/post"

interface MyDatabase extends DBSchema {
  posts: {
    key: number;
    value: Post;
  };
  login: {
    key:number;
    value:login;

  };
}

export const getDB = () => {
  return openDB<MyDatabase>("PostDatabase", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("posts")) {
        db.createObjectStore("posts", {
          keyPath: "id",
        });
      }

      if (!db.objectStoreNames.contains("login")){
        db.createObjectStore("login",{
          keyPath:"id",
        })

      }
    },
  });
};