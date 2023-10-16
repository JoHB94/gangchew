
import TitleTextFilelds from '../component/inputs/TitleTextFields';
import React, { useState, useEffect } from 'react';
import fundingCreate from "../funding/css/fundingCreate.css";
import CategorySelect from '../component/inputs/CategorySelect';
import InputDate from '../component/inputs/InputDate';
import InputThumbnail from './InputThumbnail';
import ToastEditor from '../component/inputs/ToastEditor';
import OkButton from '../component/buttons/OkButton';
import CancelButton from '../component/buttons/CancelButton';
import SimpleSlider from '../component/SimpleSlider'
import {FiAlertTriangle} from "react-icons/fi";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDaumPostcodePopup } from "react-daum-postcode";

import axios from 'axios';
import AddressField from '../component/inputs/AddressField';
import AddressButton from '../component/buttons/AdressButton';

export default function FundingCreate() {

//************************************states**************************************************** */
  
    const [funding, setFunding] = useState({
        title: '',
        subtitle: '',
        category_id: 0,
        writer: '',
        location: '',
        deadline: '',
        goal: 0,
        min_participants: 0,
        max_participants: 0,
        amount: 0,
        thumbnail: '',
        content: ''
    });

//*************************************axios***************************************************** */

    const cloudIP = ' http://138.2.114.150:9000/';
     
    const submit = (e) => {
        axios.post(cloudIP + '/funding/create',funding)
        .then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

//************************************callBack*************************************************** */
    
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key, newValue) => {
        if (key === 'thumbnail' && newValue instanceof File) {
          // 이미지 파일을 base64로 변환
          convertImageToBase64(newValue)
            .then((base64Image) => {
              // base64로 변환된 이미지 데이터를 thumbnail 속성에 할당
              setFunding((prevFunding) => ({
                ...prevFunding,
                thumbnail: base64Image,
              }));
            })
            .catch((error) => {
              console.error('이미지를 base64로 변환하는 중 오류 발생:', error);
            });
        } else {
          // 다른 키의 변경이나 문자열 값의 변경은 그대로 처리
          setFunding((prevFunding) => ({
            ...prevFunding,
            [key]: newValue,
          }));
        }
      };

      // 파일을 base64로 변환하는 도우미 함수
    const convertImageToBase64 = (imageFile) => {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const base64Image = e.target.result;
            resolve(base64Image);
        };
    
        reader.onerror = (error) => {
            reject(error);
        };
    
        reader.readAsDataURL(imageFile);
        });
    };


  

//*******************************daum 주소 API ************************************************** */
        
    const [address, setaddress] = useState("");
    const [isAdressNull, setIsAddressNull] = useState(true);
    const scriptUrl =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl); //open함수 정의

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
        if (data.bname !== "") {
            extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
            extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setaddress(fullAddress); // 주소 데이터 수집
        setFunding((prevFunding) => ({
            ...prevFunding,
            location: fullAddress,
          }));
        setIsAddressNull(false);
    };

