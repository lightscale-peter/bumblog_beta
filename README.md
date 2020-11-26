## BumBlog - Beta (블로그 사이트)

#### 1. 프로그램의 특징

* Node JS 서버 기반으로 작성된 토이프로젝트 입니다.
* 프론트 : React / 백엔드 : Express / 통신: RESTful API / DB : MongoDB로 되어있습니다.
* 현재 [React + NestJS + GraphQL + Mysql 버전](https://github.com/duracelldog/bumblog/blob/master/README.md)으로 별도 개발중이며 실사용을 목표로 하고 있습니다.
* 전 영역 (프론트 + 백엔드) TypeScript로 개발되어 있습니다.
* 현재 aws ec2 서버를 이용하여 배포되어 있습니다. [확인하기](https://bumblog.net/)
* 배포 시에는 Webpack 번들러를 이용하여 ts -> js로 변환 후 사용했습니다.
* 본인 기여도 100%로 개발되었습니다. (간략한 코드 포트폴리오는 [여기서](https://docs.google.com/presentation/d/1K_wRe0whovbAt0aJoLSoHcVZUKjVxyOsBKXIjpRQOBs/edit?usp=sharing) 확인이 가능합니다.)

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

##### 설치 (sever폴더 별도 설치 필요)

1. cd bumblog
2. npm install
3. cd server
4. npm install
 
##### 실행

 * 개발 모드
   * npm run start:dev
   * 자동으로 https://localhost:3000 에서 앱 실행
 
 * 배포 모드
   * npm run build
   * ./build (프론트), web.js (백엔드) 로 번들링.
   * node web.js 실행 후, https://localhost:8001 에서 앱 확인 가능
   
 * 배포 실행
   * npm start
 
 
