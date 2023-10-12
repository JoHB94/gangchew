import React from "react";
import styled from "styled-components";

export const SlideItem = styled.div`
  opacity: 1;
  transform: scale(0.7, 0.6);
`;

export const SlideContainer = styled.div`
  .center {
    transform: scale(0.7) translateX(-21.3%);
}

  .slick-initialized {
    display: grid;
    float: left;
    width: 100%;
    height: 100%;
    border: 1px solid black;

  }

.center .slick-center ${SlideItem} {
    /* center 모드일때 center에게 강조할 경우 사용 */
    opacity: 1;
    transform: scale(0.8);
  }
  .center ${SlideItem} {
    /* center 모드일때 center 외 속성에게 사용 */
    transition: all 500ms ease;
  }
`;