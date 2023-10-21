import React, { useState, useEffect } from "react";
import '../consumer/css/ConsumerCreate.css';
import '../component/css/SimpleLine.css';
import TitleTextFields from '../component/inputs/TitleTextFields';
import CategorySelect from '../component/inputs/CategorySelect';

import OkButton from '../component/buttons/OkButton';
import DeleteButton from '../component/buttons/DeleteButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ToastEditor from '../component/inputs/ToastEditor';
import { getCookie } from '../member/Cookie';

export default function ConsumerUpdate() {   

    const cloudIP = 'http://138.2.114.150:9000';
    const localIP = 'http://localhost:9000';

    const {postId}  = useParams();

    const navigate = useNavigate();
//**************************state*************************************** */
    const [consumer, setConsumer] = useState({
        postId: 0,
        title: '',
        category_id: 0,
        writer: '',
        content: ''
    });

    // consumer 조회 및 셋팅
    useEffect(()=>{
        console.log(postId)
        axios.get(localIP+`/studentrequest/read?postId=${postId}`)
        .then((res)=>{
            console.log(res);
            setConsumer(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);

    // // json test -----------
    // useEffect(()=>{
    //     console.log(postId)
    //     axios.get('/consumer/ConsumerDetail.json')
    //     .then((res)=>{
    //         console.log(res.data);
    //         setConsumer(res.data);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // },[]);    

//**************************callBack************************************* */
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key,newValue) => {
        setConsumer((prevFunding) => ({
            ...prevFunding,
            [key]: newValue
        }));
        
    };
//************************onClick*************************************** */ 
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
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const submit=(e)=>{
        axiosInstance.post(localIP+'/studentrequest/save',consumer)
        .then((res)=>{
            alert('등록되었습니다.');
            navigate('/consumerdetail');
            console.log(res);
        })
        
        .catch((error)=>{
            console.log(error);
        })
    }
    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
          await axiosInstance.delete(localIP+`/studentrequest/read?id=${postId}`).then((res) => {
            alert('삭제되었습니다.');
            navigate('/consumerlist');
          });
        }
    };  

    return (
    <div>
    {consumer ? (
        <div>
        <div className="c_HeaderBlank" /*헤더 */></div>
        <div className="c_Container">
            <div className="c_Left" /*왼쪽빈공간 */></div>
            <div className="c_Center" >
                <div> 
                    <h2>수요자 게시판</h2>     
                    <div className="SimpleLine"></div>        
                </div>
                <div>
                    <div className='c_Title'>
                        <TitleTextFields name={'title'} handleInputChange={handleInputChange} text={consumer.title} modValue={consumer.title}/>
                    </div>
                    <div className='c_Category'>
                        <CategorySelect name={'categoryName'} handleInputChange={handleInputChange} text={consumer.categoryName} modValue={consumer.categoryId}/>
                    </div>
                    <div className='c_Content'>
                        <ToastEditor content={consumer.content}    name={'content'} handleInputChange={handleInputChange} text={consumer.content} modValue={consumer.content}/>
                    </div>
                </div>
                <div className='c_height100'>{/**에디터와 버튼사이 빈 공간 */}</div>
                <div className='c_buttonContainer'>
                    <div className='c_OkButton' onClick={submit}><OkButton/></div>
                    <div className='c_CancelButton' onClick={deleteBoard}><DeleteButton/></div> 
                
                </div>
                <div className='c_height100'>{/**에디터와 버튼사이 빈 공간 */}</div>
            </div>
            <div className="c_Right" /*오른쪽빈공간 */></div>
        </div>
        {console.log(consumer)}
        </div>
    ):(
        <div></div>
    )}
    </div>
    )
}
