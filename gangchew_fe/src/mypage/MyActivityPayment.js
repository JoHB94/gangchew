import React, { useState }  from "react"
import '../consumer/css/MyActivityPayment.css';
import Button from '@mui/material/Button';
import '../component/css/SimpleLine.css';
import { PiWarningOctagonDuotone } from 'react-icons/pi';
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Container from "@mui/material/Container";



function PayButton() {

  const buttonStyle = {
    width: '100%', // 너비를 자동으로 설정
    height: '50px',
    backgroundColor: '#701edb', color:'#FFFFFF'
    
  };
    return (     
        
        <Button  style={buttonStyle} variant="contained">결제하기</Button>
              
    );
  
}

function PaymentOptions() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <Container>
      <RadioGroup
        row
        name="paymentMethods"
        value={selectedPaymentMethod}
        onChange={handlePaymentMethodChange}
      >
        <FormControlLabel
          value="creditCard"
          control={<Radio />}
          label="신용카드"
        />
        <FormControlLabel
          value="bankTransfer"
          control={<Radio />}
          label="실시간 계좌 이체"
        />
        <FormControlLabel
          value="bankDeposit"
          control={<Radio />}
          label="무통장 입금"
        />
        <FormControlLabel
          value="mobilePayment"
          control={<Radio />}
          label="휴대폰 결제"
        />
      </RadioGroup>
      <div className="m_PayRadio">
        <RadioGroup
          name="otherPaymentMethods"
          value={selectedPaymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel
            value="kakaoPay"
            control={<Radio />}
            
          />
          <FormControlLabel
            value="tossPay"
            control={<Radio />}
            
          />
        </RadioGroup>
      </div>
    </Container>
  );
}

export default function MyActivityPayment(){
    return (
        <div>
            <div className="m_HeaderBlank" /**헤더 */></div>
            <div className="m_Container">
                <div className="m_Left" /**왼쪽빈공간 */></div>
                <div className="m_Center">
                  <h2>결제 하기</h2>
                    <div className="SimpleLine"></div>
                    
                    <div className="m_OrderBox">
                        <div className="m_OrderBox_1">                        
                            <div className="m_OrderB1">주문내역</div>                           
                            <div className="m_OrderB2" /*펀딩내용 , 결제금액 */>테스트입니다</div>
                            <div className="m_OrderB3" /*결제금액*/>100만원</div>
                       
                             
                            <div className="m_OrderB4" /* 라인,vat포함 총금액*/>4</div>
                            <div className="m_OrderB5" /*결제하기버튼 */>5</div>
                            
                        </div>
                        <div className="m_OrderBox_2">
                            <div className="m_OrderBox_21">주문내역6aa</div>
                            <div className="m_Line"></div>
                            <div className="m_OrderBox_22">
                                <div className="m_OrderBox_22a">vat포함</div>
                                <div className="m_OrderBox_22b">총결제금액100만원</div>                                
                            </div>
                            <div className="m_OrderBox_Check">위 내용을 확인하였고, 결제에 동의합니다.</div>
                              
                            <div className="m_OrderBox_Btn"><PayButton /></div>
                          </div>
                    </div>
                
                        <div className="m_OrderM">
                          <div className="m_OrderM_1">
                            <h4>결제방법7</h4>
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
                                  <li>단순변심으로 인한 환불은 불가합니다.</li>
                                  <li>회사는 판매자와 상호 협의 하에 프로젝트를 취소할 수 있으며, 펀딩 종료 후 프로젝트가 취소될 경우에는 환불됩니다.</li>
                                  <li>예약 결제 이후, 결제 정보를 변경하려면 마이페이지 참여 내역 상세에서 결제 정보를 변경해주세요.</li>
                                  <li>환불은 확인 후 처리까지는 최소 1일에서 최대 14일이 소요됩니다.</li>                                                    
                                  <li>환불 신청 후 정책에 따라 확인 절차를 거쳐 진행되며, 참여한 결제 건을 취소하는 방식으로 진행됩니다.
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