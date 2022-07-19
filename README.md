## 프로젝트 소개

- 프로젝트명: 홀홀(HoleHall / Whole)
- 프로젝트 기간 : 2022.07.05 ~ 2022.08.19 (6주)
- 서비스 특징: 연극 뮤지컬에 관심있는 사람들을 위해 공연 정보와 단체 티켓팅을 제공하는 서비스
- **주요 기능**
  - 유저 프로필 관리
  - 검색 기능
  - 연극/뮤지컬 정보 제공
  - 커뮤니티 기능
    - 단체 티켓팅 모집 기능
    - 실시간 채팅 기능
  - 편지 쓰기
- **주요 기술**
  - Single Page Application
  - CSS, SASS, HTML, React
  - SpringBoot, JPA, MySQL
- **참조 리소스**
  - sass-loader: scss 로드 및 컴파일
  - [SpringBoot Docs](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- **배포 환경**
  - URL: // 웹 서비스, 랜딩 페이지, 프로젝트 소개 등의 배포 URL 기입
  - 테스트 계정: // 로그인이 필요한 경우, 사용 가능한 테스트 계정(ID/PW) 기입

## 팀 소개

- 김제관: 팀장, 프론트엔드 개발
- 강승리: 프론트엔드 개발
- 백경원: 프론트엔드 개발
- 임상빈: 프론트엔드 개발
- 이재웅: 백엔드 개발
- 임효정: 백엔드 개발

---

## 회의록

| 날짜                                                                                          | 내용                                         | 비고        |
| ------------------------------------------------------------------------------------------- | ------------------------------------------ | --------- |
| [7월 15일 회의록](https://stingy-vacation-63b.notion.site/7-15-33479317a17b4677befbd874e7cba011) | 핵심 기능 아이디어 회의                              |           |
| [7월 14일 회의록](https://stingy-vacation-63b.notion.site/7-14-0c5dada88e4e4743b626fae152d86439) | 서비스명 / 로고
<br/>공통 프로젝트의 목표                 | 컨설턴트님의 컨펌 |
| [7월 13일 회의록](https://www.notion.so/7-13-929d9c24d6be4fd8ae1b0e37802888ce)                   | Jira, Git-flow, 노션 이용 가이드
<br/>프로젝트 MVP 선정 |           |
| [7월 12일 회의록](https://www.notion.so/7-12-5ed855e2870b40fe8bff7ede478b1769)                   | 아이디어 회의
<br/>스크럼 회의                        | 주제 Fix    |
| [7월 11일 회의록](https://www.notion.so/7-11-b376d36646044c46a7d95849236b4057)                   | 주제 선정
<br/>기능 회의                           |           |
| [7월 7일 ~ 8일 회의록](https://www.notion.so/7-7-8-e1fd4cbd94ad47b8ba68ab20dff90173)              | 프로젝트 아이디어 브레인 스토밍                          |           |
| [7월 6일 아이디어해커톤](https://www.notion.so/7-6-2d24eaab83b647c0a0eb46f5c61c584c)                 | 아이디어 해커톤 참여(짤 큐레이팅 SNS 서비스 ‘짤만짤줍’ 기획)      |           |
| [7월 5일 Webex미팅](https://www.notion.so/7-5-Webex-c7bfc6190a3949dc82de731ed07140f3)           | 트랙 선정 (웹 디자인)                              |           |



## 프로젝트 상세 설명

### 주요 기술

- CI/CD
  - Jenkins
  - Docker
- 서버
  - AWS EC2
- 이슈 /버전 관리
  - GitLab
  - Jira
  - Notion
- 프론트엔드
  - React
  - 상태관리 : Redux
  - 라우팅 : react-router-dom
  - 번들링/컴파일 : webpack / babel
  - 비동기 : Axios
  - 코드 스타일 : prettier → frontend/.prettierrc
  - 문법 검사 : esLint
  - 툴 : react-developer-tools ([](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)[React Developer Tools - Chrome 웹 스토어](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi))
- 백엔드
  - SpringBoot
  - 빌드 : Gradle
  - ORM : JPA
  - DB : MySQL
  - 언어 : Java
  - API명세 : Swagger
  - 테스팅 : Junit
  - 로깅 : SLF4J & LogBack
  - 커넥션 풀 : HikariCP

---

### 기능별 상세 설명

- 유저 프로필 관리
  
  - 로그인
    
    - 서비스 내 회원가입한 회원 로그인 (본인 인증)
    - 소셜 로그인 구현 (카카오)
      - 추가 정보 입력하기
  
  - 회원가입
    
    - 이메일
      - 이메일 인증
    - 비밀번호
      - 8자 이상
      - 비밀번호 재확인
      - 비밀번호 분실시 해당 이메일로 비밀번호 변경 링크 제공
    - 닉네임
      - 한글 2 ~ 10, 영문 2~14, 숫자
      - 길이는 와이어프레임 제작하면서 정하기
      - 중복확인기능
  
  - 회원정보수정
    
    - 비밀번호 변경
    - 닉네임 변경
    - 아이디(이메일) 변경 - 심화 때 고려
  
  - 프로필
    
    - 프로필 이미지(홀홀 캐릭터)
      - 추후 포인트/업적 등으로 캐릭터 꾸미기 - 확장으로
    - 좋아요 누른 히스토리(봤어요, 보고싶어요 목록)
    - 작성한 글, 댓글
    - 팔로우/팔로잉 시스템 - 확장??
  
  - 회원탈퇴

- 검색 기능
  
  - 배우/극장 이름으로 공연 검색
  - 공연
  - 유저 이름 ( @홀홀, @username(트위터) 또는 탭 구분(인스타) )
  - 검색의 결과 (탭 구분 형식으로 진행해도 될 듯 하다)
    1. 공연 정보
    2. 유저 프로필

- 정보 제공
  
  - 공연 정보 제공
    - 검색결과 데이터 (포스터 ,제목 ,공연기간)
    - 기본정보 (공연기간, 장소(지도 연동?), 가격, 시간, 포스터 이미지, 런타임, 공연상태)
    - 리뷰? 평점? (왓챠랑비슷)
    - 롤링페이퍼 작성
    - 봤어요, 보고싶어요 - 회원과 연결
  - 공연 시설 정보 제공
    - 공연장 위치 정보 제공 (기본정보에 포함된 내용)
      - 주변 맛집 정보 제공
    - 사진 로드뷰? - 추후 논의
    - 진행했던/진행중인 공연 정보

- 커뮤니티 기능
  
  - 단체 티켓팅 모집 기능
  - 실시간 채팅 기능

---

### API 구성

### 와이어 프레임

### ERD
![ERD](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/706311e5-855d-4987-8197-7661e3e531d7/%ED%99%80%ED%99%80.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220719%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220719T083735Z&X-Amz-Expires=86400&X-Amz-Signature=802e0480a3f6cbc985de44c15ce5bf8242fc8791b7b0edd70bd7e25846496c21&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25ED%2599%2580%25ED%2599%2580.png%22&x-id=GetObject)
