import React, { useEffect, useState } from "react";

// React.memo 는 컴포넌트의 성능 최적화를 위해 사용한다.
const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log("update * text : ", text);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log("update * count : ", count);
  });

  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 30 }}>
      <div style={{ padding: 30 }}>
        <h2>카운트</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}> ㅡ </button>
      </div>
      <div style={{ padding: 30 }}>
        <h2>텍스트</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
