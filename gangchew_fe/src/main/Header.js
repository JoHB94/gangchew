import * as React from 'react';
import header from '../main/css/header.css'
import TextField from '@mui/material/TextField';


const Header =()=> {
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
                            <input type='text'></input>
                            <button>검색</button>
                        </div>
                        <div id='member'>
                            <div id='container33'><button>로그인</button></div>
                            <div id='container33'><button>알  림</button></div>
                            <div id='container33'><button>프로필</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Header;