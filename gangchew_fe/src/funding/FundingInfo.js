import React,{useState} from "react";
import fundingInfo from "../funding/css/fundingInfo.css";
import InfoTop from "./InfoTop";
import DoFunding from "../component/buttons/DoFunding";
import EmptyHeart from "../component/buttons/EmptyHeart";
import Card from "../component/Card";
import { useEffect } from "react";
import {BiSolidRightArrow} from "react-icons/bi";
import {BsFire} from "react-icons/bs";
import {AiFillEye,AiFillHeart} from "react-icons/ai";
import {FiAlertTriangle} from "react-icons/fi";
import FundingAccordion from "./FundingAccordion";
import StartFunding from "../component/buttons/StartFunding";
import UpdateFunding from "../component/buttons/UpdateFunding";
import CancelFunding from "../component/buttons/CancelFunding";


export default function FundingInfo(){

    const[deadline,setDeadline] = useState('2023-10-25');
    const [diffDayValue, setDiffDayValue] = useState('');
    

    function diffDay() {
        const masTime = new Date(deadline);
        const todayTime = new Date();
        
        const diff = masTime - todayTime;
        
        const diffDay = String(Math.floor(diff / (1000*60*60*24)));
        const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
        const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
        const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
    
    return diffDay+"일"+diffHour+"시간"+diffMin+"분"+diffSec+"초";
        
    }

    useEffect(() => {
        const intervalId = setInterval(()=>{
            setDiffDayValue(diffDay())
        }, 1000); // 1시간 호출
        return () => {
          clearInterval(intervalId); // 컴포넌트가 언마운트되면 setInterval 해제
        };
      }, [diffDayValue]);
    

    return(
        <div>
            <div id="f_container">
                <div id="f_left">{/**왼쪽 */}</div>
                <div id="f_center">

                    <div id="f_headerarea"></div>
                    <div id="f_headerarea"></div>
                    <h1 id="f_title">[SQL을 이용한 데이터베이스의 이해와 구축] 무궁화 삼천리 마르고 닳도록 하느님이 보우하사 우리 나라만세</h1>
                    {/**센터 */}
                    <div id="f_bigBox">

                        <div id="f_contentBox">{/**내용 컨테이너 */}
                            <div id="f_info_thumbnail">
                                {/**썸네일 컨테이너 */}
                                
                                <img id="f_img" src="/replace.jpg" alt=""></img>
                                
                            </div>
                            <div style={{width : "100%"}}>
                                <FundingAccordion/>
                            </div>
                            <div id="f_editor">{/**toastViewer */}
                            <p>
                            누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 국가안전보장회의는 대통령이 주재한다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다.

헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다. 근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 모든 국민은 헌법과 법률이 정한 법관에 의하여 법률에 의한 재판을 받을 권리를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다.

신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 국회의원과 정부는 법률안을 제출할 수 있다. 국회의원은 법률이 정하는 직을 겸할 수 없다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 대통령의 임기가 만료되는 때에는 임기만료 70일 내지 40일전에 후임자를 선거한다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.

대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 대법원과 각급법원의 조직은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다. 국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.

공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한 제한과 의무를 과할 수 있다. 국회가 재적의원 과반수의 찬성으로 계엄의 해제를 요구한 때에는 대통령은 이를 해제하여야 한다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.
누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 이 헌법공포 당시의 국회의원의 임기는 제1항에 의한 국회의 최초의 집회일 전일까지로 한다. 군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다. 국가안전보장회의는 대통령이 주재한다. 국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여 대통령 소속하에 감사원을 둔다.

헌법에 의하여 체결·공포된 조약과 일반적으로 승인된 국제법규는 국내법과 같은 효력을 가진다. 근로조건의 기준은 인간의 존엄성을 보장하도록 법률로 정한다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다. 모든 국민은 헌법과 법률이 정한 법관에 의하여 법률에 의한 재판을 받을 권리를 가진다. 모든 국민은 보건에 관하여 국가의 보호를 받는다.

신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 국회의원과 정부는 법률안을 제출할 수 있다. 국회의원은 법률이 정하는 직을 겸할 수 없다. 국가는 사회보장·사회복지의 증진에 노력할 의무를 진다. 대통령의 임기가 만료되는 때에는 임기만료 70일 내지 40일전에 후임자를 선거한다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 국무총리 또는 행정각부의 장은 소관사무에 관하여 법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수 있다.

대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다. 대법원은 법률에 저촉되지 아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 대법원과 각급법원의 조직은 법률로 정한다. 국회의원은 그 지위를 남용하여 국가·공공단체 또는 기업체와의 계약이나 그 처분에 의하여 재산상의 권리·이익 또는 직위를 취득하거나 타인을 위하여 그 취득을 알선할 수 없다. 국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다.

공무원의 직무상 불법행위로 손해를 받은 국민은 법률이 정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수 있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 정기회의 회기는 100일을, 임시회의 회기는 30일을 초과할 수 없다. 국가는 국민 모두의 생산 및 생활의 기반이 되는 국토의 효율적이고 균형있는 이용·개발과 보전을 위하여 법률이 정하는 바에 의하여 그에 관한 필요한 제한과 의무를 과할 수 있다. 국회가 재적의원 과반수의 찬성으로 계엄의 해제를 요구한 때에는 대통령은 이를 해제하여야 한다. 국가안전보장회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.      

                            </p>
                            <hr/>
                            </div>
                        </div>
                        <div id="f_payBox" >{/**결제 컨테이너 */}
                            <div className="fixed_element">{/**펀딩 인포 */}
                                <div id="f_like_visit"><AiFillEye/>&nbsp; 99 &nbsp;<AiFillHeart/>&nbsp; 4</div>
                                <p id="f_infoLetter">카테고리 &nbsp;<BiSolidRightArrow/>&nbsp;프로그래밍</p>
                                <hr/>
                                
                                <ul>
                                    <li id="f_info_li" className="f_Dday"><h3>{diffDayValue}</h3></li>
                                    <li id="f_info_li">마감 2023/12/25</li>
                                    <li id="f_info_li">금액 150,000 원</li>
                                    <li id="f_info_li">최대 모집 인원 16명</li>
                                    <li id="f_info_li">현재 남은 인원 3명</li>
                                    <li id="f_info_li">
                                    <h2 style={{color:"#fa6363"}}>달성률 80% <BsFire style={{color:"red"}}/></h2>
                                    </li>
                                </ul>

                                <div>
                                </div>

                                <div id="f_info_buttonBox">
                                    <div>
                                        <DoFunding/>
                                    </div>
                                    <div id="f_heart_button">
                                        <EmptyHeart size={45}/>                                       
                                    </div>
                                </div>
                                <div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div>{/**버튼 박스 */}
                                
                            </div>
                        </div>
                        <div>
                            {/* <Card/> */}
                            
                        </div>
                    </div>
                    <div id="f_writer_boxes">

                        <div id="f_writer_buttons">
                            
                                <StartFunding/>
                                <UpdateFunding/>
                                <CancelFunding/>
                            
                        </div>
                        <div id="f_writer_msg">
                            <h3 id="f_msg_title" style={{paddingLeft:"15px"}}>펀딩 시작하기 &nbsp; <FiAlertTriangle style={{color :"red"}} size={28}/></h3>
                            <div id="f_msg_content" style={{paddingLeft:"15px"}}>펀딩 시작하기 버튼을 클릭시 펀딩이 시작됩니다.<br/>펀딩이 시작되면 내용 수정이 불가능합니다.</div>
                        </div>
                    </div>
                    <div id="f_height150"></div>
                </div>
                <div id="f_right">{/**오른쪽 */}</div>
            </div>

        </div>
    )
}