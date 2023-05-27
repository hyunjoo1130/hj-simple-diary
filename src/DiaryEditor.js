import React, { useState } from "react";
import "./DiaryEditor.scss";

function DiaryEditor() {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      // ⭐️ state 객체의 갯수가 많고, 이미 저장돼있는 값을 그대로 쓰고 싶을 때, 아래와 같이 spread operator 를 쓸 수 있는데, 무조건 변화할 값보다 먼저 써줘야 한다. 이유는. state 객체를 펼치면서, 기존의 author 에, 변화할 author 의 값을 덮어씌우기 때문이다. 뒤에 쓰면 변화한 값에 다시 기존의 author 의 값이 덮어써지기 때문에 변화가 없어보인다.
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("오늘의 일기가 저장되었습니다!");
  };

  return (
    <div className="DiaryEditor">
      <h1>My Today's Diary</h1>
      <div className="authorBox">
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div className="contentBox">
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div className="emotionBox">
        <span className="txt">나의 오늘의 감정을 숫자로 표현해보세요 :)</span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className="submitBtn">
        <button className="btn" onClick={handleSubmit}>
          일기 저장
        </button>
      </div>
    </div>
  );
}

export default DiaryEditor;
