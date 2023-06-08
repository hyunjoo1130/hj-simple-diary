import { useMemo } from "react";

const DataAnalasys = ({ data }) => {
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
    <div
      className="DataAnalasys"
      style={{
        width: "35%",
        padding: 20,
        margin: "40px auto",
        textAlign: "center",
        border: "2px solid #ebebeb",
        borderRadius: 20,
      }}
    >
      <p>😊 좋은 감정 일기 : {goodEmotionDiary}개</p>
      <p style={{ paddingTop: 5, paddingBottom: 5 }}>
        😟 나쁜 감정 일기 : {badEmotionDiary}개
      </p>
      <strong>전체 중 좋은 감정 일기 비율 : {goodEmotionRatio}%</strong>
    </div>
  );
};

export default DataAnalasys;
