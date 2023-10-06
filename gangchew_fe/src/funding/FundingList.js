import PaginationRounded from "./PaginationRounded";
import SimpleSlider from "../component/SimpleSlider";
import fundingList from "../funding/css/fundingList.css";
import Card from "../component/Card";
export default function FundingList() {
  return (
    <div>
      <div id="headerarea"></div>
      <div id="container100">
        <div id="list_left"></div>
        <div id="list_center">
          <div id="carousel">
            <SimpleSlider />
          </div>
          <div id="category">
            <div id="category80">
              <div id="cate_item" className="cate_item_border_right">운동&Life</div>
              <div id="cate_item" className="cate_item_border_right">경제&금융</div>
              <div id="cate_item" className="cate_item_border_right">n잡&부업</div>
              <div id="cate_item" className="cate_item_border_right">커리어</div>
              <div id="cate_item" className="cate_item_border_right">언어</div>
              <div id="cate_item" className="cate_item_border_right">프로그래밍</div>
              <div id="cate_item">비즈니스&마케팅</div>
            </div>
          </div>
          
          <div id="options">
            <div id="title">
              <h2 id="p_h2">펀딩List</h2>
            </div>
            <div id="switch">
              <button>내지역/전체</button>
            </div>
            <div id="drop">
              <select>
                <option>-------</option>
                <option>달성률순</option>
                <option>최신순</option>
              </select>
            </div>
          </div>
          <div>
            <div id="content">
              <div id="contentBox">
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
                <span id="cardBoard">
                  <Card/>
                </span>
              </div>
            </div>
          </div>
          <div id="empty5"></div>
          <div id="pagination100">
            {/*------------페이지네이션 위치!!!!-----------*/}
            <PaginationRounded />
          </div>
          <div id="empty5"></div>
        </div>
        <div id="list_right"></div>
      </div>
    </div>
  );
}
