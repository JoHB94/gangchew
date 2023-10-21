import React, { useState } from 'react';
import searchBar from '../css/searchBar.css';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
    const [keyword, setKeyword] = useState('');

    const getKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearch = () => {
        // URL을 동적으로 생성하고 페이지 이동
        window.location.href = `/searchlist/${keyword}`;
    }

    const handleKeyPress = (e) => {
        // Enter 키를 누를 때 검색 페이지로 이동
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div id='searchBar_container'>
            <div style={{ width: '16px' }}></div>
            <input
                className='search_input_design'
                id='search_input'
                type='text'
                placeholder='검색어를 입력해주세요.'
                onChange={getKeyword}
                onKeyDown={handleKeyPress}
                
            />
            <button
                id='search_button'
                onClick={handleSearch}
            >
                <BiSearch size={20} />
            </button>
        </div>
    )
}
