import React from "react";
import fundingInfo from "../funding/css/fundingInfo.css";

export default function InfoTop(){

    return(
        <div>
            <div id="f_infoTitle">
                {/**펀딩 제목 들어갈 부분 */}
                <h2>코드로 배우는 스프링 웹 프로젝트</h2>
            </div>
            <div id="f_infoContainer">
                
                {/**섹션1 : 썸네일 & 입력받은 펀딩 정보 */}
                <div id="f_infoThumbContainer">
                    {/**좌측 컨테이너 : 썸네일*/}
                    <img id="f_infoThumb" src="/test_thumbnail01.jpeg"/>
                </div>
                <div id="f_infoDetail">
                    {/**우측 컨테이너 : 펀딩 정보 (조회수, 좋아요수, 카테고리 정보, 마감일, 펀딩 금액, 목표 모집 인원, 달성률) */}
                    <p>
                        <span>조회수 15</span><span> 좋아요 15</span>
                    </p>
                    <h3>카테고리 - 프로그래밍</h3>
                    <hr/>
                    <ul>
                        <li>마감 날짜</li>
                        <li>펀딩 금액</li>
                        <li>목표 인원</li>
                    </ul>
                    <div>
                        {/**달성률 그래프를 찾으면 넣고 못찾으면 숫자로 기입 */}
                    </div>
                </div>
                
            </div>
        </div>
    )
}