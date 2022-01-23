import React from "react";
import PropTypes from "prop-types";
import { memo } from "react";

const style = {
  width: "100%",
  height: "200px",
  backgroundColor: "khaki"
};

const ChildArea = memo(({ open, onClickClose }) => {
  console.log("ChildAreaがレンダリングされた！");
  const data = [...Array(2000).keys()];
  data.forEach(() => {
    console.log("...");
  });
  return (
    <>
      {open ? (
        <div style={style}>
          <p>子コンポーネント</p>
          <button onClick={onClickClose}>閉じる</button>
        </div>
      ) : null}
    </>
  );
});

ChildArea.propTypes = {
  open: PropTypes.bool
};

export default ChildArea;
