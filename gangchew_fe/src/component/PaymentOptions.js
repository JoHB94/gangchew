import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Container from "@mui/material/Container";

export default function PaymentOptions({ paymentMethod, handlePaymentMethodChange }) {
  // const [selectedValue, setSelectedValue] = useState(paymentMethod);

  // const handleSelection = (event) => {
  //   setSelectedValue(event.target.value);
  //   handlePaymentMethodChange(event);
  // };

  const handleSelection = (event) => {
    console.log("자식 js {}",event.target.value);
    const newValue = event.target.value;
    handlePaymentMethodChange(newValue);
  };


  return (
    <Container>
      <RadioGroup
        row
        name="paymentMethods"
        value={paymentMethod}
        onChange={handleSelection}
      >
        <FormControlLabel value="creditCard" control={<Radio />} label="신용카드" />
        <FormControlLabel value="bankTransfer" control={<Radio />} label="실시간 계좌 이체" />
        <FormControlLabel value="bankDeposit" control={<Radio />} label="무통장 입금" />
        <FormControlLabel value="mobilePayment" control={<Radio />} label="휴대폰 결제" />
      </RadioGroup>
      <div className="m_PayRadio">
        <RadioGroup name="otherPaymentMethods" value={paymentMethod} onChange={handleSelection}>
          <FormControlLabel value="kakaoPay" control={<Radio />}  />
          <FormControlLabel value="tossPay" control={<Radio />}  />
        </RadioGroup>
      </div>
    </Container>
  );
}

