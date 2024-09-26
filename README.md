# < FullStack AI 기반 프로젝트 >

<br/><br/>



## <프레임 워크>
**프론트엔드**
- Next.js (typescript)

**백엔드**
- Mongoose, MongoDB

<br/>

## <CSS 라이브러리>
- tailwind

<br/>

## <상태관리 라이브러리>
- Zustand

<br/>

## <기타 라이브러리>
- bcryptjs

<br/>

***

## 회원가입, 로그인
**AuthJS (NextAuth) 사용**
- Credential, Github , Google 로그인 기능

로그인 과정: <br/>
사용자가 로그인하면, authorize 메소드에서 사용자 정보를 반환하고, NextAuth.js는 이 정보를 기반으로 세션을 생성합니다.  <br/>
세션은 서버에서 관리되며, 여기에는 사용자의 ID, 이름, 이메일 등의 정보가 포함됩니다.

쿠키에 저장: <br/>
세션 정보는 클라이언트에 쿠키 형태로 저장됩니다. 이 쿠키는 브라우저에 의해 관리되며, 사용자가 페이지를 새로 고침하거나 다른 페이지로 이동할 때 자동으로 전송됩니다.



***

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
