import  { React,useEffect,useState } from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import searchList from "../main/css/searchList.css";
import LongCard from "../component/LongCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCookie } from '../member/Cookie';


export default function SearchList(){

//**********************************state********************************* */
    const defaultCurrentPage = 1;
    const itemsPerPage = 3;
    const {keyword} = useParams();

    const [fundingData, setFundingData] = useState([]);
    const [consumerData, setConsumerData] = useState([]);
    const [currentFundingPage, setCurrentFundingPage] = useState(defaultCurrentPage);
    const [currentConsumerPage, setCurrentConsumerPage] = useState(defaultCurrentPage);
    
    
//************************************axios ****************************** */
    const cloudIP = ' http://138.2.114.150:9000/';
    const localIP = 'http://localhost:9000/';

    const token = '';

    if (getCookie("jwtToken") === !undefined){
        token = getCookie("jwtToken");
    }

    const axiosInstance = axios.create({
        headers:{
        'Content-Type': 'application/json',
        }
    });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fundingURI = `fundingList?keyword=${keyword}&currentpage=${currentFundingPage}&itemsPerPage=${itemsPerPage}&name=funding`;
    const userURI = `fundingList?keyword=${keyword}&currentpage=${currentFundingPage}&itemsPerPage=${itemsPerPage}&name=user`;

    const fundingReqServer=()=>{
        axiosInstance.get(localIP+fundingURI)
        .then((res)=>{
            setFundingData(res.data.result);
            console.log("funding 조건 조회 완료");
            console.log(res)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const consumerReqServer=()=>{
        axiosInstance.get(localIP+userURI)
        .then((res)=>{
            setConsumerData(res);
            console.log("consumer 조건 조회 완료");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

//*************************************useEffect************************** */
    useEffect(()=>{
        fundingReqServer();
        
    },[])

    useEffect(()=>{
        // consumerReqServer();

    },[])
//**********************************onClick Handler********************** */
    const fundingPageHandler=(event,page)=>{
        setCurrentFundingPage(page);
        console.log(page);
        // fundingReqServer();
    }

    const consumerPageHandler=(event,page)=>{
        setCurrentConsumerPage(page);
        console.log(page);
        // consumerReqServer();
    }


    return(
        <div>
            {console.log(keyword)}
            <div id="search_headerarea"></div>
            <div id="search_container">
                <div id="search_side"></div>
                <div id="search_center">
                    <div id="search_height150"></div>
                    <h1>검색 결과</h1><hr/>
                    <div id="search_funding">

                        <div id="search_title">
                            <h3>Funding 게시판 내 '{keyword}' 검색 결과입니다.</h3>
                        </div>
                        <div>

                        {fundingData && fundingData.length > 0 && fundingData.map((fundingData) => (
                            <div id="search_list"  key={fundingData.fundingId} >
                                <LongCard funding={fundingData}/>
                            </div>
                            ))}
                        
                        </div>
                        <div id="pagination100">
                        {/*------------페이지네이션 위치!!!!-----------*/}
                            <Stack spacing={2}>
                            <Pagination count={3} variant="outlined" shape="rounded" color="secondary" 
                            page={currentFundingPage} onChange={fundingPageHandler}/>
                            </Stack>
                        </div>
                        <div id="search_height150"></div>
                    </div>
                    
                    <div>{/**컨슈머 게시판 */}
                        <div id="search_title">
                            <h3>수요자 게시판 내 검색 결과입니다.</h3>
                        </div>
                        <div id="search_list">
                            {/**수요자 게시판 카드 들어갈 부분 */}
                        </div>
                        <div id="pagination100">
                        {/*------------페이지네이션 위치!!!!-----------*/}
                            <Stack spacing={2}>
                            <Pagination count={3} variant="outlined" shape="rounded" color="secondary" 
                            page={currentConsumerPage} onChange={consumerPageHandler}/>
                            </Stack>
                        </div>
                    </div>
                    <div id="search_height150"></div>
                </div>
                
                <div id="search_side"></div>
            </div>
        </div>
    )
}