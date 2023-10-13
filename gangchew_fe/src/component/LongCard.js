import React from "react"
import longCard from "../component/css/longCard.css";

export default function LongCard(){

    return(
        
        <div id="lc_container">{/**전체 컨테이너 */}
            <div id="lc_img_container">{/**이미지 컨테이너 */}
                <img style={{objectFit:"cover", width:"100%"}} src="/carousel002.jpg"></img>
            </div>
            <div id="lc_content_container">{/**내용 컨테이너 */}
                <div id="lc_title">{/**제목 영역 */}
                    <h4 style={{marginLeft:"15px"}}>[sql]동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세.</h4>
                </div>
                <div id="lc_content">{/**나머지 영역 */}
                    <div id="lc_subtitle">
                        <p style={{marginLeft:"15px"}}>무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세. 
                            남 산위에 저 소나무 철갑을 두른 두른두루치기 돼지 두루치기 소주한잔
                        </p>
                    </div>
                    <div id="lc_writer">{/**작성자 */}
                        <span>작성자 : 조현빈</span>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}