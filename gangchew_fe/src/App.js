import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './main/Header';
import FundingList from './funding/FundingList';
import FundingCreate from './funding/FundingCreate';
import Login from './member/Login';
<<<<<<< HEAD
import FundingInfo from './funding/FundingInfo';
import FundingTest from './funding/FundingTest';
=======
import SelectRegistration from './member/SelectRegistration';
import RegistrationForm from './member/RegistrationForm';
>>>>>>> 540ed33756fbbc905ab5e3efd80031c91f80b2f0

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
       {/* <Route exact path='/' element={<Home/>}/> */} 
        {/*홈*/}
        <Route exact path='/fundinglist' element={<FundingList/>}/>
        <Route exact path='/fundingcreate' element={<FundingCreate/>}/>
        <Route exact path='/fundinginfo' element={<FundingInfo/>}/>
        <Route exact path='/fundingtest' element={<FundingTest/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/selectRegistration' element={<SelectRegistration/>}/>
        <Route exact path='/registration' element={<RegistrationForm/>}/>
      </Routes>
    {/* 푸터 컴포넌트 들어갈 부분*/}
    </BrowserRouter>
  </div>
  );
}

export default App;
