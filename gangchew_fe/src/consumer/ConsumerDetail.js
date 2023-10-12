import React, { useState, useEffect } from "react";
import axios from 'axios';

import { FaHeart  } from 'react-icons/fa';
import { BiSolidMessageSquareEdit  } from 'react-icons/bi';
import { RiChatDeleteLine  } from 'react-icons/ri';
import { LiaCommentDots  } from 'react-icons/lia';
import '../consumer/css/ConsumerDetail.css';
import '../component/css/SimpleLine.css';
import OkButton from '../component/buttons/OkButton';
import CancelButton from '../component/buttons/CancelButton';


export default function ConsumerDetail(){

    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    }
   
    const [consumer, setConsumer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConsumer = async () => {
          try {
            // 요청이 시작 할 때에는 error 와 consumers 를 초기화하고
            setError(null);
            setConsumer(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
              'consumer/ConsumerDetail.json'
              //'https://www.gangchew.com//studentrequest/read?id={post_id}'
            );
            setConsumer(response.data); // 데이터는 response.data 안에 들어있습니다.
          } catch (e) { 
            setError(e);
          }
          setLoading(false);
        };
    
        fetchConsumer();
      }, []);


    return (
    <div>
        {consumer ? (
        <div>
            <div className="c_HeaderBlank" /**헤더 */></div>
                <div className="c_Container">
                <div className="c_Left" /**왼쪽빈공간 */></div>
                <div className="c_Center">
                    <div>
                        <h2>수요자 게시판</h2>     
                        <div className="SimpleLine"></div>         
                    </div>
                    <div>
                        <div className="c_Writer">{consumer.writer}</div>
                        <div className="c_Date"></div>
                        <div className="c_Cate"></div>
                        <div className="c_BtnContainer">    
                            <div className="c_EditButton"><OkButton/></div>
                            <div className="c_DeleteButton"><CancelButton/></div>
                        </div>
                    </div>
                    <div>
                        <div className='c_TitleBox'></div>
                        <div className='c_CategoryBox'></div>
                        <div className='c_ContentBox'></div>
                        <div className="c_BtnBox_1">
                            <div className="c_LikeBtn" onClick={handleLikeClick}>{liked ? <FaHeart size={23} color="red" /> : <FaHeart size={23} />}</div>
                            <div className="c_CommentBtn"><LiaCommentDots size={30}/></div>
                        </div>
                        <div className="c_CommentBox"/*댓글창 */></div>                        
                        <div className="c_CommentSaveBtn"><OkButton/></div>
                        <div className="c_CommentDetail"/*댓글입력시 */>
                            <div className="c_CommentBox1">  
                                <div className="c_CommentWriter"/*작성자*/>댓글작성자</div>    
                                <div className="c_CommentDate"/*작성일자*/>작성일자</div>
                            </div>
                            <div className="c_CommentContent"/*댓글내용*/>댓글내용</div>
                            <div className="c_CommentBtnBox">
                                <div className="c_CommentBtn1"/*수정버튼*/><BiSolidMessageSquareEdit size={20}/></div>
                                <div className="c_CommentBtn2"/*삭제버튼*/><RiChatDeleteLine size={20}/></div>
                                <div className="c_CommentBtn3"/*좋아요버튼*/ onClick={handleLikeClick}>{liked ? <FaHeart  color="red" /> : <FaHeart  />}11</div>
                            </div>
                                
                        </div>
                        <div className="c_BottomBlank"/*아래빈공간 */></div>                      
                    </div>
                </div>
                <div className="c_Right" /**오른쪽빈공간 */></div>
            </div>
        </div>
        ):(
            <div></div>
        )}
    </div>
    )
}
    