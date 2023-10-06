import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * name(String) : 객체로 담아야 할 경우, 객체의 key값 부분입니다.
 * handleInputChange(func): 콜백함수 입니다. => 부모 컴포넌트에서 콜백함수 설정해야 함.
 * @param {*} param0 
 * @returns 
 */
const InputDate =({name ,handleInputChange}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState('');


    const handleChange =(date)=> {
      const key = name;
      setSelectedDate(date)
      setStartDate(date)
      const newValue = selectedDate;

      handleInputChange(key,newValue);
      // console.log(selectedDate);
    }

    return (
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => handleChange(date)}
      />
    );
  };
  export default InputDate;