"use client";

import { deletePostAction } from "@/app/actions/post";
import { useTransition } from "react";

export const DeleteButton = async ({ postId }: { postId: string | number }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      className="btn btn-outline btn-danger"
      onClick={() => {
        startTransition(async () => {
          await deletePostAction(postId);
        });
      }}
    >
      {isPending ? "Deletein" : "Delete"}
    </button>
  );
};
