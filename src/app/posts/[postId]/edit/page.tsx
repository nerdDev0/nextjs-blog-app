import { PostForm } from "@/components/PostForm";
import { getPost } from "@/db/posts";
import { getUsers } from "@/db/users";
import { notFound } from "next/navigation";
import { UserSelectOptions } from "../../userSelectOptions";

export default async function EditPostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const [post, users] = await Promise.all([getPost(postId), getUsers()]);

  if (post == null) {
    return notFound();
  }
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        UserSelectOptions={<UserSelectOptions users={users} />}
        post={post}
      />
    </>
  );
}
