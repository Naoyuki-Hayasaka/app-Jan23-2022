import React, { useState } from "react";
import axios from "axios";
import Button from "./components/Button";

// キャンセルトークンのソースを生成
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const CancelTokenMethod = () => {
  const [resources, setResources] = useState([]);
  const jsonPlaceHolder = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
  });

  const getPost = async () => {
    try {
      // const posts = await jsonPlaceHolder.get("/posts");
      const posts = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          cancelToken: source.token
        }
      );
      setResources(posts.data);
      console.log(resources);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    source.cancel("リクエストを中断しました");
  };

  return (
    <div>
      <Button onClick={() => setTimeout(getPost, 10000)}>Posts</Button>
      <Button onClick={handleCancel}>キャンセル</Button>
      {resources.map((resource) => (
        <p key={resource.id}>{resource.title}</p>
      ))}
    </div>
  );
};

export default CancelTokenMethod;
