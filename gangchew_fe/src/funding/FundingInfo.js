import React,{useState,useEffect} from "react";

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

import fundingInfo from "../funding/css/fundingInfo.css";
import DoFunding from "../component/buttons/DoFunding";
import EmptyHeart from "../component/buttons/EmptyHeart";
import Card from "../component/Card";
import {BiSolidRightArrow} from "react-icons/bi";
import {BsFire} from "react-icons/bs";
import {AiFillEye,AiFillHeart} from "react-icons/ai";
import {FiAlertTriangle} from "react-icons/fi";
import FundingAccordion from "./FundingAccordion";
import StartFunding from "../component/buttons/StartFunding";
import UpdateFunding from "../component/buttons/UpdateFunding";
import CancelFunding from "../component/buttons/CancelFunding";
import { getCookie } from '../member/Cookie';
import axios from "axios";
import { useParams } from "react-router-dom";
import Progress from "../component/Progress";
import FullHeart from "../component/buttons/FullHeart";


export default function FundingInfo(){

//**********************************states**************************************** */
    const [html,setHtml] = useState('');
    const [show, setShow] = useState(false);
    const[isWriter, setIsWriter] = useState(false);
    const[data, setData] = useState({
        achievementrate : 0,
        funding : {
            goal : '',
            id : 0,
            likeCount : 0,
            location : '',
            maxParticipants : 0,
            minParticipants : 0,
            state : '',
            subtitle : '',
            thumbnail : '',
            title : '',
            viewCount : 0,
            content : '',
            writer : {},
        },
        fundingCategory : {
            
        }
        
    });
    const[liked, setLiked] = useState(false);
    const[deadline,setDeadline] = useState('');
    const[diffDayValue, setDiffDayValue] = useState('');
    const[isOffline,setIsOffline] = useState(false);
    const[userId, setUserId] = useState('');
    // const [token, setToken] = useState('');
    const {fundingId} = useParams();
    // const[title, setTitle] = useState('');
    


//***********************************axios**************************************** */

    const cloudIP = ' http://138.2.114.150:9000/';
    const localIP = 'http://localhost:9000/';

    let token = '';

    if (getCookie("jwtToken") !== undefined){
        token = getCookie("jwtToken");
    }

    const axiosInstance = axios.create({
        headers:{
          'Content-Type': 'application/json',
        }
      });
    
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(()=>{
        axiosInstance.get(localIP + `funding/detail?funding=${fundingId}`)
        .then((res)=>{
            console.log(res.data);
            setData(res.data.result);
            setDeadline(res.data.result.funding.deadline);
            setLiked(res.data.result.liked);
            setHtml(res.data.result.funding.content);
       
        }).catch((error)=>{
            console.log(error);
            
        })

        axiosInstance.post(localIP + `user/myinfo`)
        .then((res)=>{
            console.log(res);
            setUserId(res.data.result.fullname);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    useEffect(()=>{
        if(userId === data.funding.writer.fullname){
            setIsWriter(true);
            console.log("작성자와 로그인 아이디 일치여부"+isWriter);
        }
    },[userId,data])





//**********************************************버튼 클릭 핸들러*********************************** */
    // /funding/update 부분 api아직 미구현 상태.
    const fundingStartClick=()=>{
        const userRes = window.confirm("펀딩이 시작되면 수정할 수 없습니다. 정말로 시작하시겠습니까?");
            if(userRes){
                axiosInstance.post(localIP + `funding/update?state=IN_PROGRESS&id=${fundingId}`)
                .then((res)=>{
                    console.log(res);
                    if(res.data.message === "로그인 상태가 아닙니다."){
                        alert('로그인 상태가 아닙니다.');
                        
                    }else if(res.data.result === "좋아요가 등록되었습니다."){
                        alert("좋아요가 등록되었습니다.");
                        setLiked(!liked);
                    }else if(res.data.result === "좋아요 취소가 완료하였습니다."){
                        alert("좋아요 취소가 완료하였습니다.");
                        setLiked(!liked);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
            } 
    }

    const fundingCancelClick=()=>{
        axiosInstance.get(localIP + `funding/delete?id=${fundingId}`)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const fundingLikeClick=()=>{
        axiosInstance.get(localIP+`funding/toggle-like?id=${data.funding.id}`)
        .then((res)=>{
            if(res.data.message === "로그인 상태가 아닙니다."){
                alert('로그인 상태가 아닙니다.');
                
            }else if(res.data.result === "좋아요가 등록되었습니다."){
                alert("좋아요가 등록되었습니다.");
                setLiked(!liked);
            }else if(res.data.result === "좋아요 취소가 완료하였습니다."){
                alert("좋아요 취소가 완료하였습니다.");
                setLiked(!liked);
            }
            console.log(res);
        })
        .catch((error)=>{
            console.log(error);
            
            
        })
    }

    // const fundingPartClick=()=>{
    //     axios.post('')
    //     .then((res)=>{
    //         console.log(res);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }

    // const reFundClick=()=>{
    //     axios.post('')
    //     .then((res)=>{
    //         console.log(res);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }



    /**D-day timer함수 */
    function diffDay() {
        if(deadline){
            const masTime = new Date(deadline[0],deadline[1]-1,deadline[2],deadline[3],deadline[4]);
            
            const todayTime = new Date();
            
            const diff = masTime - todayTime;
            
            const diffDay = String(Math.floor(diff / (1000*60*60*24)));
            const diffHour =String( Math.floor((diff / (1000*60*60)) % 24)).padStart(2,"0");
            const diffMin = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,"0");
            const diffSec = String(Math.floor(diff / 1000 % 60)).padStart(2,"0");
        
        return "D-" + diffDay+"일"+diffHour+"시간"+diffMin+"분"+diffSec+"초";

        } else{
            return <div style={{display:"flex"}}><Progress/></div>
        }
        
    }

    useEffect(() => {
        const intervalId = setInterval(()=>{
            setDiffDayValue(diffDay())
        }, 1000); // 1초간격 호출
        return () => {
          clearInterval(intervalId); // 컴포넌트가 언마운트되면 setInterval 해제
        };
      }, [diffDayValue]);


    return(
        <div>
            <div id="f_container">
                <div id="f_left">{/**왼쪽 */}</div>
                <div id="f_center">

                    <div id="f_headerarea"></div>
                    <div id="f_headerarea"></div>
                    <h1 id="f_title">
                        
                        {data.funding.title}
                        
                        </h1>
                    {/**센터 */}
                    <div id="f_bigBox">

                        <div id="f_contentBox">{/**내용 컨테이너 */}
                            <div id="f_info_thumbnail">
                                {/**썸네일 컨테이너 */}
                                
                                <img id="f_img" src={data.funding.thumbnail} alt=""></img>
                                
                            </div>
                            <div style={{width : "100%"}}>
                                {/**문의사항 아코디언 props : funding.writer.name, funding.writer.email */}
                                <FundingAccordion user={data.funding.writer}/>
                            </div>
                            <div id="f_subtitle">{/**subtitle */}
                                <h3>{data.funding.subtitle}</h3>
                            </div>
                            <div id="f_height150"/>
                            <div id="f_editor">{/**toastViewer */}
                            <div>
                                {/**본문 내용 삽입 구절(funding.content) */}
                                {<Viewer initialValue={html} key={html} />}              
                            </div>
                            <hr/>
                            </div>
                        </div>
                        <div id="f_payBox" >{/**결제 컨테이너 */}
                            <div className="fixed_element">{/**펀딩 인포 */}
                                <div id="f_like_visit"><AiFillEye/>&nbsp; {data.funding.viewCount} &nbsp;<AiFillHeart/>&nbsp; {data.funding.likeCount}</div>
                                <p id="f_infoLetter">카테고리 &nbsp;<BiSolidRightArrow/>&nbsp;{data.fundingCategory.categoryName}</p>
                                <hr/>
                                
                                <ul>
                                    <li id="f_info_li" className="f_Dday"><h3>{diffDayValue}</h3></li>
                                    <li id="f_info_li">마감일 {data.deadline}</li>
                                    <li id="f_info_li">금액 {data.funding.amount}원</li>
                                    <li id="f_info_li">최대 모집 인원 {data.funding.maxParticipants}명</li>
                                    <li id="f_info_li">현재 남은 인원 명{/**funding.max_participants - 참여인원 */}</li>
                                    {isOffline?(<div>
                                        <li id="f_info_li">강의 형태 <b>offline</b></li>
                                        <li id="f_info_li">강의 지역: {data.funding.location}</li>
                                    </div>)
                                    :(<li id="f_info_li">강의 형태 <b>online</b></li>
                                    )}
                                    
                                    <li id="f_info_li">
                                    <h2 style={{color:"#fa6363"}}>달성률 {data.achievementrate}%{/**목표인원/참여인원 */} <BsFire style={{color:"red"}}/></h2>
                                    </li>
                                </ul>

                                <div>
                                </div>

                                <div id="f_info_buttonBox">
                                    <div >
                                        <DoFunding />
                                    </div>
                                    <div id="f_heart_button" onClick={fundingLikeClick}>
                                        {liked ? (<FullHeart size={45}/>):(<EmptyHeart size={45}/>)}
                                                                               
                                    </div>
                                </div>
                                <div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div>{/**버튼 박스 */}
                                
                            </div>
                        </div>
                        <div>
                            {/* <Card/> */}
                            
                        </div>
                    </div>
                    <div id="f_writer_boxes">
                        {isWriter && <div id="f_writer_buttons">
                            <span onClick={fundingStartClick}><StartFunding/></span>
                            <span><UpdateFunding/></span>
                            <span onClick={fundingCancelClick}><CancelFunding/></span>
                        </div>}
                        {isWriter && <div id="f_writer_msg">
                            <h3 id="f_msg_title" style={{paddingLeft:"15px"}}>펀딩 시작하기 &nbsp; <FiAlertTriangle style={{color :"red"}} size={28}/></h3>
                            <div id="f_msg_content" style={{paddingLeft:"15px"}}>펀딩 시작하기 버튼을 클릭시 펀딩이 시작됩니다.<br/>펀딩이 시작되면 내용 수정이 불가능합니다.</div>
                        </div>}
                    </div>
                    <div id="f_height150"></div>
                </div>
                <div id="f_right">{/**오른쪽 */}</div>
            </div>

        </div>
    )
}