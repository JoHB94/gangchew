
import TitleTextFilelds from '../component/inputs/TitleTextFields';
import React, { useState } from 'react';
import fundingCreate from "../funding/css/fundingCreate.css";
import CategorySelect from '../component/inputs/CategorySelect';
import InputDate from '../component/inputs/InputDate';
import InputThumbnail from './InputThumbnail';
import ToastEditor from '../component/inputs/ToastEditor';
import OkButton from '../component/inputs/OkButton';
import CancelButton from '../component/inputs/CancelButton';
import SimpleSlider from '../component/SimpleSlider'

export default function FundingCreate() {

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
    // input 컴포넌트에서 호출할 함수
    const handleInputChange = (key,newValue) => {
        setFunding((prevFunding) => ({
            ...prevFunding,
            [key]: newValue
        }));
        
    };
    
    return (
        <div>
            
            <div id="p_headerarea"></div>{/**헤더에 가려지는 부분 */}
            <div id="projectContainer">
                <div id="left"></div>{/**왼쪽 사이드 */}
                <div id="center">
                    {/* <div id="p_empty350"></div> */}
                    <div id='p_carousel'>
                        <SimpleSlider/>
                    </div>
                    <h1>Project 생성하기</h1>
                    <div id="p_createcontainer">
                        <div id="width30"></div>
                        <div id="projectNote">
                            <div id="pn_title">! 반드시 읽어주세요</div>
                            <div id="pn_content">
                                    작성자는 강사 본인 또는 대리인이며, 플랫폼은 강사의 선정과 자격증명에 관여하지 않습니다. <br/>
                                    허위사실 적발 시 고발을 당할 수 있으며 이는 작성자 본인의 책임입니다. <br/>
                                    또한 한번 펀딩이 시작되면 펀딩글을 수정할 수 없습니다. <br/>
                                    펀딩의 시작은 글을 작성한 후 상세페이지에서 진행할 수 있습니다.<br/>
                            </div>
                            <div id="pn_end"><br/></div>
                        </div>{/**프로젝트 생성하기 설명란 */}
                    </div>
                    <div id="p_empty150"></div>
                    <div id="projectInfo">
                        <h2>Project 이름</h2>
                        <div id="p_infocontainer">
                            <div id='left10'></div>
                            <div id="p_nameInput">
                                <TitleTextFilelds size={85} text={'프로젝트 이름'} name={'title'} handleInputChange={handleInputChange}/>
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
                    <div id="p_empty150"></div>
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
                                <TitleTextFilelds size={25} text={'원'} name={'amount'} handleInputChange={handleInputChange}/>
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
                                <TitleTextFilelds size={25} text={'목표인원'} name={'goal'} handleInputChange={handleInputChange}/> 
                            </div>
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds size={25} text={'최소인원'} name={'min_participants'} handleInputChange={handleInputChange}/>
                            </div>
                            <div id='left10'></div>
                            <div id="p_infocontent">
                                <TitleTextFilelds size={25} text={'최대인원'} name={'max_participants'} handleInputChange={handleInputChange}/>
                            </div>
                        </div>
                        <div id="note_container">
                            <div id="width70"></div>
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
                        <div id="p_empty150"></div>
                    <div id="projectThumbnail">
                        <h2>썸네일</h2>
                        <div id="p_thumbInput">
                            <InputThumbnail name={'thumbnail'} handleInputChange={handleInputChange}/>
                        </div>
                    </div>
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
                        <div id='ok'>
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
        </div>
    )
}