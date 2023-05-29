import React from "react";
import "./DiaryItem.scss";

function DiaryItem({ writer, content, emotion, created_at }) {
  return (
    <div className="DiaryItem">
      <p className="author">
        <span>
          <span style={{ fontWeight: "700" }}>작성자 :</span> {writer}
        </span>
        <span>
          <span style={{ fontWeight: "700" }}>감정점수 :</span> {emotion}점
        </span>
      </p>
      <hr />
      <div className="contentContainer">
        <div className="contentInner">
          <span style={{ fontWeight: "700" }}>내용</span>
          <p className="content">{content}</p>
        </div>
      </div>
      <hr />
      <p className="date">{new Date(created_at).toLocaleString()}</p>
    </div>
  );
}

export default DiaryItem;
