## BumBlog (개인 Blog 작성 중)

#### 1. 프로그램의 특징

* Node JS 기반으로 작성된 개인 블로그 입니다.
* 현재 게시판 CRUD(생성, 읽기, 수정, 삭제)가 구현되어 있으며, 로그인 기능 추가 구현 중에 있습니다.
* 프론트 : React / 백엔드 : Express / DB : MongoDB로 되어있습니다.
* 전 영역 (프론트 + 백엔드) TypeScript로 개발되어 있습니다.
* heroku nodeJS 호스팅 서비스를 이용하여 배포되어 있어 접속이 가능합니다. [확인하기](https://beomblog.herokuapp.com/)
* 배포 시에는 Webpack 번들러를 이용하여 ts -> js로 변환 후 사용했습니다.
* 전 영역 기여도 100%로 개발했습니다.

#### 2. 사용 기술

##### Front-End
* React (create-react-app framework)
* Redux
* SCSS
* axios
* react-router-dom
  
##### Back-End
* express
* mongoose
  
##### DataBase
* mongoDB 
  
##### 기타
* TypeScript (언어)
* Webpack (번들링 도구)

#### 3. 실행 방법.

npm 모듈을 모두 설치 후 npm run dev:start <br />
(server module의 경우 별도로 설치가 필요합니다)

##### 설치 

1. cd bumblog
2. npm install
3. cd server
4. npm install
 
##### 실행

 * 개발 모드
   * npm run dev:start
   * 자동으로 https://localhost:3000 에서 앱 실행
 
 * 배포 모드
   * npm run dev:build
   * ./build (프론트), web.js (백엔드) 로 번들링.
   * node web.js 실행 후, https://localhost:8001 에서 앱 확인 가능
   
 * 배포 실행 (heroku 호스팅용)
   * npm start
 
 
