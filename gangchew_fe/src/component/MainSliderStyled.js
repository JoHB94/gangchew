import React from "react";
import styled from "styled-components";

export const SlideItem = styled.div`
  opacity: 1;
  transform: scale(0.78, 0.74);
`;

export const SlideContainer = styled.div`
  .center {
    /* 슬라이더 폼 스캐일 및 위치 물리적 조정 */
    
    transform: scale(0.83) translateX(-10.2%);
}

  .slick-initialized {
    
    /* 슬라이더 간 간격 조정 */
    margin-top: -20px;
    margin-bottom: 120px;

    display: grid;
    width: 100%;
    height: 100%;

    
    border: 1px solid black;
    
  }

  /* center 모드일때 center에게 강조할 경우 사용 */
.center .slick-center ${SlideItem} {
    opacity: 1;
    transform: scale(0.89);
  }

  /* center 모드일때 center 외 속성에게 사용 */
  .center ${SlideItem} {
    transition: all 500ms ease;
  }
`;