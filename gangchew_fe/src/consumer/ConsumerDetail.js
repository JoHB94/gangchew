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
    const cloudIP = 'http://138.2.114.150:9000';
    const localIP = 'http://localhost:9000';
    const currentUserID = 'user123';

    // consumer 조회 및 셋팅
    useEffect(() => {
        console.log(postId);
        axios.get(localIP + `/studentrequest/read?id=${postId}`)
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
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {

        setConsumer((prevConsumer) => ({
            ...prevConsumer,
            user_id: currentUserID,
          }));

        axios.post(localIP +'http://localhost:9000/postlike/',consumer)
        .then((res)=>{
            console.log(res);
            setLiked(!liked);
        })
        .catch((error)=>{
            console.log(error);
        })


    };

    return (
        <div>
            {consumer ? (
                <div>
                    <div className="c_HeaderBlank" />
                    {/* 헤더 */}
                    <div className="c_Container">
                        <div className="c_Left" />
                        {/* 왼쪽빈공간 */}
                        <div className="c_Center">
                            <div>
                                <h2>수요자 게시판</h2>
                                <div className="SimpleLine"></div>
                            </div>
                            <div>
                                <div className="c_Writer_DateBox">
                                    <span className="c_Writer">{consumer.writer}</span>
                                    <span className="c_Date">{consumer.regDt}</span>
                                </div>
                                <div className="c_BtnContainer">
                                    <div className="c_EditButton">
                                        <EditButton />
                                    </div>
                                    <div className="c_DeleteButton">
                                        <DeleteButton />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='c_TitleBox'>{consumer.title}</div>
                                <div className='c_CategoryBox'>{consumer.categoryName}</div>
                                {/* 토스트 뷰어 영역 */}
                                <div className='c_ContentBox'><Viewer initialValue={consumer.content} key={consumer.content} /></div>                               
                                <div className="c_BtnBox_1">
                                    <div className="c_LikeBtn" onClick={handleLikeClick}>
                                        {liked ? <FaHeart size={23} color="red" /> : <FaHeart size={23} />}
                                    </div>
                                    <div className="c_CommentBtn"><LiaCommentDots size={30} /></div>
                                </div>
                                <div className="c_CommentBox">
                                    <ConsumerComment />
                                </div>
                            </div>
                        </div>
                        <div className="c_Right" />
                        {/* 오른쪽빈공간 */}
                        <div className="c_BottomEmptBox"></div>
                    </div>
                    
                </div>
            ) : (
                    <div></div>
                )}
        </div>
    );
}
