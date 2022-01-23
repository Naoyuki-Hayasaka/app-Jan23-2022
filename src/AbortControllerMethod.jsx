import React, { useState } from "react";
import axios from "axios";
import Button from "./components/Button";

// const controller = new AbortController();
let controller;

const AbortControllerMethod = () => {
  const [resources, setResources] = useState([]);

  const getPost = async () => {
    controller = new AbortController();
    try {
      const posts = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          signal: controller.signal
        }
      );
      setResources(posts.data);
      console.log(resources);
    } catch (error) {
      if (error.message === "canceled") {
        console.log("Request canceled", error.message);
      } else {
        throw error;
      }
    }
  };

  const handleCancel = () => {
    controller?.abort();
    console.log(controller);
  };

  return (
    <div>
      <Button onClick={getPost}>Posts</Button>
      <Button onClick={handleCancel}>キャンセル</Button>
      {resources.map((resource) => (
        <p key={resource.id}>{resource.title}</p>
      ))}
    </div>
  );
};

export default AbortControllerMethod;
