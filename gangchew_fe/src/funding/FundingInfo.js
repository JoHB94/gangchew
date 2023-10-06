import React from "react";
import fundingInfo from "../funding/css/fundingInfo.css";
import InfoTop from "./InfoTop";


export default function FundingInfo(){

    return(
        <div>
            <div id="f_container">{/**왼쪽 */}</div>
            <div id="f_center">
                {/**센터 */}
                <div id="f_headerarea">{/**헤더 영역*/}</div>
                <div>{/**내용 컨테이너 */}
                    <div>{/**section1 : 프로젝트 정보 */}
                        <InfoTop/>
                    </div>
                    <div>{/**section2 : Editor viewer */}

                    </div>
                    <div>{/**section3 : 작성자 통제 박스 */}

                    </div>
                    <div>{/**section4 : 결제 통제 박스 */}

                    </div>
                </div>
            </div>
            <div id="f_right">{/**오른쪽 */}</div>

        </div>
    )
}