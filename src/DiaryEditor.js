import React, { useEffect, useRef, useState } from 'react';
import './DiaryEditor.scss';

function DiaryEditor({ onCreate }) {
  const [state, setState] = useState({
    author: '앙두',
    content: '',
    emotion: 1,
  });

  const { author, content, emotion } = state;

  // useRef: React.MutableRefObject 의 역할은 dom요소에 접근할 수 있는 기능
  const authorInput = useRef();
  const contentArea = useRef();

  const handleChangeState = (e) => {
    setState({
      // ⭐️ state 객체의 갯수가 많고, 이미 저장돼있는 값을 그대로 쓰고 싶을 때, 아래와 같이 spread operator 를 쓸 수 있는데, 무조건 변화할 값보다 먼저 써줘야 한다. 이유는. state 객체를 펼치면서, 기존의 author 에, 변화할 author 의 값을 덮어씌우기 때문이다. 뒤에 쓰면 변화한 값에 다시 기존의 author 의 값이 덮어써지기 때문에 변화가 없어보인다.
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (content.length < 5) {
      contentArea.current.focus();
      return;
    }

    onCreate(author, content, emotion);
    alert('오늘의 일기가 저장되었습니다!');
    // 에디터에 남아 있는 기존 글 초기화(reset)
    setState({
      author: '앙두',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className='DiaryEditor'>
      <h1>My Today's Diary</h1>
      <div className='authorBox'>
        <input
          ref={authorInput}
          className='authorInput'
          name='author'
          placeholder='작성자'
          value={author}
          onChange={handleChangeState}
        />
      </div>
      <div className='contentBox'>
        <textarea
          ref={contentArea}
          className='contentArea'
          name='content'
          placeholder='글을 5자 이상 작성해주세요'
          value={content}
          onChange={handleChangeState}
        />
      </div>
      <div className='emotionBox'>
        <span className='txt'>나의 오늘의 감정을 숫자로 표현해보세요 :)</span>
        <select name='emotion' value={emotion} onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div className='submitBtn'>
        <button className='btn' onClick={handleSubmit}>
          <span>일기 저장</span>
        </button>
      </div>
    </div>
  );
}

// 위에서 묶기에 위아래 왔다갔다 귀찮다면, 이 밑에서 이렇게 React.memo 를 해줄 수도 있음!
export default React.memo(DiaryEditor);
