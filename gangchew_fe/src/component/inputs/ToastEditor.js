import { useRef } from 'react';

// Toast 에디터
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

/**
 * name(String) : 객체로 담아야 할 경우, 객체의 key값 부분입니다.
 * handleInputChange(func): 콜백함수 입니다. => 부모 컴포넌트에서 콜백함수 설정해야 함.
 * @param {*} param0 
 * @returns 
 */
export default function ToastEditor({name ,handleInputChange}) {
  // Editor DOM 선택용
  const editorRef = useRef();
  
    // 등록 버튼 핸들러
  const handleChange = () => {

    const key = name;
    const newHTML = editorRef.current?.getInstance().getHTML();
    const newMarkdown = editorRef.current?.getInstance().getMarkdown();

    if (newHTML === ''){
        handleInputChange(key,newMarkdown);
    } else {
        handleInputChange(key,newHTML);
    }
    
  };

  return (
    <div>
      <Editor
        initialValue='내용을 입력해 주세요.'
        ref={editorRef} // DOM 선택용 useRef
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="500px" // 에디터 창 높이
        initialEditType="wysiwyg" //
        onChange={handleChange}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock']
        ]}
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
      ></Editor>
      
      
    </div>
  );
}