import React from "react";
import { Link } from "react-router-dom";

const PaginationBtn = () => {
    
    return(
        <div>
            <span><a>{"<<"}</a>&nbsp;&nbsp; </span>
            <span> {"<"}&nbsp;&nbsp; </span>
            
            <span>page &nbsp;&nbsp;</span>
            
            <span> {">"}&nbsp;&nbsp; </span>
            <span> {">>"}&nbsp;&nbsp; </span>
        </div>
    )

}
export default PaginationBtn;