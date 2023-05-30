import React from "react";
import "./DiaryList.scss";
import DiaryItem from "./DiaryItem";

function DiaryList({ data, onRemove, onEdit }) {
  return (
    <div className="DiaryList">
      <h1>My Diary List</h1>
      <h3>{data.length}개의 일기가 있습니다.</h3>
      <div className="diaryPostBox">
        {data.map((el) => {
          return (
            <DiaryItem
              key={el.id}
              {...el}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

// 혹여나 잘 받아오지 못할 시, 에러안나게 기본값을 정해놓는다.
DiaryList.defaultProps = {
  data: [],
};

export default DiaryList;
