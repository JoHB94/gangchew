import React, { useState, useEffect } from "react";

const UseValidate = (changeValue) => {
  
  const [validText, setValidText] = useState({
    validUsername: "",
    validPassword: "",
    validPasswordCheck: "",
    validFullname: "",
    validNickname: "",
    validEmail: "",
  });
  const [isValid, setIsValid] = useState({
    isUsername: false,
    isPassword: false,
    isPasswordCheck: false,
    isFullname: false,
    isNickname: false,
    isEmail: false,
  });


  const username = changeValue.username;
  const userPassword = changeValue.password;
  const userPasswordCheck = changeValue.passwordCheck;
  const userfullname = changeValue.fullname;
  const userNickname = changeValue.nickname;
  const userEmail = changeValue.email;

  useEffect(() => {
    const usernameReg = /^[a-z0-9]+$/;
    if (username.length === 0) {
      setValidText((prevState) => ({
        ...prevState,
        validUsername: "",
      }));
      setIsValid((prevState) => ({ ...prevState, isUsername: false }));
    } else if (
      !(
        username.length >= 5 &&
        username.length <= 15 &&
        usernameReg.test(username)
      )
    ) {
      setValidText((prevState) => ({
        ...prevState,
        validUsername: "5~15자의 영문 소문자 및 숫자만 가능합니다.",
      }));
      setIsValid((prevState) => ({ ...prevState, isUsername: false }));
    } else {
      setValidText((prevState) => ({ ...prevState, validUsername: "올바른 형식입니다." }));
      setIsValid((prevState) => ({ ...prevState, isUsername: true }));
    }
  }, [changeValue.username, username]);

  useEffect(() => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;

    if (!userPassword || userPassword.length === 0) {
      setValidText((prevState) => ({ ...prevState, validPassword: "" }));
      setIsValid((prevState) => ({ ...prevState, isPassword: false }));
    } else if (!passwordReg.test(userPassword)) {
      setValidText((prevState) => ({
        ...prevState,
        validPassword:
          "10~20자의 영문자, 숫자, 특수문자(!@#$%^*+=-)를 사용해야 합니다.",
      }));
      setIsValid((prevState) => ({ ...prevState, isPassword: false }));
    } else {
      setValidText((prevState) => ({ ...prevState, validPassword: "" }));
      setIsValid((prevState) => ({ ...prevState, isPassword: true }));
    }
  }, [changeValue.password, userPassword]);

  useEffect(() => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,20}$/;

    if (!userPasswordCheck || userPasswordCheck.length === 0) {
      setValidText((prevState) => ({ ...prevState, validPasswordCheck: "" }));
      setIsValid((prevState) => ({ ...prevState, isPasswordCheck: false }));
    } else if (!passwordReg.test(userPasswordCheck)) {
      setValidText((prevState) => ({
        ...prevState,
        validPasswordCheck:
          "10~20자의 영문자, 숫자, 특수문자(!@#$%^*+=-)를 사용해야 합니다.",
      }));
      setIsValid((prevState) => ({ ...prevState, isPasswordCheck: false }));
    } else if (userPasswordCheck !== userPassword) {
      setValidText((prevState) => ({
        ...prevState,
        validPasswordCheck: "비밀번호가 일치하지 않습니다.",
      }));
      setIsValid((prevState) => ({ ...prevState, isPasswordCheck: false }));
    } else {
      setValidText((prevState) => ({ ...prevState, validPasswordCheck: "비밀번호가 일치합니다." }));
      setIsValid((prevState) => ({ ...prevState, isPasswordCheck: true }));
    }
  }, [changeValue.passwordCheck, userPassword, userPasswordCheck]);

  useEffect(() => {
    const fullnameReg = /^[가-힣]{2,4}$/;

    if (userfullname.length === 0) {
      setValidText((prevState) => ({ ...prevState, validFullname: "" }));
      setIsValid((prevState) => ({ ...prevState, isFullname: false }));
    } else if (!fullnameReg.test(userfullname)) {
      setValidText((prevState) => ({
        ...prevState,
        validFullname:
          "2~4자 이내 한글만 입력해주세요. (영문, 특수문자, 숫자 사용불가)",
      }));
      setIsValid((prevState) => ({ ...prevState, isFullname: false }));
    } else {
      setValidText((prevState) => ({ ...prevState, validFullname: "올바른 형식입니다." }));
      setIsValid((prevState) => ({ ...prevState, isFullname: true }));
    }
  }, [changeValue.fullname, userfullname]);

  useEffect(() => {
    const nicknameReg = /^[가-힣a-zA-Z]{2,10}$/;

    if (userNickname.length === 0) {
      setValidText((prevState) => ({ ...prevState, validNickname: "" }));
      setIsValid((prevState) => ({ ...prevState, isNickname: false }));
    } else if (!(nicknameReg.test(userNickname))) {
      setValidText((prevState) => ({
        ...prevState,
        validNickname:
          "닉네임은 최소 2자 이상 10자 이하의 한글 & 영문자로 이루어져야 합니다.",
      }));
      setIsValid((prevState) => ({ ...prevState, isNickname: false }));
    } else {
      setValidText((prevState) => ({ ...prevState, validNickname: "올바른 형식입니다." }));
      setIsValid((prevState) => ({ ...prevState, isNickname: true }));
    }
  }, [changeValue.nickname, userNickname]);

  useEffect(() => {
    const emailReg = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;

    if (userEmail.length === 0) {
      setValidText((prevState) => ({...prevState, validEmail: ""}));
      setIsValid((prevState) => ({...prevState, isEmail: false}));
    } else if (!(emailReg.test(userEmail))){
      setValidText((prevState) => ({...prevState, validEmail: "이메일 형식을 확인해주세요."}));
      setIsValid((prevState) => ({...prevState, isEmail: false}));
    } else {
      setValidText((prevState) => ({...prevState, validEmail: "올바른 형식입니다."}));
      setIsValid((prevState) => ({...prevState, isEmail: true}));
    }
  }, [changeValue.email, userEmail])

  return {
    validText,
    isValid,
  };
};
export default UseValidate;
