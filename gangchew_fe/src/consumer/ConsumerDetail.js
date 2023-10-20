import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { LiaCommentDots } from 'react-icons/lia';
import '../consumer/css/ConsumerDetail.css';
import '../component/css/SimpleLine.css';
import EditButton from '../component/buttons/EditButton';
import DeleteButton from '../component/buttons/DeleteButton';
import { useParams } from "react-router-dom";
import ConsumerComment from './ConsumerComment';
import { Viewer } from '@toast-ui/react-editor';
import { getCookie } from "../member/Cookie";

export default function ConsumerDetail() {
    const { postId } = useParams();

    // **************************state***************************************
    const [consumer, setConsumer] = useState({
        postId: 0,
        title: '',
        categoryId: 0,
        writer: '',
        content: '',
        regDt: '',
        user_id:''
    });

    const [isLiked,setIsLiked] = useState(false);
    const cloudIP = 'http://138.2.114.150:9000';
    const localIP = 'http://localhost:9000';
    
    const token = '';

    if (getCookie("jwtToken") === !undefined){
        token = getCookie("jwtToken");
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
                // setConsumer(res.data.)
            })
            .catch((error) => {
                console.log(error);
            });
        // axios.get('/consumer/ConsumerDetail.json')
        // .then((res)=>{
        //     console.log(res.data);
        //     setConsumer(res.data);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // })
    }, [postId]);

    // ************************onClick***************************************

    // **************************좋아요 버튼***************************************

    const handleLikeClick = () => {

        axios.post(localIP +'funding/toggle-like?id={funding_id}')
        .then((res)=>{
            console.log(res);
            setIsLiked(!isLiked);
        })
        .catch((error)=>{
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
                                    <span className="c_DetailWriter">{consumer.writer}</span>
                                    <span className="c_DetailDate">{consumer.regDt}</span>
                                </div>
                                <div className="c_DetailBtnContainer">
                                    <div className="c_DetailEditButton">
                                        <EditButton />
                                    </div>
                                    <div className="c_DetailDeleteButton">
                                        <DeleteButton />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='c_DetailTitleBox'>{consumer.title}</div>
                                <div className='c_DetailCategoryBox'>{consumer.categoryName}</div>
                                {/* 토스트 뷰어 영역 */}
                                <div className='c_DetailContentBox'><Viewer initialValue={consumer.content} key={consumer.content} /></div>                               
                                <div className="c_DetailBtnBox_1">
                                    <div className="c_DetailLikeBtn" onClick={handleLikeClick}>
                                        {isLiked ? <FaHeart size={23} color="red" /> : <FaHeart size={23} />}
                                    </div>
                                    <div className="c_DetailCommentBtn"><LiaCommentDots size={30} /></div>
                                </div>
                                <div className="c_DetailCommentBox">
                                    <ConsumerComment />
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
