## 기술스택

 - NextJS
 - react-hot-toast(toast 구현용)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 구현내용

 - API 호출
 - /coin-list 리다이렉트
 - 상단 탭
 - 검색창&검색 기능
 - 코인 목록 페이지
 - 즐겨찾기 추가&삭제 기능
 - 즐겨찾기 추가&삭제시 토스트 알림 기능
 - 항목별 오름차순&내림차순 기능

## 미구현 & 보완 필요점

 - 값을 직접 변경하지 못하고 state를 통해 변경해야 하는 React 특성상 즐겨찾기&정렬 기능 사용시 버튼이 바로 변경되지 않아 개선 필요함.
 - 마크업에서 일부 정렬 등 CSS 구현이 미진한 점이 있음.
 - 제공받은 기획서에 빠진 부분이 많아(검색 결과 초기화, 여러 정렬 기준을 동시에 적용할지 등) 임의로 구현한 부분이 많음.
 - AI는 초기 화면 마크업에만 Gemini를 활용. 마크업 개선 및 JS 로직 연결은 직접 구현.
