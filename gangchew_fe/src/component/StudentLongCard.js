import React, { useEffect, useState } from "react"
import Highlighter from 'react-highlight-words';
import longCard from "../component/css/longCard.css";

export default function StudentLongCard({post , keyword}){

    const [postData,setPostData] = useState({});
    const [title,setTitle] = useState('');
    const [cateName, setCateName] = useState('');
    

    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + '...';
        }
        return text;
      }

    useEffect(()=>{
        setPostData(post);
        setTitle(post.title);
        setCateName(post.fundingCategory.categoryName);

        console.log(post);
        
    },[])

    return(
        
        <div id="lc_container" style={{height:"auto"}}>{/**전체 컨테이너 */}
            
            <div style={{width:"100%"}}>{/**내용 컨테이너 */}
                <div id="lc_title">{/**제목 영역 */}
                    <h4 style={{marginLeft:"15px" ,width:"100%"}}>
                        <Highlighter searchWords={[keyword]} autoEscape={true} 
                        textToHighlight={truncateText(title, 70)}/>
                        
                    </h4>
                    <div id="lc_category">
                    [분류 &gt;
                   {cateName &&  <Highlighter searchWords={[keyword]} autoEscape={true} 
                        textToHighlight={cateName}/>
                    }]
                    </div>
                    
                </div>
                
            </div>
        </div>
        
    )
}