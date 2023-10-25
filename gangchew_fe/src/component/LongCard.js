import React, { useEffect, useState } from "react"
import Highlighter from 'react-highlight-words';
import longCard from "../component/css/longCard.css";

export default function LongCard({funding , keyword}){

    const [fundingData,setFundingData] = useState({});
    const [title,setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      }

    useEffect(()=>{
        setFundingData(funding);
        setTitle(funding.title);
        setSubtitle(funding.subtitle);
        
    },[])

    return(
        
        <div id="lc_container">{/**전체 컨테이너 */}
            <div id="lc_img_container">{/**이미지 컨테이너 */}
                <img style={{objectFit:"cover", width:"100%"}} src={fundingData.thumbnail}></img>
            </div>
            <div id="lc_content_container">{/**내용 컨테이너 */}
                <div id="lc_title">{/**제목 영역 */}
                    <h4 style={{marginLeft:"15px" ,width:"70%"}}>
                        <Highlighter searchWords={[keyword]} autoEscape={true} 
                        textToHighlight={truncateText(title, 30)}/>
                        
                    </h4>
                    <div id="lc_category">
                    [분류 &gt;
                    <Highlighter searchWords={[keyword]} autoEscape={true} 
                        textToHighlight={fundingData.categoryname}/>
                        ]
                    </div>
                </div>
                <div id="lc_content">{/**나머지 영역 */}
                    <div id="lc_subtitle">
                        <p style={{marginLeft:"15px"}}>
                        <Highlighter searchWords={[keyword]} autoEscape={true} 
                        textToHighlight={truncateText(subtitle, 50)}/>
                            
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