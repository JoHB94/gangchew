import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FundingList from './funding/FundingList';
import FundingCreate from './funding/FundingCreate';
import Login from './member/Login';
import ConsumerCreate from './consumer/ConsumerCreate';
import ConsumerDetail from './consumer/ConsumerDetail';
import ConsumerList from './consumer/ConsumerList';
import MyActivityDetail from './mypage/MyActivityDetail';
import MyActivityPayment from './mypage/MyActivityPayment';
import FundingInfo from './funding/FundingInfo';
import RegistrationForm from './member/RegistrationForm';
import MainBoard from './main/MainBoard';
import FirstSlider from './component/mainSlider/FirstSlider';
import SearchList from './main/SearchList';
import ConsumerUpdate from './consumer/ConsumerUpdate';
import ConsumerComment from './consumer/ConsumerComment';
import Layout from "./component/Layout";
import KakaoRedirect from "./member/Kakao/KakaoRedirect";
import NaverRedirect from "./member/Naver/NaverRedirect";

import KakaoPayment  from "./consumer/KakaoPayment";
import SuccessPayment from './consumer/SuccessPayment';

import MessageList from './main/MessageList';

import UserPage from './member/UserPage';
import FundingPayment from './payment/FundingPayment';
import PaymentForm  from "./consumer/PaymentForm";


function App() {
  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
       {/* <Route exact path='/' element={<Home/>}/> */} 
        {/*홈*/}
          {/* 헤더 없는 페이지 */}
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/registration' element={<RegistrationForm/>}/>
          <Route path="/login/kakao/callback" element={<KakaoRedirect/>}/> {/* 카카오 로그인 ridirect처리용 페이지 */}
          <Route path='/login/naver/callback' element={<NaverRedirect/>}/> {/* 네이버 로그인 ridirect처리용 페이지 */}
          <Route exact path='/fundingpayment' element={<FundingPayment/>}/>
          

          {/* 헤더를 포함하는 페이지 */}
        <Route element={<Layout />}>
          

          <Route exact path='/' element={<MainBoard/>}/>
          <Route exact path='/fundinglist' element={<FundingList/>}/>
          <Route exact path='/fundingcreate' element={<FundingCreate/>}/>
          <Route exact path='/fundinginfo/:fundingId' element={<FundingInfo/>}/>
          <Route exact path='/searchlist/:keyword' element={<SearchList/>}/>
          <Route exact path='/messagelist' element={<MessageList/>}/>


          <Route exact path='/consumerupdate/:postId' element={<ConsumerUpdate/>}/> 
          <Route exact path='/consumercreate' element={<ConsumerCreate/>}/>        
          <Route exact path='/consumerdetail/:postId' element={<ConsumerDetail/>}/>
          <Route exact path='/consumerComment' element={<ConsumerComment/>}/>
          <Route exact path='/consumerlist' element={<ConsumerList/>}/>
          <Route exact path='/myactivitydetail' element={<MyActivityDetail/>}/>
          <Route exact path='/myactivitypayment/:fundingId' element={<MyActivityPayment/>}/>
          
          <Route exact path='/searchlist' element={<SearchList/>}/>

          <Route exact path='/kakaopayment/' element={<KakaoPayment/>}/>
          <Route path='/successPayment/:pg_token' element={<SuccessPayment/>}/>

          <Route exact path='/user' element={<UserPage/>}/>
          <Route exact path='/paymentform/' element={<PaymentForm/>}/>

        </Route>
      </Routes>
    {/* 푸터 컴포넌트 들어갈 부분*/}
    
    </BrowserRouter>
  </div>
  );
}

export default App;
