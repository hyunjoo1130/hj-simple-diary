import React, { useEffect, useRef, useState } from 'react';
import './DiaryItem.scss';

function DiaryItem({
  id,
  writer,
  content,
  emotion,
  created_at,
  onRemove,
  onEdit,
}) {
  useEffect(() => {
    console.log('diaryItem 렌더링');
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const editContentInput = useRef();

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) onRemove(id);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setEditContent(content);
  };

  const handleEdit = () => {
    if (editContent.length < 5) {
      editContentInput.current.focus();
      return;
    }

    onEdit(id, editContent);
    toggleIsEdit();
  };

  return (
    <div className='DiaryItem'>
      <p className='author'>
        <span>
          <span style={{ fontWeight: '700' }}>작성자 :</span> {writer}
        </span>
        <span>
          <span style={{ fontWeight: '700' }}>감정점수 :</span> {emotion}점
        </span>
      </p>
      <hr />
      <div className='contentContainer'>
        <div className='contentInner'>
          {isEdit ? (
            <>
              <textarea
                ref={editContentInput}
                className='editContent'
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </>
          ) : (
            <>
              <p className='content'>{content}</p>
            </>
          )}
        </div>
      </div>
      <hr />
      <div className='contentFooter'>
        <div className='btnBox'>
          {isEdit ? (
            <div className='editBtns'>
              <button onClick={handleCancelEdit}>취소</button>
              <button onClick={handleEdit}>완료</button>
            </div>
          ) : (
            <div className='contentBtns'>
              <button onClick={handleRemove}>삭제</button>
              <button onClick={toggleIsEdit}>수정</button>
            </div>
          )}
        </div>
        <p className='date'>{new Date(created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default React.memo(DiaryItem);
