import React, { useEffect, useState } from 'react';
import searchBar from '../css/searchBar.css';
import {BiSearch} from 'react-icons/bi';

export default function SearchBar(){

    return(
        <div id='searchBar_container'>
            <div style={{width:'16px'}}></div>
            
                <input className='search_input_design' id='search_input' type='search'  placeholder='검색어를 입력해주세요.'></input>
                <button id='search_button' type='submit'>
                    <BiSearch size={20}/>
                </button>
            
            
        </div>
    )
}