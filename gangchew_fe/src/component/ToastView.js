import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

export default function ToastView({content}) {
  // 마크다운
  // HTML: span태그 글자색을 파란색으로 설정
  const html = content;

  return (
    <div>
      <Viewer initialValue={html} />
    </div>
  );
}