import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * name(String) : 객체로 담아야 할 경우, 객체의 key값 부분입니다.
 * handleInputChange(func): 콜백함수 입니다. => 부모 컴포넌트에서 콜백함수 설정해야 함.
 * @param {*} param0 
 * @returns 
 */
const InputDate =({name ,handleInputChange}) => {

    /* 날짜 변경후 출력용 state변수 */
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateFlag, setDateFlag] = useState(false) // 데이트값 변경여부 flag변수

    useEffect(()=> {
      if(dateFlag == true) {
        handleInputChange(name,selectedDate);
        setDateFlag(false); //변경여부 초기화
      }
    }, [dateFlag])

    /**
     * state변경은 이벤트함수 내에서 비동기적으로 처리된다 따라서 flag값을 함께 변경하고
     * 변경 이후에 useEffect를 통해 
     * @param {*} date 
     */
    const handleChange =(date)=> {
      setSelectedDate(date)
      setDateFlag(true)
      // console.log(selectedDate);
    }

    return (
      <span className="custom-datepicker-container">
        <DatePicker
          showIcon
          selected={selectedDate}
          onChange={(date) => handleChange(date)}
        />
      </span>
    );
  };
  export default InputDate;