# week1-1 과제 : Todo List App

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">

## 실행방법

```
npm i
npm start
```

## 프로젝트 설명

### 1. 로그인 회원가입

- `/` 경로에서 로그인, 회원가입을 할수있다
- 이메일과 비밀번호의 유효성 검사
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 `/todo` 경로로 이동
- 로그인 여부에 따른 리다이렉트 처리

### 2. 투두 리스트

- `/todo` 경로에 접속하면 투두 리스트의 목록을 볼 수 있다
- 리스트 페이지에는 투두 리스트의 내용과 완료 여부가 표시
- 리스트 페이지에는 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가
- 투두 리스트의 수정, 삭제기능

## 데모 영상

https://drive.google.com/file/d/1YZu8AURAc06dsddPaC3t8DMP87x8LycA/view?usp=sharing

---

## 🙋‍♀️ Best Practice

### 1. 컴포넌트의 폴더명과 파일명 동일시

→ 각 컴포넌트별로 import 편의를 위해 파일명을 모두 `index.jsx` 로 사용했지만, 더 직관적으로 눈에 잘 띄게 하고, 컴포넌트의 역할과 책임에 대해 명확히 하기 위해서 폴더명과 파일명을 일치 시켰다.

### 2. input 성능 최적화

→ input 부분의 성능 최적화를 위해 useInput custom hook을 만들고, `useCallback()`을 사용한다. 자동으로 리액트가 캐시해서 만약 반복 호출 되어도 동일한 콜백함수를 전달한다.

### 3. 별도의 관리 파일 생성

→ 재사용과 수정 등에 용이하게 할 수 있도록 별도의 관리 파일을 생성하여 import하여 사용한다.

- 조건에 따른 alert 메세지 관리 파일(`getMessage.js`)
- 경로와 라우트 관리 파일(`constant.js`)

### 4. 사용자 편의(UI, UX)

→ 사용자가 앱을 사용할때 안정적이고 자연스럽게 느낄수 있게 한다.

- 회원가입시 조건에 맞지 않을때 에러메시지 띄우기
- 모든 input 부분에 focus 주기
- 생성하지 않은 경로로 이동시 not found 페이지 보여짐

---

## 협업 - 커밋 컨벤션

```
- type : 어떤 의도로 커밋했는지를 type에 명시한다. (type: 뒤의 스페이스바는 한번이다.)
- subject : 최대 50글자가 넘지 않도록 하고 마침표는 찍지 않는다. 제목의 처음은 동사 원형으로 시작한다.
- body : 긴 설명이 필요한 경우에 작성한다. 어떻게 했는지가 아니라, 무엇을 왜 했는지를 작성한다. 최대 75자를 넘기지 않도록 한다.

ex)
Feat: 추가 로그인 함수

로그인 API 개발
```

\*주의사항 : body를 쓸때 윈도우 환경에서는 cmd가 아닌 git bash 사용

---

## 협업 - ESLint, Prettier, Git Hook

하나의 프로젝트에서 작업자마다 각자 다른 코딩 스타일을 가지고 있기 때문에 코딩 스타일 자동화 툴이 필요하다.

### ESLint

일관되고 버그를 피할수 있는 코드를 짜기위해서 만들어진 코드 분석 툴이다. 설정 커스터마이징을 허용해주기 때문에 필요한 규칙들을 커스텀해서 적용가능하다.

### Prettier

코드 포맷팅 툴로 포맷팅 룰을 커스터마이징할 수 있다.

### Git Hook

commit된 코드는 무조건 formatting이 완료되어야 하고, push된 코드는 무조건 eslint가 pass된 상태에서 push가 되도록 자동화를 구축해야 한다.
<br>
git hook을 도입하여 git에서 특정 이벤트 발생하기 전, 후로 특정 hook 동작을 실행할 수 있게 한다.
<br>
git hook 설정을 도와주는 npm package인 \***\*Husky\*\***를 통해서 pre-commit, pre-push hook이 설정 가능하다.

---

## 협업 - React template 규칙

- eslint, prettier, husky install
- 최적화를 위한 onChange 사용시 useCallbback() & 자식컴포로 보내주는 함수: 부모컴포에서 반드시 useCallback()처리
- React router사용시 app.js와 분리
- 경로 등 반복되는 코드의 관리파일 별도로 분리
- CRA사용시 public>index.html 제외 모두 지우기 / src>app.js, index.js 제외 모두 지우기
