


import { useState } from 'react';
import card from '../component/css/card.css';
import EmptyHeart from './buttons/EmptyHeart';
import FullHeart from './buttons/FullHeart';
import { useEffect } from 'react';


/**
 * 
 * 
 * funding(Object) : 펀딩 글 객체
 * rate(int) : 달성률
 * funding.title : 제목
 * funding.thumbnail(byte[]) : 썸네일 인코딩해야함.
 * 필요 데이터: 좋아요 등록 여부,
 * 
 */
export default function Card({funding}){
   
    // const rate = Math.floor(funding.goal/funding.participants)
    const [like, setLike] = useState(false);

    useEffect(()=>{
        /**로그인 한 아이디와 해당 카드 번호를 기준으로 좋아요 여부를 반환하는 axios 통신 */
    },[])

    const likeHandler =()=>{
        setLike(!like);
        /**axios통신 부분 추가 */
    }

    return(
        <div>
            <div id="card_container">{/**카드 컨테이너 */}
                <div id="card_imgContainer">
                    {/**카드 이미지 */}
                    <img id="card_img" src="" alt="/replace.jpg" />
                </div>
                <div id="card_infoContainer">

                    {/**카드 정보 */}
                    <div id="card_info_line">
                      <div id="card_infoTitle">
                        {/**제목 */}



                        <h3 id='card_title'>
                            {/* {funding.title} */}
                            제목
                            </h3>
                        </div>
                        <div id="card_infoLike" onClick={likeHandler}> {/**좋아요 버튼 */}
                            {like ? (
                                <FullHeart/>
                                ) : (
                                <EmptyHeart/>
                            )}  
                        </div>
                    </div>
                    <div id="card_infoRate">
                        {/**진행률 */}
                        <span id='card_rate'>
                            {/* 현재 진행률 {rate}% */}
                            진행률
                        </span>
                    </div>
                  </div>
                </div>
            </div>
  );
};

