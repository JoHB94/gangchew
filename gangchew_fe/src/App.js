import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './main/Header';
import FundingList from './funding/FundingList';
import FundingCreate from './funding/FundingCreate';
import Login from './member/Login';
import ConsumerCreate from './consumer/ConsumerCreate';
import ConsumerDetail from './consumer/ConsumerDetail';
import ConsumerList from './consumer/ConsumerList';
import MyActivityDetail from './mypage/MyActivityDetail';
import MyActivityPayment from './mypage/MyActivityPayment';
import FundingInfo from './funding/FundingInfo';
import FundingTest from './funding/FundingTest';
import SelectRegistration from './member/SelectRegistration';
import RegistrationForm from './member/RegistrationForm';
import MainBoard from './main/MainBoard';
import MainSlider from './component/inputs/MainSlider';
import SearchList from './main/SearchList';
import FundingUpdate from './funding/FundingUpdate';




function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Routes>
       {/* <Route exact path='/' element={<Home/>}/> */} 
        {/*홈*/}
        <Route exact path='/main' element={<MainBoard/>}/>
        <Route exact path='/fundinglist' element={<FundingList/>}/>
        <Route exact path='/fundingcreate' element={<FundingCreate/>}/>
        <Route exact path='/fundingupdate' element={<FundingUpdate/>}/>
        <Route exact path='/fundinginfo' element={<FundingInfo/>}/>
        <Route exact path='/fundingtest' element={<FundingTest/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/consumercreate' element={<ConsumerCreate/>}/>        
        <Route exact path='/consumerdetail/:postId' element={<ConsumerDetail/>}/>
        <Route exact path='/consumerlist' element={<ConsumerList/>}/>
        <Route exact path='/myactivitydetail' element={<MyActivityDetail/>}/>
        <Route exact path='/myactivitypayment' element={<MyActivityPayment/>}/>
        <Route exact path='/selectRegistration' element={<SelectRegistration/>}/>
        <Route exact path='/registration' element={<RegistrationForm/>}/>
        <Route exact path='/mainSlider' element={<MainSlider/>}/>
        <Route exact path='/searchlist' element={<SearchList/>}/>
      </Routes>
    {/* 푸터 컴포넌트 들어갈 부분*/}
    </BrowserRouter>
  </div>
  );
}

export default App;
