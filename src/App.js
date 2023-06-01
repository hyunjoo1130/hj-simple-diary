import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);

  // 변수를 사용하면, 리렌더 될 때마다 값이 초기화되어 다시 0이 되기 때문에
  // 아래함수에서 1을 더해줘도 점진적 변화가 일어나지 않게 된다.
  // 컴포넌트 내에서 변수를 사용할 때에는, useRef()를 사용하는게 좋다.
  // useRef()훅은 컴포넌트에서 가변 값에 대한 참조를 하기 원할 때 사용한다.
  // useRef()를 사용하여 생성된 참조 객체는, 컴포넌트의 렌더링 사이클 동안에도 유지되고,
  // state로 렌더링이 발생할 때 마다 초기화 되지 않는다. useRef()훅의 주요 동작 원리이다.
  // 그리하여, useRef()는 변수의 값을 저장하고 있다가 useState를 통해 페이지가 ReRendering될 때 변경된 값을 확인 할 수 있는 것이다.
  let dataId = useRef(1);

  const postData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((res) => {
        const initData = res.slice(0, 20).map((el) => {
          return {
            writer: el.name.slice(0, 10),
            content: el.body,
            emotion: Math.floor(Math.random() * 5) + 1,
            created_at: new Date().getTime(),
            id: dataId.current++,
          };
        });

        setData(initData);
      });
  };

  useEffect(() => {
    postData();
  }, []);

  const onCreate = (writer, content, emotion) => {
    const created_at = new Date().getTime();
    const createData = {
      id: dataId.current,
      writer,
      content,
      emotion,
      created_at,
    };
    dataId.current += 1;
    setData([createData, ...data]);
  };

  const onRemove = (targetId) => {
    // 배열 내 리스트 아이디 값이 타겟 아이디 값과 같지 않은 요소들만 다시 새배열에 반환해주는 것임
    const afterDeleteLi = data.filter((el) => el.id !== targetId);
    setData(afterDeleteLi);
    alert(`${targetId}째 일기가 삭제되었습니다.`);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((el) =>
        el.id === targetId ? { ...el, content: newContent } : el
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList data={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
