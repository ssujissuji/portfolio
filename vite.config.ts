import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 프로젝트 사이트(https://ssujissuji.github.io/portfolio/)에
// 배포되므로 base를 저장소 이름 하위 경로로 설정한다.
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
});
