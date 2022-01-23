import React, { useState } from "react";
import axios from "axios";
import Button from "./components/Button";

const controller = new AbortController();

const AbortControllerMethod = () => {
  const [resources, setResources] = useState([]);

  const getPost = async () => {
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
    controller.abort();
  };

  return (
    <div>
      <Button onClick={() => setTimeout(getPost, 5000)}>Posts</Button>
      <Button onClick={handleCancel}>キャンセル</Button>
      {resources.map((resource) => (
        <p key={resource.id}>{resource.title}</p>
      ))}
    </div>
  );
};

export default AbortControllerMethod;
