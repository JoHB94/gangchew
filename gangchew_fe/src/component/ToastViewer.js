import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';

export default function ToastViewer({content}) {
  // 마크다운
  // HTML: span태그 글자색을 파란색으로 설정
  const [html,setHtml] = useState('');
 
  const [show, setShow] = useState(false);
  console.log(content);

  useEffect(()=>{
    if(content){
      setShow(true);
    } else {
      setShow(!show);
      setShow(!show);
    }
  },[])

  useEffect(()=>{
    setHtml(content);
    
  },[show])

  return (
    <div>
      {console.log("렌더시" + show)}
      {show && <Viewer initialValue={html} />}
    </div>
  );
}

