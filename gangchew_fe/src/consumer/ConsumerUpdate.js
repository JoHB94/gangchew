import React, { useState, useEffect } from "react";
import '../consumer/css/ConsumerCreate.css';
import '../component/css/SimpleLine.css';
import TitleTextFields from '../component/inputs/TitleTextFields';
import CategorySelect from '../component/inputs/CategorySelect';
import { Viewer } from "@toast-ui/react-editor";
import OkButton from '../component/buttons/OkButton';
import DeleteButton from '../component/buttons/DeleteButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";




export default function ConsumerUpdate() {   
   
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
        //axios.get(`http://localhost:9000/studentrequest/read?postId=${postId}`)
        axios.get('/consumer/ConsumerDetail.json')
        .then((res)=>{
            console.log(res.data);
            setConsumer(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[]);

//**************************callBack************************************* */
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key,newValue) => {
        setConsumer((prevFunding) => ({
            ...prevFunding,
            [key]: newValue
        }));
        
    };
//************************onClick*************************************** */ 
    const submit=(e)=>{
        axios.post('http://localhost:9000/studentrequest/save',consumer)
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
          await axios.delete(`http://localhost:9000/studentrequest/read?id=${postId}`).then((res) => {
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
                        <Viewer initialValue={consumer.content}    name={'content'} handleInputChange={handleInputChange} text={consumer.content} modValue={consumer.content}/>
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
