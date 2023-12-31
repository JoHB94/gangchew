import React, { useState } from 'react';
import '../consumer/css/ConsumerCreate.css';
import '../component/css/SimpleLine.css';
import ConsumerTitleTextFields from '../component/inputs/ConsumerTitleTextFields';
import CategorySelect from '../component/inputs/CategorySelect';
import ToastEditor from '../component/inputs/ToastEditor';
import OkButton from '../component/buttons/OkButton';
import CancelButton from '../component/buttons/CancelButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../member/Cookie';




export default function ConsumerCreate() {   
   
    const navigate = useNavigate();
   
//**************************state*************************************** */
    const [consumer, setConsumer] = useState({
        title: '',
        category_id: 0,
        content: ''
    });
//**************************callBack************************************* */
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key, newValue) => {
        if (newValue === '') {
            // 값을 확인하고 내용이 비어있으면 경고창 또는 오류 메시지를 추가하세요.
            alert('내용을 입력해주세요');
        } else {
            setConsumer((prevFunding) => ({
                ...prevFunding,
                [key]: newValue
            }));
        }
    };
//************************onClick*************************************** */ 



const cloudIP = ' http://138.2.114.150:9000/';
const localIP = 'http://localhost:9000/';

var token = '';

if (getCookie("jwtToken") !== undefined){
    token = getCookie("jwtToken");
    console.log(token);
}

const axiosInstance = axios.create({
    headers:{
      'Content-Type': 'application/json',
    }
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const submit = (e) => {
    if (consumer.title.trim() === ''){
        alert('제목을 입력해주세요.');
        return;
    }  else if(consumer.content.trim() === ''){
        alert('내용을 입력해주세요.');
        return;
    }  else {
        axiosInstance
            .post(localIP + 'studentrequest/save', consumer)
            .then((res) => {
                if(res.data.message === "로그인 상태가 아닙니다."){
                    alert('로그인 상태가 아닙니다.')
                    navigate('/login');
                    return;
                }
                if(res.data.message ==="일치하는 카테고리가 없습니다."){
                    alert('카테고리를 선택해주세요');
                    return
                }
                if(res.data.message === "요청에 성공하였습니다."){
                    alert('저장되었습니다.')
                    navigate('/consumerlist');
                }
                console.log(consumer);
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
    const backToList = () => {
        navigate('/consumerlist');
      };
    



    return (
    <div>
        <div className="c_CreateHeaderBlank" /*헤더 */></div>
        <div className="c_CreateContainer">
            <div className="c_CreateLeft" /*왼쪽빈공간 */></div>
            <div className="c_CreateCenter" >
                <div>
                    <h2>수요자 게시판</h2>     
                    <div className="SimpleLine"></div>        
                </div>
                <div>
                    <div className='c_CreateTitle'>
                        <ConsumerTitleTextFields  text={'제목'} name={'title'} value={consumer.title} handleInputChange={handleInputChange} />
                    </div>
                    <div className='c_CreateCategory'>
                        <CategorySelect name={'category_id'} handleInputChange={handleInputChange}/>
                    </div>
                    <div className='c_Content'>
                        <ToastEditor name={'content'} value={consumer.content} handleInputChange={handleInputChange}/>
                    </div>
                </div>
                <div className='c_Createheight100'>{/**에디터와 버튼사이 빈 공간 */}</div>
                <div className='c_CreatebuttonContainer'>
                    <div className='c_CreateOkButton' onClick={submit}><OkButton/></div>
                    <div className='c_CreateCancelButton' onClick={backToList}><CancelButton/></div>
                </div>                
            </div>
            <div className="c_CreateRight" /*오른쪽빈공간 */></div>
            <div className='c_CreateBottomBlank'>{/**하단끝 빈공간 */}</div>
        </div>
        {console.log(consumer)}
    </div>
    )
}
