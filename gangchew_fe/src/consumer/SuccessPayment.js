import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SuccessPayment(){

    const [token,setToken] = useState('');
    const pg_token = useParams();

    useEffect(()=>{
        setToken(pg_token);
        
    },[pg_token])

    useEffect(()=>{
        if(token !== ''){
            alert('결제가 완료되었습니다.');
        }
    },[token])

    return(
        <div>
            결제 상태??
        </div>
    )
}