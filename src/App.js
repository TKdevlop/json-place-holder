import React, { useState, useEffect, useRef } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Addposts from "./components/Addposts";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteForever from "@material-ui/icons/DeleteForever";

const useFetch = async (input, settings = {}) => {
  const response = await fetch(input, {
    headers: {
      Accept: "application/json"
    },
    ...settings
  });
  return response.json();
};
const addPosts = async (title, body, posts, setPosts) => {
  console.log("ADDPOSTS");
  const response = await useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify({ title, body })
    }
  );
  setPosts([...posts, { title, body, id: Math.random() * 1000 }]);
};

const getSinglePost = async id => {
  const res = await useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  console.log(res);
};
const deleteSinglePost = async (posts, post, setPosts) => {
  const res = await useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    {
      method: "DELETE"
    }
  );
  if (!res.keys) {
    const updatedPosts = posts.filter(thisPost => thisPost.id !== post.id);
    setPosts([...updatedPosts]);
  }
};

const renderPosts = (posts, setPosts) =>
  posts.map(post => (
    <ListItem key={post.id} dense button onClick={() => {}}>
      <ListItemText
        onClick={() => getSinglePost(post.id)}
        style={{
          fontSize: 16
        }}
        primary={post.body}
      />

      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteForever
            onClick={() => {
              deleteSinglePost(posts, post, setPosts);
            }}
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const posts = await useFetch("https://jsonplaceholder.typicode.com/posts");
    setPosts([...posts]);
  }, []);

  return (
    <div>
      <Addposts
        onSubmit={(title, body) => addPosts(title, body, posts, setPosts)}
      />

      <List component="ul">{renderPosts(posts, setPosts)}</List>
    </div>
  );
}
