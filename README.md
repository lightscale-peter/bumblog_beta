## BumBlog (개인 Blog 작성 중)

#### 1. 프로그램의 특징

* Node JS기반 풀스텍으로 개발한 개인 블로그 사이트 입니다.<br /> cafe24 nodeJS 호스팅 서비스를 이용하여 배포되어 있습니다.<br /> [확인하기](http://bumblog.cafe24app.com)
* 대표적으로 React / express / mongoDB / TypeScript로 구성되어 있습니다.
* 전 영역 (프론트 + 백엔드) TypeScript로 개발되어 있습니다.
* 배포 시에는 Webpack 번들러를 이용하여 ts->js로 압축 및  변환하여 사용했습니다.

#### 2. 사용 기술

* Front-End
  * React (create-react-app framework)
  * Redux
  * SCSS
  * axios
  * react-router-dom
  
* Back-End
  * express
  * mongoose
  
* DataBase
  * mongoDB 
  
* 기타
  * TypeScript (언어)
  * Webpack (번들링 도구)

#### 3. 실행 방법.

해당 경로에서 npm 모듈을 모두 
 설치 후
 
 * 개발 모드
   * npm run full-start
   * 자동으로 https://localhost:3000 에서 앱 실행
 
 * 배포 모드
   * npm run full-build
   * ./build (프론트), web.js (백엔드) 로 번들링.
   * node web.js 실행 후, https://localhost:8001 에서 앱 확인 가능
 
 
