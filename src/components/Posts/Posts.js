import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Addposts from "../Addposts";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Spinner from "../Spinner";
import Model from "../Model";
import Create from "@material-ui/icons/Create";
import { withRouter } from "react-router-dom";
const useFetch = async (input, settings = {}) => {
  const response = await fetch(input, {
    headers: {
      Accept: "application/json"
    },
    ...settings
  });
  return response.json();
};
const addPosts = async (title, body, posts, setPosts, setLoading) => {
  setLoading(true);
  await useFetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    contentType: "application/json",
    body: JSON.stringify({ title, body })
  });
  setLoading(false);
  setPosts([...posts, { title, body, id: Math.random() * 1000 }]);
};

const getSinglePost = (id, props) => {
  let url = `/post/${id}`;
  props.history.push(url);
};
const deleteSinglePost = async (posts, post, setPosts, setLoading) => {
  setLoading(true);
  const res = await useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    {
      method: "DELETE"
    }
  );
  if (!res.keys) {
    const updatedPosts = posts.filter(thisPost => thisPost.id !== post.id);
    setLoading(false);
    setPosts([...updatedPosts]);
  }
};
const openModel = (setModel, post, setSelectedPost) => {
  setModel(true);
  setSelectedPost({ title: post.title, body: post.body, id: post.id });
};
const closeModel = setModel => {
  setModel(false);
};
const updatePost = async (
  title,
  body,
  id,
  setLoading,
  posts,
  setPosts,
  setModel
) => {
  console.log("setPosts", setPosts);
  console.log("posts", posts);
  console.log("setLoading", setLoading);
  console.log("id", id);
  console.log("body", body);
  console.log("title", title);

  setLoading(true);
  setModel(false);
  const response = await useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      data: JSON.stringify({ title, body, id }),
      contentType: "Application/json",
      method: "PUT"
    }
  );
  console.log(response);
  const updatedPosts = posts.map(localPost => {
    if (localPost.id === id) {
      return {
        id,
        title,
        body
      };
    }
    return localPost;
  });

  setLoading(false);

  setPosts([...updatedPosts]);
};

const renderPosts = (
  posts,
  setPosts,
  setLoading,
  props,
  setModel,
  setSelectedPost
) =>
  posts.map(post => (
    <ListItem key={post.id} dense button onClick={() => {}}>
      <ListItemText
        onClick={() => getSinglePost(post.id, props)}
        style={{
          fontSize: 16
        }}
        primary={post.title}
        secondary={post.body}
      />

      <ListItemSecondaryAction>
        <IconButton aria-label="Edit">
          <Create onClick={() => openModel(setModel, post, setSelectedPost)} />
        </IconButton>
        <IconButton aria-label="Delete">
          <DeleteForever
            onClick={() => {
              deleteSinglePost(posts, post, setPosts, setLoading);
            }}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState(false);
  const selectedPostSchema = {
    title: "",
    body: "",
    id: null
  };
  const [selectedPost, setSelectedPost] = useState(selectedPostSchema);
  useEffect(async () => {
    const posts = await useFetch("https://jsonplaceholder.typicode.com/posts");
    setLoading(false);
    setPosts([...posts]);
  }, []);

  return (
    <div>
      <Addposts
        onSubmit={(title, body) =>
          addPosts(title, body, posts, setPosts, setLoading)
        }
      />
      <Model
        updatePost={(title, body, id) =>
          updatePost(title, body, id, setLoading, posts, setPosts, setModel)
        }
        closeModel={() => closeModel(setModel)}
        show={model}
        selectedPost={selectedPost}
      />
      {loading ? (
        <Spinner />
      ) : (
        <List component="ul">
          {renderPosts(
            posts,
            setPosts,
            setLoading,
            props,
            setModel,
            setSelectedPost
          )}
        </List>
      )}
    </div>
  );
}

export default withRouter(Posts);
