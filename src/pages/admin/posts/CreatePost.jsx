import { useState } from "react";
import { Button, CreatePostForm, CreatePostModal } from "../../../components";

const CreatePost = () => {
  return (
    <div className="p-3 bg-white rounded-lg shadow-md min-h-[calc(100vh-80px)]">
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