//******************************onClick Handler****************************************** */

    //강의 형태 선택을 위한 라디오 버튼 클릭시 호출.
    const handleClick = () => {
        open({ onComplete: handleComplete });
        setIsAddressNull(!isAdressNull);
        setIsAddressNull(!isAdressNull);
        console.log("핸들클릭 동작")
    };

    const offlineClick =()=>{
        setIsAddressNull(false);
    }

    const onlineClick =()=>{
        setFunding((prevFunding) => ({
            ...prevFunding,
            location: '',
          }));
        setaddress('');
        setIsAddressNull(true);
    }
    /* --------- */

    return (
        <div>
            
            <div id="p_headerarea"></div>{/**헤더에 가려지는 부분 */}
            <div id="projectContainer">
                <div id="left"></div>{/**왼쪽 사이드 */}
                <div id="center">
                    {/* <div id="p_empty350"></div> */}
                    <div id='p_carousel'>
                        {/* <SimpleSlider/> */}
                    </div>
                    <h1>Project 생성하기</h1>
                    <div id="p_createcontainer">
                        <div id="width30"></div>
                        <div id="projectNote">
                            <div id="pn_title">
                                <FiAlertTriangle style={{color :"red"}} size={28}/>&nbsp; 반드시 읽어주세요</div>
                            <div id="pn_content">
                                    작성자는 강사 본인 또는 대리인이며, 플랫폼은 강사의 선정과 자격증명에 관여하지 않습니다. <br/>
                                    허위사실 적발 시 고발을 당할 수 있으며 이는 작성자 본인의 책임입니다. <br/>
                                    또한 한번 펀딩이 시작되면 펀딩글을 수정할 수 없습니다. <br/>
                                    펀딩의 시작은 글을 작성한 후 상세페이지에서 진행할 수 있습니다.<br/>
                            </div>
                            <div id="pn_end"><br/></div>
                        </div>{/**프로젝트 생성하기 설명란 */}
                    </div>
                    <hr id='p_hr'></hr>
                    <div id="p_empty150"></div>
                    <div id="projectInfo">
                        <h2>Project 이름</h2>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_nameInput">
                                <TitleTextFilelds  text={'프로젝트 이름'} name={'title'} handleInputChange={handleInputChange} modValue=''/>
                                {/* {console.log(funding.title)} */}
                            </div>
                        </div>
                        <div id="p_note">
                            <div id='note_content'>
                                <br/>
                                프로젝트 이름은 가장 먼 저 눈에 띄는 곳이에요,
                                나의 프로젝트를 대표할 수 있으면서 눈에 띄는 제목을 작성해 보세요!
                                (30자 이내)
                                <br/>&nbsp;
                            </div>
                            
                        </div>{/**프로젝트 이름 설명란 */}
                    </div>
                    <hr id='p_hr'></hr>
                    <div id="p_empty150"></div>
                    <div id="projectInfo">
                        <h2>Subtitle</h2>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_nameInput">
                                <TitleTextFilelds  text={'부 제목'} name={'subtitle'} handleInputChange={handleInputChange} modValue='' multiline={true}/>
                               
                            </div>
                        </div>
                        <div id="p_note">
                            <div id='note_content'>
                                <br/>
                                제목에서 미쳐 설명하지 못했던 부분에 대해 조금 더 자세히 설명해 보세요!<br/>
                                subtitle은 검색 조건에도 해당되는 부분입니다.<br/>
                                (50자 이내)
                                <br/>&nbsp;
                            </div>
                            
                        </div>{/**프로젝트 이름 설명란 */}
                    </div>
                    <hr id='p_hr'></hr>

                    <div id="projectInfo">{/**프로젝트 세부사항 */}
                        
                        <h2>세부 사항</h2>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_infoname">카테고리</div>
                            <div id='left10'></div>
                            <div id="p_infoname">금액</div>
                            <div id='left10'></div>
                            <div id="p_infoname">마감날짜</div>
                        </div>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <CategorySelect name={'category_id'} handleInputChange={handleInputChange}/>
                                {/* {console.log(funding.category_id)} */}
                            </div> 
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds text={'원'} name={'amount'} handleInputChange={handleInputChange} modValue=''/>
                            </div>
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <InputDate name={'deadline'} handleInputChange={handleInputChange}/>
                            </div>
                        </div>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_infoname">목표인원</div>
                            <div id='left10'></div>
                            <div id="p_infoname">최소인원</div>
                            <div id='left10'></div>
                            <div id="p_infoname">최대인원</div>
                        </div>
                        <div id="p_infocontainer">
                            
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds text={'목표인원'} name={'goal'} handleInputChange={handleInputChange} modValue=''/> 
                            </div>
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds text={'최소인원'} name={'min_participants'} handleInputChange={handleInputChange} modValue=''/>
                            </div>
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds text={'최대인원'} name={'max_participants'} handleInputChange={handleInputChange} modValue=''/>
                            </div>
                        </div>
                        <div id='p_infocontainer'>
                            <div id='left10'></div>
                            <div id='p_infoname'>강의 형태</div>
                        </div>
                        <div id='p_infocontainer'>
                            <div id='left10'></div>
                            <div id='p_infoname'>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    defaultValue={"online"}
                                    
                                >
                                    
                                    <FormControlLabel value="online" control={<Radio />} label="온라인" onClick={onlineClick}/>
                                    
                                    <FormControlLabel value="offline" control={<Radio />} label="오프라인" onClick={offlineClick} />
                                </RadioGroup>
                            </FormControl>
                            </div>
                        </div>
                        <div id='p_infocontainer'>
                            
                        </div>
                        <div id="note_container">
                            <div id='left10'></div>
                            <div id="width70">
                                <div id='left10'></div>
                                <div id='p_nameInput'>
                                    {isAdressNull ? (''):(
                                    <div style={{display:"flex" }}>
                                        <AddressField modValue={address}/>
                                        <span onClick={handleClick} style={{height:"100%"}}>
                                            <AddressButton/>                                        
                                        </span>                                      
                                    </div>
                                    )}
                                    
                                </div>
                                
                            </div>
                            <div id="p_note">
                                <div id='note_content'>
                                    <br/>
                                    마감 날짜까지 최소인원 미 달성시 펀딩에 실패하게 됩니다. 
                                    목표인원은 달성률 산정의 기준이 되며, 최소인원보다 적을 수 없습니다. 
                                    최대 인원은 목표인원보다 커야 합니다.
                                    마감 시각은 마감날짜의 24시 입니다.
                                    <br/>&nbsp;
                                </div>
                            </div>
                            </div>  
                        </div>
                        <hr id='p_hr'></hr>
                        <div id="p_empty150"></div>
                    <div id="projectThumbnail">
                        <h2>썸네일</h2>
                        <div id="p_thumbInput">
                            <InputThumbnail name={'thumbnail'} handleInputChange={handleInputChange}/>
                        </div>
                    </div>
                    <hr id='p_hr'></hr>
                    <div id="p_empty150"></div>
                    <div id="projectContent">
                        
                        <div id="note_container">
                            <div id="width70"></div>
                            <div id="p_note">
                                <div id='note_content'>
                                    <br/>
                                    내용 설명에는 커리큘럼과 강의 실제 강의 정보 등 구체적인 사안이 들어가야 합니다.<br/>
                                    *Tip<br/>
                                    1.강사 자신을 소개할 수 있는 자격 증명 또는 이력사항<br/>
                                    2.강의 커리큘럼과 진행 방식에 대한 소개<br/>
                                    3.간단한 자기소개
                                    <br/>&nbsp;
                                </div>
                            </div>
                            
                        </div>
                        <h2>내용 설명</h2>
                        <div id="p_editor">
                            {/**toastUIEditor 들어갈 곳 */}
                            <ToastEditor name={'content'} handleInputChange={handleInputChange}/>
                            
                        </div>

                    </div>
                    <div id="p_empty150"></div>
                    <div id="projectButton">
                        <div id='ok' onClick={submit}>
                            <OkButton/>                       
                        </div>
                        <div>
                            <CancelButton/>
                        </div>                       
                    </div>
                    <div id="p_empty150"></div>
                </div>
                <div id="right"></div>{/**오른쪽 사이드 */}
            </div>
            {console.log(funding)}
            {console.log(isAdressNull)}
        </div>
    )
}