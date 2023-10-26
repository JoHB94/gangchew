import React, { useState, useEffect } from "react";
import { getCookie } from "../member/Cookie";
import axios from "axios";
//페이지 네이션 import
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../component/css/SimpleLine.css";
import "./css/FundingCart.css";
import PaymentOptions from "../component/PaymentOptions";
import FundingPayment from "./FundingPayment";
import Removeallbutton from "../component/buttons/Removeallbutton";
import RemoveButton from "../component/buttons/RemoveButton";

import { Link } from "react-router-dom";

export default function FundingCart(props) {
  //*****************************state********************************************* */
  /* 전체 데이터를 기반으로 프론트엔드 자체적으로 페이지네이션을 구현하였음 */
  const PostPerpage = 10; // 한 페이지에 들어가는 게시물 수
  const [currentPage, setCurrentPage] = useState(1); // 초기 페이지 1로 설정
  const indexOfLastPost = currentPage * PostPerpage; // 한페이지에 들어가는 게시물의 인덱스
  const indexOfFirstPost = indexOfLastPost - PostPerpage; // 페이지당 첫 게시물의 인덱스번호

  const LOCAL_IP = "http://localhost:9000";
  const token = getCookie("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const myArray = [];

  const [consumers, setConsumers] = useState([]);
  const [history, setHistory] = useState(false);

  const [funding, setFunding] = useState({
    amount: 0,
    id: 0,
    subtitle: "",
    thumbnail: "",
    title: "",
    viewCount: 0,
  });
  const [payment, setPayment] = useState({
    funding: 0, //펀딩번호
    participant: "",
    bank_name: "",
    bank_account: "",
    paymentMethod: "", // 결제수단
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedFundingId, setSelectedFundingId] = useState([]);

  const currentPosts = consumers.slice(indexOfFirstPost, indexOfLastPost); // 현재 게시물의 단위를 나누는 로직(1->3 ~ 4->6 ~ 7->9 ...)
  //************************************ axios ************************************************** */
  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios({
          url: `${LOCAL_IP}/fundingcart/all`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("받은 데이터: ", response.data); //Array개수 확인
        if (response.data.result.length === 0) {
          setHistory(true); //데이터 X 상태
        } else {
          setHistory(false);
        }

        for (let i = 0; i < response.data.result.length; i++) {
          myArray.push(response.data.result[i]);
          setConsumers(myArray);
        }
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };
    requestData();
  }, []);
  /*************************************useEffect********************************* */
  //페이지가 렌더될 때 실행될 함수.

  //******************************************page Handler************************************** */
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePaymentMethodChange = (newValue) => {
    const selectedMethod = newValue; // Assuming the value comes from the event
    setPayment((prevPayment) => ({
      ...prevPayment,
      paymentMethod: selectedMethod,
    }));
  };
  console.log(totalAmount);
  const CheckboxClickhandle = (event, item) => {
    if (event.target.checked) {
      setSelectedTitles([...selectedTitles, item.funding.title]);
      setSelectedFundingId([...selectedFundingId, item.funding.id]);
      setTotalAmount(totalAmount + item.funding.amount);
    } else {
      const updatedTitles = selectedTitles.filter(
        (title) => title !== item.funding.title
      );
      const updatedFundingId = selectedFundingId.filter(
        (id) => id !== item.funding.id
      );


      setSelectedTitles(updatedTitles);
      setSelectedFundingId(updatedFundingId);
      setTotalAmount(totalAmount - item.funding.amount);
    }

    


  };

  const ListBoxStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    height: "auto",
    borderRadius: "10px",
    border: "solid 1px #d3d3d3",
  };

  const blankBoardStyle = {
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "solid 1px #d3d3d3",
  };

  const List_Map_Style = {};

  const List_Box_1Style = {
    display: "grid",
    gridTemplateColumns: "23% 62% 15%",
    marginBottom: "20px",
  };

  const marginStyle ={
    marginBottom: "10px",
  }

  const linkStyle = {
    color: "black",
    fontWeight: "700",
    fontSize: "20px",
  }

  return (
    <div>
      <div className="HeaderBlank-cart" /**헤더 */></div>
      <div className="ContainerDetail-cart">
        <div className="m_LeftDetail" /**왼쪽빈공간 */></div>

        <div className="CenterDetail-cart">
          <h1>장바구니</h1>
          <div style={ListBoxStyle} /**전체 컨테이너 */>
            {history ? (
              <div className="blankboard" style={blankBoardStyle}>
                장바구니에 담긴 펀딩이 없습니다.
              </div>
            ) : (
              <>
                {currentPosts.map((item) => (
                  <div className="List_Map" style={List_Map_Style}>
                    <div className="List_Box_1-" style={List_Box_1Style}>
                      <div className="Grid1">
                        <div className="List_PostNumber" /* 썸네일 */>
                          <img
                            className="cartThumnail"
                            src={item.funding.thumbnail}
                            alt="/replace.jpg"
                          />
                        </div>
                      </div>
                      <div className="Grid2">
                        <div className="List_Title-" style={marginStyle}>
                          <Link to={`/consumerdetail/${item.postId}`} style={linkStyle}>
                            {item.funding.title}
                          </Link>
                        </div>
                        <div className="List_PostNumber" /* 카테고리 */ style={marginStyle}>
                          <span>카테고리 :</span> {item.funding.fundingCategory.categoryName}
                        </div>
                        <div className="List_Writer-" /*작성자*/ style={marginStyle}>
                        <span>강사 : </span>{`${item.funding.writer.fullname} 강사님`}
                        </div>
                        <div className="List_RegDt-" /* 마감일 */ style={marginStyle}>
                        <span>마감일 : </span>
                          {`${item.funding.deadline[0]}년 ${item.funding.deadline[1]}월 ${item.funding.deadline[2]}일`}
                      <div className="SimpleLine"></div>
                        </div>
                      </div>
                      <div className="Grid3">
                        <div className="">
                          <div className="amountBoard"><input type="checkBox" value="item.funding.amount" onClick={(event) => CheckboxClickhandle(event, item)}></input>₩{item.funding.amount}</div>
                        </div>
                        <div>
                          <RemoveButton fundingId={item.funding.id}/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div className="c_Pagination" /*페이지네이션*/>
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(consumers.length / PostPerpage)} // 전체 게시물 수
                  variant="outlined"
                  shape="rounded"
                  color="secondary"
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </div>
        </div>
        <div className="totalAmount">
          <div className="totalAmount-title">
            <h2>{!selectedTitles[0] ? "" : `${selectedTitles[0]} 외 ${selectedTitles.length-1}건`}</h2>
            <h2>합계 : {totalAmount}원
          </h2>
          </div>
          <div class="paymentPG">
            <div className="m_OrderS" /*결제수단 셀렉트*/>
              <PaymentOptions
                paymentMethod={payment.paymentMethod}
                handlePaymentMethodChange={handlePaymentMethodChange}
              />
            </div>
            <div className="m_OrderPay" /*페이체크*/>
              <label>
                {/* 
                                결제PG코드
                                카카오페이 : kakaopay
                                토스페이 : tosspay
                                신용/체크카드(토스페이먼츠 지원) : uplus
                                다날휴대폰결제 : danal

                                 */}

                <div className="m_KakaoPay">
                  <img
                    className="kakaoPay"
                    src={process.env.PUBLIC_URL + "/logokakao.png"}
                    alt="kakao"
                  />
                </div>
                <div className="m_TossPay">
                  <img
                    className="TossPay"
                    src={process.env.PUBLIC_URL + "/logotoss.png"}
                    alt="toss"
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="totalAmount-payButton">
            <FundingPayment
              title={selectedTitles}
              amount={totalAmount}
              fundingIdMap={selectedFundingId}
              paymentMethod={payment.paymentMethod}
            />
            <div className="SimpleLine"></div>
            <Removeallbutton />
          </div>
          <div></div>
        </div>
        <div className="m_RightDetail" /**오른쪽빈공간 */></div>
      </div>
    </div>
  );
}
