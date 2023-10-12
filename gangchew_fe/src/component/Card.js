import card from "../component/css/card.css";
import FullHeart from "./buttons/FullHeart";

const Card = ({ posts, loading }) => {
  return (
    <div>
      {loading && <div> loading... </div>}

      <div>
        <div id="content">
          <div id="contentBox">
              <span id="cardBoard">
                <div id="card_container">
                  {/**카드 컨테이너 */}
                  <div id="card_imgContainer">
                    {/**카드 이미지 */}
                    <img id="card_img" src="/carousel002.jpg" />
                  </div>
                  <div id="card_infoContainer">
                    {/**카드 정보 */}
                    <div id="card_info_line">
                      <div id="card_infoTitle">
                        {/**제목 */}
                        <h3 id="card_title">
                          SQL을 통한 데이터 베이스의 이해와 관리의 중요성
                        </h3>
                      </div>
                      <div id="card_infoLike">
                        {" "}
                        {/**좋아요 버튼 */}
                        <FullHeart />
                      </div>
                    </div>
                    <div id="card_infoRate">
                      {/**진행률 */}
                      <span id="card_rate">현재 진행률 96%</span>
                    </div>
                  </div>
                </div>
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
