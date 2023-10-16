import messageDiv from '../main/css/messageDiv.css';
import {FcCancel} from 'react-icons/fc';

export default function MessageDiv(){


    return(
        <div id="md_container">
            {/* <div style={{backgroundColor:"#701edb", height:"10px"}}></div> */}
            <div>
                <div id='md_upside'>
                    <div id='md_date'>2023.10.16</div>
                </div>{/**메세지 유형 */}
                <div id="md_content">
                    <h4 style={{marginTop:"5px", marginBottom:"5px"}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <FcCancel color='red' size={25}/>&nbsp;
                        <b style={{color:"#701edb"}}>조현빈</b>님이 참여하신 펀딩이 취소되었습니다.
                        </div>
                        </h4>
                    <div>[sql]데이터 베이스설계의 기초</div>
                    
                </div>{/**발송 날짜 및 */}
            </div>
        </div>
    )
}