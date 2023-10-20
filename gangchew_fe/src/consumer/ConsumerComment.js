import React, { useState, useEffect } from "react";
import axios from 'axios';

const ConsumerComment = () => {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const currentUserID = 'user123';

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddComment = () => {
    if (input.trim() !== '') {
      const newComment = {
        id: comments.length,
        comment_id: 0,
        writer: '',
        writeDt: new Date().toLocaleString(),
        content: input,
      };
///////////////////////////// real source
/*     // post 요청
      axios.post('http://localhost:9000/studentcomment/save',newComment)
      .then((res)=>{
        console.log(res);
        alert('등록되었습니다.');
        setComments([...comments, newComment]);
        setInput('');
      })
      .catch((error)=>{
          console.log(error);
          alert('등록실패되었습니다.');
      })
*/
///////////////////////////// test start 
      setComments([...comments, newComment]);
      setInput('');
///////////////////////////// test end
    }
  };

  const handleDeleteComment = (id) => {
///////////////////////////// real source    
/*    // delete 요청
    const deleteComment = comments.filter((comment) => comment.id === id);
    axios.delete('http://localhost:9000/studentcomment/delete?id='+deleteComment.comment_id)
    .then((res)=>{
      console.log(res);
      alert('삭제되었습니다');
      // 화면 
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    })
    .catch((error)=>{
        console.log(error);
        alert('error');
    })  */
///////////////////////// test start   
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
//////////////////////// test end
  };

  useEffect(() => {
    const localIP = 'http://localhost:9000';
    const userId = '';

    axios.get('/consumer/ConsumerComment.json')
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="c_ConsumerCommentBox" style={{ maxWidth: '100%', margin: 'auto', marginTop: '60px' }}>
      <h3 style={{ color: '#333', fontSize: '24px', textAlign: 'center' }}>Comment</h3>
      <div className="c_ConsumerCommentCenter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="c_ConsumerCommentInput" style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment();
              }
            }}
            placeholder="댓글을 입력해 주세요"
            style={{
              width: '89%',
              height : '80px',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
           <button
            onClick={handleAddComment}
            className="c_saveButton"
            style={{
              padding: '10px 20px',
              backgroundColor: '#701edb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginLeft: '10px',
              marginBottom: '10px',
              boxShadow: '0px 2px 2px 2px #dcdcdc',
              fontSize: '12px',
              
            }}
          >
            댓글저장
          </button>
        </div>
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            style={{
              width: '100%',
              backgroundColor: '#f9f9f9',
              padding: '10px',
              borderRadius: '8px',
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '10px',
            }}
          >
            <div className="c_ConsumerCommenContent" style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>
              작성자: {comment.writer} &nbsp;&nbsp;&nbsp;&nbsp; 작성일자: {comment.writeDt}
            </div>
            <div style={{ fontSize: '16px', color: 'gray', marginBottom: '5px' }}>{comment.content}</div>
            {comment.writer === currentUserID ? (
              <button
                className="commentButton"
                onClick={() => handleDeleteComment(comment.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                삭제
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerComment;
