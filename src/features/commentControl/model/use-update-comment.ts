import { useMutationUpdateComment } from "@/entities/comment/api/use-mutation-update-comment";
import { CommentType } from "@/entities/comment/model/comment-type";
import { useState } from "react";

export const useUpdateComment = (comment: CommentType) => {
  const [newContent, setNewContent] = useState<string>(comment.body);
  const mutation = useMutationUpdateComment(newContent, comment.id);

  async function handleUpdateComment(
    updateComment: (newComment: CommentType) => void,
    close: () => void,
  ) {
    const newCommentData = await mutation.mutateAsync();
    setNewContent("");
    updateComment(newCommentData);
    close();
  }

  function handleChangeContent(content: string) {
    setNewContent(content);
  }

  return { newContent, handleChangeContent, handleUpdateComment };
};