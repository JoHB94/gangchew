import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { LiaCommentDots } from 'react-icons/lia';
import '../consumer/css/ConsumerDetail.css';
import '../component/css/SimpleLine.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import EditButton from '../component/buttons/EditButton';
import DeleteButton from '../component/buttons/DeleteButton';
import { useParams } from "react-router-dom";
import ConsumerComment from './ConsumerComment';
import { Viewer } from '@toast-ui/react-editor';
import { getCookie } from "../member/Cookie";
import { useNavigate } from 'react-router-dom'

export default function ConsumerDetail() {

    // **************************state***************************************
    const [consumer, setConsumer] = useState({
        postId: 0,
        title: '',
        fundingCategory:{},
        writer: '',
        content: '',
        regDt: '',
        user_id:''
    });
    const [loginId, setLoginId] = useState('');

    const { postId } = useParams();
    const navigate = useNavigate();
    const [isLiked,setIsLiked] = useState(false);
    const cloudIP = 'http://138.2.114.150:9000';
    const localIP = 'http://localhost:9000';
    
    let token = '';

    if (getCookie("jwtToken") !== undefined){
        token = getCookie("jwtToken");
        console.log(token);
    }

    const axiosInstance = axios.create({
        headers:{
          'Content-Type': 'application/json',
        }
      });
    
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // consumer 조회 및 셋팅
    useEffect(() => {
        console.log(postId);
        axiosInstance.get(localIP + `/studentrequest/read?id=${postId}`)
            .then((res) => {
                console.log(res);
                setConsumer(res.data.result);
                setIsLiked(res.data.result.like);
            })
            .catch((error) => {
                console.log(error);
            });

        axiosInstance.post(localIP + '/user/myinfo')
            .then((res)=>{
                console.log('유저정보 반환')
                console.log(res);
                if(res.data.message === "요청에 성공하였습니다."){
                    setLoginId(res.data.result.username);
                }
                
            }).catch((error)=>{
                console.log(error);
            })
               
    }, []);

    // ************************삭제 버튼***************************************
    const handleDeleteConsumer = () => {
        // 삭제 여부 확인 대화 상자
        const isConfirmed = window.confirm("이 게시물을 삭제하시겠습니까?");
        if (isConfirmed) {
            // 서버에 DELETE 요청
            axiosInstance
                .get(localIP + `/studentrequest/update/state?id=${postId}&state=DELETE`)
                .then((res) => {
                    console.log(res);
                    
                    if (res.data.message === "게시글이 존재하지 않습니다.") {
                        alert('게시글이 존재하지 않습니다.');
                        
                        return;
                    }
    
    
                    if (res.data.message === "로그인 상태가 아닙니다.") {
                        alert('로그인을 해주세요');
                        navigate('/login');
                        return;
                    }
                    alert('삭제가 완료되었습니다.');
                    navigate('/consumerlist');
                })
                .catch((error) => {
                    console.log(error);
                    alert('오류가 발생했습니다.');
                });
        }
    };
        


    // **************************좋아요 버튼***************************************

    const handleLikeClick = () => {
        if (!token) {
            alert('로그인을 해주세요');
            navigate('/login');
            return;
        }
        setIsLiked(!isLiked);
        axiosInstance.get(localIP + `/studentrequest/toggle-like?id=${postId}`)
            .then((res) => {
                console.log(res);
                if (res.data.message === "좋아요가 등록되었습니다.") {
                    alert('좋아요가 등록되었습니다.');
                }
    
                if (res.data.message === "좋아요 취소가 완료하였습니다.") {
                    alert('좋아요가 등록되었습니다.');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div>
            {consumer ? (
                <div>
                    <div className="c_DetailHeaderBlank" />
                    {/* 헤더 */}
                    <div className="c_DetailContainer">
                        <div className="c_DetailLeft" />
                        {/* 왼쪽빈공간 */}
                        <div className="c_DetailCenter">
                            <div>
                                <h2>수요자 게시판</h2>
                                <div className="SimpleLine"></div>
                            </div>
                            <div>
                                <div className="c_DetailWriter_DateBox">
                                    <span className="c_DetailWriter">작성자: {consumer.writer}</span>
                                    <span className="c_DetailDate">{consumer.regDt}</span>
                                </div>
                                <div className="c_DetailBtnContainer">
                                   {(loginId === consumer.writer) &&
                                   <div className="c_DetailEditButton">
                                        <EditButton />
                                    </div>
                                   
                                   } 
                                    {
                                        // 만약 로그인된 사용자가 게시물 작성자와 동일한 경우
                                    (loginId === consumer.writer) &&
                                    <div className="c_DetailDeleteButton" onClick={handleDeleteConsumer}>
                                        <DeleteButton />
                                    </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className='c_DetailTitleBox'>{consumer.title}</div>
                                <div className='c_DetailCategoryBox'>{consumer.fundingCategory.categoryName}</div>
                                {/* 토스트 뷰어 영역 */}
                                <div className='c_DetailContentBox'>
                                    {console.log(consumer.content)}
                                {<Viewer initialValue={consumer.content} key={consumer.content} />}
                                </div>                               
                                <div className="c_DetailBtnBox_1">
                                    <div className="c_DetailLikeBtn" onClick={handleLikeClick}>
                                       { isLiked ? (<FaHeart size={23} color="red" />) : (<FaHeart size={23} />)}
                                    </div>
                                    <div className="c_DetailCommentBtn"><LiaCommentDots size={30} /></div>
                                </div>
                                <div className="c_DetailCommentBox">
                                    <ConsumerComment postId={postId}/>
                                </div>
                            </div>
                        </div>
                        <div className="c_DetailRight" />
                        {/* 오른쪽빈공간 */}
                        <div className="c_DetailBottomEmptBox"></div>
                    </div>
                    
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    );
}
