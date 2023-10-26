import { useState } from "react";
import Card from "../../component/css/card.css";
import EmptyHeart from "../buttons/EmptyHeart";
import FullHeart from "../buttons/FullHeart";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../member/Cookie";

export default function SecondCard(props) {

  const [like, setLike] = useState(false);
  const [fundingData, setFundingData] = useState({
    fundingId: 0,
    title: "",
    thumbnail: "",
    liked: false,
    achievementrate: 0,
    totalItems: 0,
  });
  
  const token = getCookie("jwtToken");
  if(!token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // 외부에서 받은 펀딩 데이터 입수
  useEffect(() => {
    setFundingData({ ...props.data });
  }, [props.data]);

  useEffect(() => {
    setLike(props.like)
  }, [props.like]);

  const likeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const requestUrl = `http://localhost:9000/funding/toggle-like?id=${fundingData.id}`;
    const requestMethod = "GET";

    axios({
      method: requestMethod,
      url: requestUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("서버 응답 데이터:", response.data);
      setLike(!like);
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    })

  };

  const infoHandle = () => {
    window.location.href = `/fundinginfo/${fundingData.id}`;
  };

  return (
    <div>
      <div id="card_container" onClick={infoHandle}>
        {/**카드 컨테이너 */}
        <div id="card_imgContainer">
          {/**카드 이미지 */}
          <img id="card_img" src={fundingData.thumbnail} alt="/replace.jpg" />
        </div>
        <div id="card_infoContainer">
          {/**카드 정보 */}
          <div id="card_info_line">
            <div id="card_infoTitle">
              {/**제목 */}

              <h3 id="card_title">
                {/* {funding.title} */}
                {fundingData.title}
              </h3>
            </div>
            <div id="card_infoLike" onClick={likeHandler}>
              {" "}
              {/**좋아요 버튼 */}
              {like ? <FullHeart /> : <EmptyHeart />}
            </div>
          </div>
          <div id="card_infoRate">
            {/**진행률 */}
            <span id="card_rate">
              {/* 현재 진행률 {rate}% */}
              진행률 {props.rate} %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
