"use client";

import { FormGroup } from "./FormGroup";
import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { SkeletonInput } from "./Skeleton";

import { useFormState, useFormStatus } from "react-dom";
import { CreatePostAction, editPostAction } from "@/app/actions/post";
type Props = {
  post?: { id: number; title: string; body: string; userId: number };
  UserSelectOptions: ReactNode;
};
export function PostForm({ post, UserSelectOptions }: Props) {
  const action =
    post == null ? CreatePostAction : editPostAction.bind(null, post.id);
  const [errors, formAction] = useFormState(action, {});
  return (
    <form action={formAction} className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={post?.userId}>
            <Suspense fallback={<option value="">Loading...</option>}>
              {UserSelectOptions}
            </Suspense>
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={post?.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link
          className="btn btn-outline"
          href={post ? `/posts/${post.id}` : "/posts"}
        >
          Cancel
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn">
      {pending ? "Seving" : "Save"}
    </button>
  );
};

export function SkeletonPostForm() {
  return (
    <form className="form">
      <div className="form-row">
        <FormGroup>
          <label htmlFor="title">Title</label>
          <SkeletonInput />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <SkeletonInput />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" href="/posts">
          Cancel
        </Link>
        <button disabled className="btn">
          Save
        </button>
      </div>
    </form>
  );
}
