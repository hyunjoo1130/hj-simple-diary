import React from "react";
import "./DiaryList.scss";
import DiaryItem from "./DiaryItem";

function DiaryList({ dummyList }) {
  return (
    <div className="DiaryList">
      <h1>일기 리스트</h1>
      <h3>{dummyList.length}개의 일기가 있습니다.</h3>
      <div className="diaryPostBox">
        {dummyList.map((el) => {
          return <DiaryItem key={el.id} {...el} />;
        })}
      </div>
    </div>
  );
}

// 혹여나 잘 받아오지 못할 시, 에러안나게 기본값을 정해놓는다.
DiaryList.defaultProps = {
  dummyList: [],
};

export default DiaryList;
