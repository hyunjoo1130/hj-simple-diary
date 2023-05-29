import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList dummyList={dummyList} />
    </div>
  );
}

const dummyList = [
  {
    id: 1,
    writer: "앙두",
    content: "오늘 또롱이 털을 밀었다. 귀엽다 후히",
    emotion: 3,
    created_at: new Date().getTime(),
  },
  {
    id: 2,
    writer: "앙두",
    content: "결혼을 꼭 해야된다는 나의 생각을 버리고, 하나님 생각 따라가자",
    emotion: 5,
    created_at: new Date().getTime(),
  },
  {
    id: 3,
    writer: "앙두",
    content: "너무 사랑스러운 아이들, 또 보고싶다. 러뷰",
    emotion: 5,
    created_at: new Date().getTime(),
  },
  {
    id: 4,
    writer: "앙두",
    content: "지락실 너무웃겨 푸하하 우하하 낄낄낄",
    emotion: 5,
    created_at: new Date().getTime(),
  },
];

export default App;
