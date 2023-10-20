import React, { useState, useEffect } from "react";
import '../consumer/css/MyActivityPayment.css';
import PayButton from "../component/buttons/PayButton";
import '../component/css/SimpleLine.css';
import { PiWarningOctagonDuotone } from 'react-icons/pi';
import PaymentOptions from "../component/PaymentOptions";
import axios from "axios";   
import Card from "../component/Card";

export default function MyActivityPayment(){

//**************************state*************************************** */  
  const [payment, setPayment] = useState({
    fundingId: 0,
    fundingPay : 0,
    fundingContnet: '',        
    bank_account: '',
    contentparticipant_id:'',
    
});
const cloudIP = 'http://138.2.114.150:9000';
const localIP = 'http://localhost:9000';

// consumer 조회 및 셋팅
useEffect(()=>{
    // console.log(payment)
    // axios.get(localIP + '/payment/create',payment)
    // .then((res)=>{
    //     console.log(res);
    //     // setConsumer(res.data.)
    // })
    // .catch((error)=>{
    //     console.log(error);
    // })
    //**************************테스트중*************************************** */ 
    axios.get('/consumer/MyActivityPayment.json')
    .then((res)=>{
        console.log(res.data);
        setPayment(res.data);
    })
    .catch((error)=>{
        console.log(error);
    })

},[]);
  const handlePayment = () => {
    // 결제 버튼 클릭 이벤트를 처리하고 데이터를 서버로 보내는 코드
    axios.post(localIP + '/payment/makePayment', payment)
        .then((res) => {
            console.log(res.data); // 응답 데이터 처리
        })
        .catch((error) => {
            console.log(error);
        });
  };


    return (
        <div>
            <div className="m_HeaderBlank" /**헤더 */></div>
            <div className="m_Container">
                <div className="m_Left" /**왼쪽빈공간 */></div>
                <div className="m_Center">
                  <h2>결제 하기</h2>
                    <div className="SimpleLine"></div>
                    {console.log(payment.fundingId)}
                    <div className="m_OrderBox">
                        <div className="m_OrderBox_1">                        
                            <span className="m_OrderB1">주문내역</span>                           
                            <div className="m_OrderB2" /*펀딩타이틀 */>{payment.fundingId}</div>
                            <div className="m_OrderB3" /*펀딩카드 , 결제금액 */><Card/></div>
                            <div className="SimpleLine"></div>  
                            <div className="m_OrderB4" /*결제금액*/>{payment.fundingPay}원</div>                                
                        </div>
                        <div className="m_OrderBox_2">
                            <div className="m_OrderBox_21">{payment.fundingId}</div>
                            <div className="m_Line"></div>
                            <div className="m_OrderBox_22">
                                <div className="m_OrderBox_22a">vat포함</div>
                                <div className="m_OrderBox_22b">{payment.fundingPay}원</div>                                
                            </div>
                            <div className="m_OrderBox_Check">위 내용을 확인하였고, 결제에 동의합니다.</div>
                              
                            <div className="m_OrderBox_Btn"><PayButton onClick={handlePayment} /></div>
                          </div>
                    </div>
                
                        <div className="m_OrderM">
                          <div className="m_OrderM_1">
                            <div className="m_PaymentItem">결제방법</div>
                            <div className="m_OrderS" /*결제수단 셀렉트*/><PaymentOptions/></div>
                            <div className="m_OrderPay" /*페이체크*/>
                              <label>
                                <div className="m_KakaoPay"><img className="kakaoPay" src={process.env.PUBLIC_URL + '/logokakao.png' } alt="kakao"/></div>
                                <div className="m_TossPay"><img className="TossPay" src={process.env.PUBLIC_URL + '/logotoss.png'} alt="toss"/></div>

                              </label>
                              </div>                    
                          </div>
                          <div className="m_OrderM_2" /*결제유의사항*/>
                            <div className="m_WarningBox">
                              <div className="m_WarningBox_1">
                                <div className="m_WarningBox_2"><PiWarningOctagonDuotone color="red" size={20} />결제 유의사항</div>                        
                                <ul>                                  
                                  <li className="list_item">단순변심으로 인한 환불은 불가합니다.</li>
                                  <li className="list_item">회사는 판매자와 상호 협의 하에 프로젝트를 취소할 수 있으며, 펀딩 종료 후 프로젝트가 취소될 경우에는 환불됩니다.</li>
                                  <li className="list_item">예약 결제 이후, 결제 정보를 변경하려면 마이페이지 참여 내역 상세에서 결제 정보를 변경해주세요.</li>
                                  <li className="list_item">환불은 확인 후 처리까지는 최소 1일에서 최대 14일이 소요됩니다.</li>                                                    
                                  <li className="list_item">환불 신청 후 정책에 따라 확인 절차를 거쳐 진행되며, 참여한 결제 건을 취소하는 방식으로 진행됩니다.
                                      자세한 내용은 메이커 문의하기 또는 gangchew 고객센터 이용을 부탁드립니다.</li>                                  
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      <div className="m_OrdeEmptBox"/*아래쪽 빈박스*/>                          
                      </div>
              </div>
              <div className="m_Right" /**오른쪽빈공간 */></div>             
          </div>
       </div>
    )
}