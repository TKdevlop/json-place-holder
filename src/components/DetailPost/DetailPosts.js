import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Spinner from "../Spinner";

function DetailPosts(props) {
  const postSchema = { title: "", body: "", id: null };
  const [post, setPost] = useState(postSchema);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    let url = props.history.location.pathname.split("/");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${url[2]}`
    );
    const fetchedPost = await response.json();
    setLoading(false);
    setPost({
      title: fetchedPost.title,
      body: fetchedPost.body,
      id: fetchedPost.id
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Typography variant="h4" gutterBottom>
        {post.title} id : {post.id}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {post.body}
      </Typography>
    </div>
  );
}
export default withRouter(DetailPosts);
