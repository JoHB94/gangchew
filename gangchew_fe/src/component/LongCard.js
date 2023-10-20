import React, { useEffect, useState } from "react"
import longCard from "../component/css/longCard.css";

export default function LongCard({funding}){

    const [fundingData,setFundingData] = useState({});

    useEffect(()=>{
        setFundingData(funding);
    },[])

    return(
        
        <div id="lc_container">{/**전체 컨테이너 */}
            <div id="lc_img_container">{/**이미지 컨테이너 */}
                <img style={{objectFit:"cover", width:"100%"}} src={fundingData.thumbnail}></img>
            </div>
            <div id="lc_content_container">{/**내용 컨테이너 */}
                <div id="lc_title">{/**제목 영역 */}
                    <h4 style={{marginLeft:"15px"}}>
                        {fundingData.title}
                    </h4>
                </div>
                <div id="lc_content">{/**나머지 영역 */}
                    <div id="lc_subtitle">
                        <p style={{marginLeft:"15px"}}>
                            {fundingData.subtitle}
                        </p>
                    </div>
                    <div id="lc_writer">{/**작성자 */}
                        <span>작성자 {fundingData.writer}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}