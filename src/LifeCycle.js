import React, { useState, useEffect } from "react";

const LifeCycle = () => {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState("");

  // // ⭐️ 의존성 배열에 아무것도 담지 않으면, mount될 때만 useEffect 콜백함수가 실행된다
  // useEffect(() => {
  //   console.log("Mount!");
  // }, []);

  // // ⭐️ 의존성 배열을 넣지 않으면, state가 바뀌는 등 update가 일어날 때마다 실행된다
  // useEffect(() => {
  //   console.log("Update!");
  // });

  // // ⭐️ 특정 변화값만 감지하여, 그 값이 변화될 때마다 실행된다.
  // useEffect(() => {
  //   console.log(`count가 변화되었습니다 -> ${count}`);
  //   if (count === 6) {
  //     alert("count가 5를 넘었습니다. 1로 초기화합니다.");
  //     setCount(1);
  //   }
  // }, [count]);

  return (
    <div style={{ padding: 30, textAlign: "center" }}>
      <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>click</button>
      </div>
      <div>
        <input
          style={{ marginTop: 20 }}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default LifeCycle;
