import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";
import OptimizeTest2 from "./OptimizeTest2";

function App() {
  const [data, setData] = useState([]);

  // ⭐️ 변수를 사용하면, 리렌더 될 때마다 값이 초기화되어 다시 0이 되기 때문에
  // 아래함수에서 1을 더해줘도 점진적 변화가 일어나지 않게 된다.
  // 컴포넌트 내에서 변수를 사용할 때에는, useRef()를 사용하는게 좋다.
  // useRef()훅은 컴포넌트에서 가변 값에 대한 참조를 하기 원할 때 사용한다.
  // useRef()를 사용하여 생성된 참조 객체는, 컴포넌트의 렌더링 사이클 동안에도 유지되고,
  // state로 렌더링이 발생할 때 마다 초기화 되지 않는다. useRef()훅의 주요 동작 원리이다.
  // 그리하여, useRef()는 변수의 값을 저장하고 있다가 useState를 통해 페이지가 ReRendering될 때 변경된 값을 확인 할 수 있는 것이다.
  let dataId = useRef(1);

  const postData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/comments")
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

  // ⭐️ 이 함수는, return 값이 변동되지 않으므로, 재연산할 필요가 없다.
  // useMemo 함수는 첫번째 인자로 콜백함수를 받는다.
  // dependency array를 받는다. (array 내 값이 변할 때마다 해당 함수가 재실행)
  // ❗️ 가장 많이 하는 실수 : useMemo 는 콜백함수를 실행함으로, return 값을 반환받게 되고, 그 값이 식별자에 할당된다. 그렇기 때문에, 더 이상 getDataAnalaysis는 함수가 아닌 값을 할당받은 변수가 된다.
  // => getDataAnalaysis() x , getDataAnalaysis o
  const getDataAnalaysis = useMemo(() => {
    const goodEmotionDiary = data.filter((el) => el.emotion >= 3).length;
    const badEmotionDiary = data.length - goodEmotionDiary;
    const goodEmotionRatio = parseInt((goodEmotionDiary / data.length) * 100);
    // 백분율 계산법 : (비교하는 양 나누기 기준량) 곱하기 100

    return { goodEmotionDiary, badEmotionDiary, goodEmotionRatio };
  }, [data.length]);

  // return 값을 받으면서 객체 구조분해할당을 시킴
  const { goodEmotionDiary, badEmotionDiary, goodEmotionRatio } =
    getDataAnalaysis;

  return (
    <div className="App">
      {/* <OptimizeTest2 /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>
        <p>좋은 감정 일기 : {goodEmotionDiary}개</p>
        <p>나쁜 감정 일기 : {badEmotionDiary}개</p>
        <p>전체 중 좋은 감정 일기 비율 : {goodEmotionRatio}%</p>
      </div>
      <DiaryList data={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
