import React, { useState } from "react";
import axios from "axios";
import Button from "./components/Button";

// キャンセルトークンのソースを生成
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const Async = () => {
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
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      } else {
        console.error(thrown);
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

export default Async;
