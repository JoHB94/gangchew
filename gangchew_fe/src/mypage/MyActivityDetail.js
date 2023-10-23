import React from "react";

import '../consumer/css/MyActivityDetail.css';
import '../component/css/SimpleLine.css';
import { FaLongArrowAltDown } from "react-icons/fa";
import LongCard from "../component/LongCard";
import ListBox from "../component/ListBox"
import { getCookie } from "../member/Cookie";


export default function MyActivityDetail(){

    const myFundingListURL = '';
    const myConsumerListURL = '';
    const myRefundURL = '';


    return (
    <div>
        <div className="m_HeaderBlank" /**헤더 */></div>
        <div className="m_Container">
            <div className="m_Left" /**왼쪽빈공간 */></div>

            <div className="m_Center">
               <h2>나의 활동 내역</h2>
               <div className="SimpleLine"></div>
               <h3>펀딩 참여 내역</h3>
               <div className="m_FundingBox">
                    <div>
                        <div className="m_LongCard" /**<LongCard/> */>
                           
                        </div >
                        <div className="m_LongCard" /**<LongCard/> */>
                            
                        </div>
                        <div className="m_LongCard" /**<LongCard/> */>
                            
                        </div>
                    </div>
                    <div className="m_Pagination1"></div>
               </div>
               <h3>수요자 게시판</h3>
               <div className="m_BoardList"/*ListBox*/ ></div>
                <h3>취소 / 환불 내역</h3>                
                <div className="m_DetailBox">
                    <div className="cancleBox1" /*취소완료문구 , 취소일자, 이미지, 펀딩명, 결제상태, 결제날짜, 결제수단, 결제금액*/></div>
                    <div className="cancleBox2"></div>
                    <div className="cancleBox3"></div>
                    <div className="canclePagination"></div>
                </div>
                <div className="m_BottomBlank" /*바텀빈공간 */></div>
            </div>
            <div className="m_Right" /**오른쪽빈공간 */></div>
        </div>
    </div>
        
    )
}