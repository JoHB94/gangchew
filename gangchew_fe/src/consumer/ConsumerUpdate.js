import React, { useState, useEffect, useRef } from 'react';
import '../consumer/css/ConsumerCreate.css';
import '../component/css/SimpleLine.css';
import ConsumerTitleTextFields from '../component/inputs/ConsumerTitleTextFields';
import CategorySelect from '../component/inputs/CategorySelect';
import OkButton from '../component/buttons/OkButton';
import CancelButton from '../component/buttons/CancelButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../member/Cookie';
import { useParams } from "react-router-dom";
import { Editor } from '@toast-ui/react-editor';

export default function ConsumerUpdate() {   
   
    const navigate = useNavigate();
   
//**************************state*************************************** */

    const [loginId, setLoginId] = useState('');
    const { postId } = useParams();
    const [dataLoaded, setDataLoaded] = useState(false);
    const editorRef = useRef();

    console.log("postId {}",postId);

    /*const [consumer, setConsumer] = useState({
        title: '',
        category_id: 0,
        content: ''
    });*/
    const [consumer, setConsumer] = useState({
        studentId: 0,
        id:0,
        title: '',
        category_id :0,
        fundingCategory:{id:0},
        writer: '',
        content: '',
        regDt: '',
        user_id:''
    });


//**************************callBack************************************* */
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key, newValue) => {
        if (newValue === '') {
            // 값을 확인하고 내용이 비어있으면 경고창 또는 오류 메시지를 추가하세요.
            alert('내용을 입력해주세요');
        } else {
            if (key === 'content') {

                console.log("editorRef {}",editorRef);
                const newHTML = editorRef.current?.getInstance().getHTML();
                const newMarkdown = editorRef.current?.getInstance().getMarkdown();
                console.log("newHTML {}",newHTML);
                console.log("newMarkdown {}",newMarkdown);
                if (newHTML === ''){
                    setConsumer((prevConsumer) => ({
                        ...prevConsumer,
                        [key]: newMarkdown
                    }));
                } else {
                    setConsumer((prevConsumer) => ({
                        ...prevConsumer,
                        [key]: newHTML
                    }));
                }
                /*                              
                setConsumer((prevConsumer) => ({
                    ...prevConsumer,
                    [key]: newValue.getData()
                }));*/
            } else {
                setConsumer((prevConsumer) => ({
                    ...prevConsumer,
                    [key]: newValue
                }));
            }
        }
    };
 
//************************onClick*************************************** */ 



const cloudIP = ' http://138.2.114.150:9000/';
const localIP = 'http://localhost:9000/';

var token = '';

if (getCookie("jwtToken") !== undefined){
    token = getCookie("jwtToken");
    console.log("token {}",token);
}

const axiosInstance = axios.create({
    headers:{
      'Content-Type': 'application/json',
    }
  });

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const submit = (e) => {
    // if ((consumer.title).length === 0){
    //     alert('제목을 입력해주세요.');
    //     return;
    // }  else if((consumer.content).length === 0){
    //     alert('내용을 입력해주세요.');
    //     return;
    // }

    axiosInstance
        .post(localIP + 'studentrequest/update', consumer)
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
                //navigate(`/consumerdetail/${postId}`);
                navigate(`/consumerlist`);
            }
            console.log("submit consumer {}",consumer);
            console.log("submit res {}",res);
        })
        .catch((error) => {
            console.log("submit error {}",error);
        });
    
};

const backToList = () => {
    alert('취소되었습니다.');
    navigate('/consumerlist');
};

// consumer 조회 및 셋팅
useEffect(() => {
    console.log("useEffect {}",postId);
    axiosInstance.get(localIP + `studentrequest/read?id=${postId}`)
        .then((res) => {
            console.log('student {}',res);
            setConsumer(res.data.result);
            
            const key = 'studentId';
            setConsumer((prevConsumer) => ({
                ...prevConsumer,
                [key]: res.data.result.id
            }));
             // 카테고리 값 설정
             setConsumer((prevConsumer) => ({
                ...prevConsumer,
                category_id: res.data.result.fundingCategory.id
            }));

            setDataLoaded(true); // 데이터가 가져와지면 dataLoaded를 true로 설정합니다
            //setConsumer(res);
            
        })
        .catch((error) => {
            console.log(error);
        });
/*
    axiosInstance.post(localIP + 'user/myinfo')
        .then((res)=>{
            console.log('유저정보 반환 {}',res);
            if(res.data.message === "요청에 성공하였습니다."){
                setLoginId(res.data.result.username);
            }
            
        }).catch((error)=>{
            console.log(error);
        })
   */         
}, []);


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
                        {dataLoaded && <ConsumerTitleTextFields  text={'제목'} name={'title'} modValue={consumer.title} handleInputChange={handleInputChange} />}
                    </div>
                    <div className='c_CreateCategory'>
                        {dataLoaded && <CategorySelect name={'category_id'} modValue={consumer.category_id} handleInputChange={handleInputChange}/>}
                    </div>
                    <div className='c_Content'>
                    {dataLoaded && (
                        <Editor
                        ref={editorRef} // DOM 선택용 useRef
                        initialValue={consumer.content}
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        onChange={(value) => handleInputChange('content', value)}
                        />
                    )}
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
