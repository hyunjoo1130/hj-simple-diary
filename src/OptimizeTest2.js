import React, { useEffect, useState } from "react";

// React.memo 는 컴포넌트의 성능 최적화를 위해 사용한다.
// CounterA 는 React.memo로 인해 count의 값이 변화하지 않을 시, 리렌더링이 되지 않는다.
// useState 로 사용하는 count는 변수에 값을 할당받기 때문에, 값이 동일하면 주소도 동일하기에 React.memo로 인해 리렌더링이 되지 않는다.
const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log("update * count : ", count);
  });
  return <div>{count}</div>;
});

// CounterB 는 React.memo로 감쌌으나, count의 값이 동일하게 1임에도, 리렌더링이 일어나 useEffect 내 console 이 계속 출력되는 것을 확인할 수 있다.
// prop이 obj, 객체이기 때문이다. 객체는 같은 값을 가지고 있을지라도, 다른 주소에 있는 값이기 때문에, 다른 값으로 인식하게 되어 React.memo로 묶어줬음에도 계속해서 리렌더링이 일어나는 것이다. (주소 비교로 인한 얕은 비교)
// 그래서 객체 props의 경우 React.memo를 잘 먹히게 하려면, areEqual 함수를 사용해야 한다. 아래 함수 참고 (이에 대한 정보는, React 공식문서에 자세히 나와있음)
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log("update * obj.count : ", obj.count);
  });
  return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true;
  }
  return false;
  // return true // 이전 props와 현재 props가 같다 => 리렌더링 x
  // return false // 이전 props와 현재 props가 다르다 => 리렌더링 o
};

const MemoizedCounterB = React.memo(CounterB, areEqual);
// 객체의 값이 똑같을 때, 리렌더링이 발생하지 않게 된다. 이렇게 React.memo 문법에 맞춰 사용하면, 객체 props 도 올바로 최적화 시킬 수 있다.

const OptimizeTest2 = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 30 }}>
      <div style={{ padding: 30 }}>
        <h2>counter 1</h2>
        <CounterA count={count} />
        {/* 아래 setCount를 통해 count를 줌으로써, 변화는 일어났지만, 값 자체는 똑같이 1이므로 변화가 없다. 이런 버그아닌 버그같은 부분을 통해 React.memo를 알아보자 */}
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div style={{ padding: 30 }}>
        <h2>counter 2</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest2;
