import React, { useState, useEffect } from "react";
import axios from 'axios';
import { getCookie } from "../member/Cookie";
import { useParams } from 'react-router';


const ConsumerComment = ({ postId }) => {
  const cloudIP = 'http://138.2.114.150:9000';
  const localIP = 'http://localhost:9000';

  const [currentUserID, setCurrentUserID] = useState('');
  let token = '';

  if (getCookie("jwtToken") !== undefined) {
    token = getCookie("jwtToken");
    console.log(token);
  }

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  const params = useParams();
  console.log("params {}",params);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleAddComment = () => {
    console.log("currentUserID {}",currentUserID);
    if (input.trim() !== '') {
      const newComment = {
        //id: comments.length,
        student_request_id: params.postId,
        comment_id: 0,
        username: currentUserID,
        formatdate: new Date().toLocaleString(),
        content: input,
        //user : {username: currentUserID,},
        studentRequest : {id:params.postId},
      };
      // 실제 서버로 POST 요청
      axiosInstance.post(localIP + '/studentcomment/save', newComment)
        .then((res) => {
          console.log(res);
          

          if(res.data.message === "게시글이 존재하지 않습니다."){
              alert('게시글이 존재하지 않습니다.');
          } 
          
          if(res.data.message === "댓글의 내용을 입력해주세요."){
              alert('댓글의 내용을 입력해주세요.');
          }
          
          if(res.data.message === "로그인 상태가 아닙니다."){
              alert('로그인을 해주세요');
              navigator('/login');
          }

          //if(res.data.code === "200"){

            setInput('');
            
            axiosInstance.get(localIP + `/studentcomment?id=${postId}`)
              .then((res) => {
                console.log(res);
                setComments(res.data.result);
              })
              .catch((error) => {
                console.log(error);
              });
          //}
          

        })
        .catch((error) => {
          console.log(error);
          alert('등록 실패되었습니다.');
        });
    }
  };

  const handleDeleteComment = (comment_id) => {
    // 실제 서버로 DELETE 요청
    const deleteComment = comments.filter((a) => a.comment_id === comment_id)[0];
    console.log(" deleteComment {}", deleteComment)
    console.log(" deleteComment.comment_id {}", deleteComment.comment_id)
    axiosInstance.delete(localIP + '/studentcomment/delete?id=' + deleteComment.comment_id)
      .then((res) => {
        console.log(res);
        if(res.data.message === "게시글이 존재하지 않습니다."){
          alert('게시글이 존재하지 않습니다.');
      } 
      
      if(res.data.message === "로그인 상태가 아닙니다."){
        alert('로그인을 해주세요');
        navigator('/login');
    }
        const updatedComments = comments.filter((comment) => comment.comment_id !== comment_id);
        setComments(updatedComments);
      })
      .catch((error) => {
        console.log(error);
        alert('error');
      });
  };

  useEffect(() => {
    // 서버로부터 댓글 데이터를 가져오는 비동기 함수
    axiosInstance.get(localIP + `/studentcomment?id=${postId}`)
      .then((res) => {
        console.log(res);
        
        // 댓글을 최신순으로 정렬하여 새로운 배열을 생성
        const sortedComments = res.data.result.sort((a, b) => new Date(b.formatdate) - new Date(a.formatdate));
        
        // 정렬된 댓글 목록을 상태로 설정하여 화면에 표시
        setComments(sortedComments);
        setCurrentUserID();  // 실제 로그인 Id로 저장하기
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
              height: '80px',
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
            댓글 저장
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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className="c_ConsumerCommenContent" style={{ fontSize: '14px', color: '#777', marginBottom: '5px' }}>
                작성자: {comment.username} &nbsp;&nbsp;&nbsp;&nbsp; 작성일자: {comment.formatdate}
              </div>
              {comment.loginUser && 
                <button
                  className="commentButton"
                  onClick={() => handleDeleteComment(comment.comment_id)}
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
              }
            </div>
            <div style={{ fontSize: '16px', color: 'gray', marginBottom: '5px' }}>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumerComment;