import { useCallback, useEffect, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';
import OptimizeTest2 from './OptimizeTest2';
import DataAnalasys from './DataAnalasys';

// ⭐️ useReducer
// 한 컴포넌트 내에서 여러 함수를 관리하고 있으면, 무거워지고 길어진다.
// 이를 위해 함수를 분리하여 더 한 곳에서 편하게 관리하는 역할을 해주는 useReducer hooks

// type 을 넘겨주면, 그 type 에 맞는 switch case 가 작동되는 방식
// dispatch를 활용하여, 알맞은 데이터(action)를 reducer에게 넘겨주면 그것을 참고하여, reducer가 실행된다.
// 각 case 에 맞는 로직을 실행하며 state를 그 값으로 바꾸어 반환해준다.
// reducer 가 반환하는 값이 useReducer 의 data 가 된다.
const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_at = new Date().getTime();
      const newItem = {
        ...action.data,
        created_at,
      };
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((el) => el.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((el) =>
        el.id === action.targetId ? { ...el, content: action.newContent } : el
      );
    }
    default:
      return state;
  }
};

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  // ⭐️ 변수를 사용하면, 리렌더 될 때마다 값이 초기화되어 다시 0이 되기 때문에
  // 아래함수에서 1을 더해줘도 점진적 변화가 일어나지 않게 된다.
  // 컴포넌트 내에서 변수를 사용할 때에는, useRef()를 사용하는게 좋다.
  // useRef()훅은 컴포넌트에서 가변 값에 대한 참조를 하기 원할 때 사용한다.
  // useRef()를 사용하여 생성된 참조 객체는, 컴포넌트의 렌더링 사이클 동안에도 유지되고,
  // state로 렌더링이 발생할 때 마다 초기화 되지 않는다. useRef()훅의 주요 동작 원리이다.
  // 그리하여, useRef()는 변수의 값을 저장하고 있다가 useState를 통해 페이지가 ReRendering될 때 변경된 값을 확인 할 수 있는 것이다.
  let dataId = useRef(1);

  const postData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/comments')
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

        dispatch({ type: 'INIT', data: initData });
        // setData(initData);
      });
  };

  useEffect(() => {
    postData();
  }, []);

  const onCreate = useCallback((writer, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { id: dataId.current, writer, content, emotion },
    });
    dataId.current += 1;
    // const created_at = new Date().getTime();
    // const createData = {
    //   id: dataId.current,
    //   writer,
    //   content,
    //   emotion,
    //   created_at,
    // };
    // 함수형 업데이트 : setState 안에 함수를 전달하는 것
    // 이를 사용해 최신 data를 받을 수 있도록 인자를 전달해준다.
    // setData((data) => [createData, ...data]);
  }, []);
  // useCallback 훅의 두번째 인자인, deps 에 빈 배열을 넣으면, 컴포넌트가 마운트 되는 시점에 한번만 실행됨
  // ❗️ 첫 마운트시에만 실행되기 때문에 state 의 초기값이 들어있는 상태 ('[]')
  // 그래서 이 함수를 사용하면, 초기값에 data가 추가돼있지 않은 상태로 렌더링이 되는 문제를 만나게 된다.
  // 이를 위해 이 함수가 비로소 실행될 때, 최신 데이터를 넘겨받고 작동할 수 있도록 '함수형 업데이트'를 사용해야 한다.
  // deps 에 data를 넣어주면 해결이 되지만, 그러면 data는 매번 변경되기 때문에 이 함수도 불필요하게 계속 렌더링이되므로
  // useCallback 효과를 사용할 수 없게 된다. 이럴 때 함수형 업데이트를 사용하며 deps 도 비워줄 수 있다 😊

  const onRemove = useCallback((targetId) => {
    // useCallback 사용으로 함수형 업데이트를 해주어야 한다.
    // 배열 내 리스트 아이디 값이 타겟 아이디 값과 같지 않은 요소들만 다시 새배열에 반환해주는 것임

    dispatch({ type: 'REMOVE', targetId });
    // setData((data) => data.filter((el) => el.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });

    // setData((data) =>
    //   data.map((el) =>
    //     el.id === targetId ? { ...el, content: newContent } : el
    //   )
    // );
  }, []);

  return (
    <div className='App'>
      {/* <OptimizeTest2 /> */}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList data={data} onRemove={onRemove} onEdit={onEdit} />
      <DataAnalasys data={data} />
    </div>
  );
}

export default App;
