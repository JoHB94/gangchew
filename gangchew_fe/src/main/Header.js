import * as React from 'react';
import header from '../main/css/header.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import MessageBadge from '../component/MessageBadge';
import {CgProfile} from 'react-icons/cg';
import {BiSearch} from 'react-icons/bi';
import SearchBar from '../component/inputs/SearchBar';
import MessageDrop from './MessageDrop';


const Header =()=> {

    const [login, setLogin] = useState(false);

    if (window.location.pathname === '/login' || 
    window.location.pathname === '/selectRegistration' ||
    window.location.pathname === '/registration') 
    return null;
    
    return (
        <div>
            <div id ="scroll_wrapper">
                <div id='container80'>
                    <div id='container_left'>
                        <div id='h_title'>
                            <h2 id='h_h2'>GangChew</h2>
                        </div>
                        
                        <ul id='list'>
                            <li id='container33'>펀딩list</li>
                            <li id='container33'>펀딩작성</li>
                            <li id='container33'>요청list</li>
                        </ul>
                        
                    </div>
                    <div id='container_right'>
                        <div id='search'>                      
                            <SearchBar/>
                        </div>
                        <div id='member'>
                            <div id='container33'>
                                {login?('로그아웃'):('로그인')}
                            </div>
                            <div id='container33'>
                                <MessageDrop/>
                            </div>
                            <div id='container33'>
                                <CgProfile size={32}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Header;