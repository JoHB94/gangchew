import  { React,useState } from "react";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import searchList from "../main/css/searchList.css";
import LongCard from "../component/LongCard";


export default function SearchList(){

    const [fundingData, setFundingData] = useState([]);
    const [consumerData, setConsumerData] = useState([]);

    return(
        <div>
            <div id="search_headerarea"></div>
            <div id="search_container">
                <div id="search_side"></div>
                <div id="search_center">
                    <div id="search_height150"></div>
                    <h1>검색 결과</h1><hr/>
                    <div id="search_funding">
                        <div id="search_title">
                            <h3>Funding 게시판 내 검색 결과입니다.</h3>
                        </div>
                        <div id="search_list">
                            <LongCard/>
                        </div>
                        <div id="search_list">
                            <LongCard/>  
                        </div>
                        <div id="search_list">
                            <LongCard/>  
                        </div>
                        <div id="pagination100">
                        {/*------------페이지네이션 위치!!!!-----------*/}
                            <Stack spacing={2}>
                            <Pagination count={3} variant="outlined" shape="rounded" color="secondary" 
                            page={0} onChange={0}/>
                            </Stack>
                        </div>
                    </div>
                    <div>{/**컨슈머 게시판 */}
                        <div id="search_title">
                            <h3>수요자 게시판 내 검색 결과입니다.</h3>
                        </div>
                    </div>
                </div>
                
                <div id="search_side"></div>
            </div>
        </div>
    )
}