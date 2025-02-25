import PostDetailLayout from "../../layouts/PostDetailLayout";
import PostDetail from "../../pages/post/PostDetailPage";

const PostRoutes = [
  {
    path: "/posts/:slug",
    element: <PostDetailLayout />,
    children: [{ path: "", element: <PostDetail /> }],
  },
];

export default PostRoutes;
