[![Typing SVG](https://readme-typing-svg.demolab.com?font=Poppins&weight=900&size=46&pause=1000&color=F7D511&vCenter=true&width=435&lines=pikapick+photo)](https://git.io/typing-svg)

> 2024.11.15 - 12.09
> 코드잇 스프린트 풀스택 2기 중급 프로젝트 2팀 (Backend)</br>
> [Frontend Github 바로가기 🔗](https://github.com/2-FavoritePhoto-2/2-FavoritePhoto-2-FE)

_~~(협업 문서 링크: 노션- 어떤 페이지 넣을지 고민 중)
(프로젝트 소개)~~_

</br>

## 🛠️ 기술스택

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)

![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=green"> <img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=PM2&logoColor=green"> <img src="https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=Render&logoColor=green">

![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white) ![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ...etc

</br>

## 💁 구성원

|                       김영은                       |                     이동훈                     |                                 강명곤                                 |
| :------------------------------------------------: | :--------------------------------------------: | :--------------------------------------------------------------------: |
|     ![imgur](https://i.imgur.com/lVepEn6.png)      |    ![imgur](https://imgur.com/sPgtNAy.png)     | <img src="https://i.imgur.com/UtZDvAf.png"  width="100" height="100"/> |
| [Maybeiley's Github](https://github.com/Maybeiley) | [ciin1411 Github](https://github.com/ciin1411) |              [GGON123 Github](https://github.com/GGON123)              |

김영은

- 프로젝트 폴더 아키텍쳐 및 기초 세팅
- AWS 및 Render 서버 배포 관리

이동훈

- 유저 기반 조회 기능 및 카드 생성

강명곤

- 교환 관련 제안, 승인, 거절, 취소 기능
- 포인트 관련 랜덤 포인트 획득, 마지막으로 뽑은 시간 조회, 포인트 로그 조회 기능

</br>

## 📋 팀원별 구현 기능 상세

### 김영은

- 인증 및 인가, 판매 관련 CRUD, 알림

`인증 관련 기능`
<details>
<summary>회원가입</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>로그인</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>토큰 재발급</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

`알림 관련 기능`
<details>
<summary>알림 전체 조회</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>알림 수정</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

`판매 관련 기능`
<details>
<summary>판매 전체 조회</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>판매 상세 조회</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>판매 생성</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>판매 수정</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>판매 취소</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

<details>
<summary>구매</summary>

- 기능 : 
- Response : 
- 구현
  - Controller
  - Service
  - Repository
  </details>

</br>

### 이동훈

<details>
<summary>프로필 조회</summary>

- 기능 : 로그인한 유저의 프로필 정보를 조회합니다.
- Response : 닉네임, 보유 포인트
- 구현
  - Controller
    1. `req.auth.userId`를 통해 사용자 ID를 가져옵니다.
    2. 서비스에서 프로필 정보를 요청합니다.
    3. Response에 닉네임과 포인트를 JSON 형식으로 반환합니다.
  - Service
    1. `UserRepository.getUserId` 호출하여 유저 데이터를 가져옵니다.
    2. 닉네임과 포인트만 반환하도록 데이터를 가공합니다.
  - Repository 1. 데이터베이스에서 사용자 ID로 유저 정보를 조회합니다.
  </details>

<details>
<summary>유저 포켓몬 카드 전체 조회</summary>

- 기능 : 유저가 소유한 모든 포켓몬 카드를 페이지네이션 및 필터링 옵션과 함께 조회합니다.
- Response : 카드 목록, 전체 카드 수
- 구현
  - Controller
    1. 쿼리 매개변수(page, pageSize, orderBy, grade, type,)를 받아옵니다.
    2. 서비스를 통해 필터링된 카드 목록과 개수를 요청합니다.
  - Service
    1. 페이지네이션및 정렬기준 설정
    2. 검색조건 구성
    3. `UserRepository.getUserPhotoCards`를 호출하여 데이터 반환
  - Repository 1. 카드 목록 및 전체 개수를 조회. 2. 조건에 맞는 카드 목록과 총 개수를 반환
  </details>

<details>
<summary>카드 상세 조회</summary>

- 기능 : 특정 포토카드의 세부 정보를 조회합니다.
- Response : 카드 ID, 이름, 가격, 등급, 타입, 이미지, 수량
- 구현
  - Controller
    1. 매개변수 `cardId`와 `req.auth.userId`를 사용
    2. 서비스에서 카드 세부 정보를 요청
    3. 세부 정보를 JSON 형식으로 반환
  - Service
    1. `UserRepository.getPhotoCardDetails`를 호출하여 카드 정보를 가져옵니다.
  - Repository 1. 사용자 ID와 카드 ID를 기반으로 데이터베이스에서 카드 정보를 조회
  </details>

<details>
<summary>거래 목록 조회</summary>

- 기능 : 특정 상점에서 진행 중인 거래 목록을 로그인중인 유저의 기준에 맞게 조회 합니다
- Response : 구매자 또는 판매자 관점에 맞는 거래 세부 정보
- 구현
  - Controller
    1. 매개변수 `shopID`와 `req.auth.userId`를 사용
    2. 서비스를 통해 거래 목록을 요청
    3. JSON 형식으로 반환
  - Service
    1. `UserRepository.getExchangesByShopId` 호출
    2. 사용자 관점에 따라 데이터 가공
  - Repository 1. 상점 ID와 진행 상태를 조건으로 거래 목록을 조회 2. 구매자 또는 판매자 정보를 포함하여 반환
  </details>

<details>
<summary>판매 중인 카드 조회</summary>

- 기능 : 유저가 판매 중인 카드와 거래 중인 카드를 조회합니다.
- Response : 카드 목록(판매, 교환 구분), 총 카드 개수
- 구현
  - Controller
    1. 쿼리 매개변수(page, pageSize, keyword, grade, type, available, mode)를 가져옵니다.
    2. 서비스를 통해 데이터 요청
    3. JSON 형식으로 반환
  - Service
    1. `UserRepository.getMyShopCards`와 `UserRepository.getMyExchangeCards` 호출.
    2. mode에 따라 판매 카드, 교환 카드, 또는 전체 데이터를 병합.
    3. 기본 최신순으로 정렬 후 페이지네이션 처리.
  - Repository 1. 판매 정보는 `Shop` 모델에서, 교환 정보는 `Exchange`모델에서 조회 2. 조건에 따라 카드 정보를 필터링하고 데이터 반환
  </details>

<details>
<summary>카드 생성</summary>

- 기능 : 새로운 포켓몬 카드를 생성합니다.
- Response : 생성된 카드의 세부 정보
- 구현
  - Controller
    1. `req.auth.userId`로 소유자 ID 확인
    2. 데이터 유효성 검사
       - 이미지 파일 확인
       - `type` 필드를 JSON 배열로 파싱
       - 데이터 유효성은 `CardStruct`로 검증
    3. 유효성 통과시, 서비스를 통해 카드 생성 요청
    4. 생성된 카드 정보를 반환
  - Service
    1. `UserRepository.createPhotoCard`호출
  - Repository 1. Prisma를 통해 데이터베이스에 카드 정보 생성
  </details>

</br>

### 강명곤

`교환 관련 기능`

<details>
<summary>교환 제안 생성</summary>
  
- 기능 : 상점에 판매 등록된 카드를 대상으로 소유한 카드 한 장과 교환 제안
- Response : 생성된 교환 제안 정보
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 교환 제안에 필요한 정보를 req.body에서 추출
    3. 요청 데이터가 유효한지 검사
    4. 서비스에서 교환 제안 생성 호출
  - Service
    1. 교환 제안을 생성할 수 있는지 확인
      - 교환 제안을 받은 상점의 카드 수량 확인
      - 구매자의 카드 정보 및 수량 확인
      - 교환 제안한 카드의 소유주 확인
      - 교환 제안한 유저의 권한 확인
    2. 요청받은 데이터를 바탕으로 교환 제안을 처리
      - 구매자가 제시한 카드의 수량 1 감소
      - 교환 제안을 `complete = false`(대기중) 상태로 생성
    4. 교환 제안 알림을 판매자에게 전송
  - Repository 
    1. 교환 제안 데이터로 교환 제안 생성
</details>

<details>
<summary>교환 제안 승인</summary>
  
- 기능 : 판매자는 교환 제안을 승인
- Response : 승인된 교환 제안 정보
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 교환 제안 ID를 `req.params`에서 추출
    3. 서비스에 교환 승인을 호출
  - Service
    1. 교환 제안을 승인 가능한 상태인지 확인
    - 교환 제안 상태 확인
    - 판매자 승인 권한 확인
    - 상점에 등록된 카드 남은 수량 확인
    - 판매자, 구매자 교환 대상 카드 정보 확인
    2. 교환 제안 승인 처리
    - 상점에 등록된 카드 수량 1 감소(교환 후 0이면 available를 false로 업데이트)
    - 판매자와 구매자에게 교환한 카드를 새로 생성
    - 교환 상태(complete) true로 업데이트
    3. 교환 승인 알림을 양쪽 사용자에게 전송
  - Repository 
    1. 교환 대상 카드와 제시 카드의 정보를 토대로 교환한 카드를 새로 생성 후 반환
</details>

<details>
<summary>교환 제안 거절</summary>
  
- 기능 : 판매자는 교환 제안을 거절
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 교환 제안 ID를 `req.params`에서 추출
    3. 서비스에 교환 거절을 호출
  - Service
    1. 교환 요청이 거절 가능한 상태인지 확인
    - 교환 제안 상태(존재, 승인) 확인
    - 판매자 거절 권한 확인
    2. 교환 제안 거절 처리
    - 교환 제안 생성 시 감소된 구매자 카드 수량 복원
    - 교환 제안을 삭제
    3. 교환 거절 알림을 구매자에게 전송
  - Repository 
    1. 구매자 카드 수량 1 증가 및 교환 제안 삭제
</details>

<details>
<summary>교환 제안 취소</summary>
  
- 기능 : 구매자는 교환 제안을 취소
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 교환 제안 ID를 `req.params`에서 추출
    3. 서비스에 교환 취소을 호출
  - Service
    1. 교환 요청이 취소 가능한 상태인지 확인
    - 교환 제안 상태(존재, 승인) 확인
    - 구매자 취소 권한 확인
    2. 교환 제안 취소 처리
    - 교환 제안 생성 시 감소된 구매자 카드 수량 복원
    - 교환 제안을 삭제
    3. 교환 취소 알림을 판매자에게 전송
  - Repository 
    1. 구매자 카드 수량 1 증가 및 교환 제안 삭제
</details>

`포인트 관련 기능`

<details>
<summary>랜덤 포인트 획득</summary>
  
- 기능 : 랜덤 포인트를 획득 및 적립 후 포인트 로그 생성
- Response : 뽑은 랜덤 포인트
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 서비스에 랜덤 포인트 획득 기능을 호출
  - Service
    1. 랜덤 포인트를 1시간 이내에 뽑았는지 확인
    - 사용자 마지막 랜덤 포인트 획득 시간 조회
    - 1시간이 지나지 않았다면 오류 반환
    2. 랜덤 포인트(1~20) 뽑기
    3. 생성된 랜덤 포인트를 사용자에게 적립 및 마지막 뽑은 시간 업데이트
    4. 획득 포인트 로그 생성
  - Repository 
    1. 사용자 포인트 및 마지막 뽑은 시간 업데이트
    2. 포인트 획득 로그 저장
</details>

<details>
<summary>마지막 랜덤 포인트 뽑은 시간 조회</summary>
  
- 기능 : 마지막 랜덤 포인트 획득 시간 조회
- Response : 마지막 랜덤 포인트 획득 시간
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. 서비스에 마지막 랜덤 포인트 획득 시간 조회 호출
  - Service
    1. 사용자의 `userId`를 통해 마지막 포인트 획득 시간 조회
  - Repository 
    1. `user`의 `lastDrawTime`을 조회 후 반환
</details>

<details>
<summary>유저의 포인트 로그 조회</summary>
  
- 기능 : 유저의 포인트 로그 조회
- Response : 유저의 포인트 로그 목록
- 구현
  - Controller
    1. `req.auth.userId`를 통해 요청을 보내는 사용자의 ID를 추출
    2. `req.query`를 통해 `startDate, endDate, action, page, limit, order`을 추출
    3. 서비스에 포인트 로그 조회 호출
  - Service
    1. 필터링 조건을 설정하고, 페이지네이션 및 정렬 옵션을 처리
      - `startDate, endDate`를 통해 기간별 필터링(KST(한국표준시) ↔ UTC 변환)
      - `action`을 통해 `INITIAL_POINT, PURCHASE, SALE, RANDOM_REWARD`을 필터링
      - `page, limit`을 통해 페이지네이션 처리
      - `order`을 통해 정렬 옵션 처리
  - Repository 
    1. 필터 조건에 맞는 로그를 반환
    2. 총 로그 개수와 페이지 데이터 반환
</details>

</br>

## ⚓️ 백엔드 전략

<details>
  <summary>개발 환경 관리 전략</summary>

  **`ESLint (eslint-config-airbnb 라이브러리)` `Prettier` `nvm(Node Version Manager)` 활용**

  - Prettier가 코드 스타일을 일관적으로 정리해 줌과 동시에 ESLint가 코딩 규칙을 강제하고, 잠재적 버그를 사전에 발견하여 전체적으로 코드 품질과 스타일의 일관성을 유지할 수 있었습니다.
  - ESLint 설정을 위해 여러 유명 라이브러리를 찾아봤는데 대표적인 가이드 중 Google의 경우 간결하지만 JavaScript 프로젝트보다는 전체 언어에 대한 일반 규칙에 중점을 두는 편이라고 하여, JS나 TS 환경에 더 특화되어 있는 Airbnb로 선택하게 되었습니다. Airbnb 스타일 가이드는 명확한 규칙과 협업 친화성을 제공하며, 기본 ESLint 규칙보다 엄격하여 가독성과 유지보수성을 높였습니다.
  - 또, 팀 내에서 Node.js 버전 간 충돌이나 호환성 문제를 방지하고 프로젝트를 쉽게 관리할 수 있도록 nvm를 활용했는데, 처음 사용해보는 팀원들도 간단하게 설치하고 적용할 수 있어 편리했습니다.
</details>

<details>
  <summary>데이터베이스 설계 전략</summary>

  **`PostgreSQL` `Prisma` 활용**

- 이번 프로젝트의 복잡하고 다양한 관계성 데이터를 처리하기 위해서 PostgreSQL과 Prisma를 활용했습니다.
- MySQL이나 SQLite 등이 PostgreSQL 보다 조금 더 적용하는데 쉬울 수도 있지만, 코드잇 스프린트 강의에서 학습하기도 했고 PostgreSQL이 훨씬 복잡한 데이터 타입이나 고급 쿼리도 지원하여 이번 프로젝트에서 활용하면서 더 자세히 알아보고 싶어서 채택하게 되었습니다. 제공하는 다양한 고급 기능을 이번에 많이 활용하지는 못했지만, 좀 더 깊이 배울 수 있었습니다.
- Prisma 역시 강의에서 학습한 ORM이여서 채택하기도 했지만, 특히 이번 프로젝트를 TypeScript로 작성하기로 결정하면서 TypeScript와의 높은 호환성 덕분에 코드를 작성하기 편리했습니다.
</details>

<details>
  <summary>파일 저장 관리 전략</summary>

  **`Multer / Multer-S3` `AWS S3` 활용**

- 포토카드를 판매하는 서비스를 구현하면서 이미지 파일을 업로드하는 것이 가장 중요한 기능 중 하나였습니다. 파일 업로드와 저장소에 대해 고민을 많이 했는데, 결과적으로 Express 기반으로 간단하게 파일을 업로드 처리를 할 수 있는 라이브러리인 Multer와 AWS S3를 연결했습니다.
- AWS 배포를 목표로 하고 있었기 때문에 클라우드 저장소는 애초에 S3 버킷을 염두에 두고 있었습니다. EC2 인스턴스의 스토리지를 직접 사용할 경우, 업로드 파일이 많아지면 과도한 스토리지 사용으로 과금이 급격하게 늘 수 있어, S3에 파일을 분산 저장하는 방식을 채택했습니다. 또 EC2와의 안전한 액세스 접근을 설정하여 파일을 관리하는데 효과적이었습니다.
</details>

<details>
  <summary>API 문서화 전략</summary>

  **`Notion` `Swagger-UI-Express` 활용**

- 지난 초급 프로젝트 후에 프로젝트를 시작할 때 제일 먼저 API 문서를 작업하는 것이 좋을 것 같다고 생각하여 서비스 기획 및 요구사항을 분석하여 Notion에 테이블로 정리했습니다. 프로젝트 초반부터 프론트엔드와의 협업 시 API 명세를 공유하면서, 서로 요구사항을 체크하고 설명할 수 있어 편리했습니다. 
- 다만 테이블로 정리하는 데에 한계가 있고 리소스나 시간도 많이 들었고, 이후 Swagger를 도입하여 프론트엔드 팀원들이 각 API에 대한 정보를 더 쉽게 접근할 수 있어 의존도를 낮추고 개발 속도를 높일 수 있도록 했습니다.
</details>

<details>
  <summary>배포 및 운영 전략</summary>

  **`Render` `AWS (EC2, RDS, S3)` `Nginx` `PM2` 활용**

- 개발 초중반에는 1차 배포 서버로 Render를 활용하고, 이후 AWS로 최종 배포했습니다. Render는 간단하게 서비스와 데이터베이스를 배포하고 연결할 수 있어, 개발을 한창 진행 중인 상황에서 dev 브랜치로 자동 배포하도록 설정하여 기능 개발 및 테스트를 진행하는 데 효율적이었습니다.
- 실제 Production 배포는 AWS로 진행하면서 직접 서버 호스팅부터 스토리지, 데이터베이스를 설정하고 연동하며 배포와 운영에 대해 자세히 배울 수 있었습니다. AWS에서 제공하는 다양한 옵션으로 배포 환경을 구성하고 실무에 가까운 서비스 배포 경험을 쌓았습니다.
- 배포 후에는 Nginx를 Reverse Proxy를 설정하여, 쿠키 사용 및 CORS 문제를 방지하기 위해 프론트엔드와 백엔드 요청을 하나의 도메인에서 처리할 수 있도록 했습니다.
</details>

<details>
  <summary>브랜치 전략</summary>

  **`main` - `dev` - `feat` 브랜치로 구성**

  - main 브랜치 : 개발 배포 후 테스트를 거쳐 안정적인 버전만 관리하여, 최종 배포용으로 신뢰할 수 있는 프로덕션 환경을 만들었습니다.
  - dev 브랜치 : 기능 통합과 테스트를 위한 브랜치입니다. render로 개발용으로 실시간 업데이트하여 프론트엔드의 원활한 작업을 돕고, 개발 환경에서 전체 흐름을 점검할 수 있었습니다. 
  - feat 브랜치 : 세부 기능 구현 및 수정 작업을 개별적으로 진행하여, 병합 시 충돌을 최소화하고 작업 단위를 명확히 구분하였습니다.
</details>

</br>

## 💡 결과물

~~_(링크)_~~

</br>

## 🍰 프로젝트 회고

~~_(링크)_~~

</br>

## 📁 파일 구조

```
├── README.md
├── http
│   ├── auth.http
│   ├── example.http
│   ├── exchange.http
│   ├── notification.http
│   ├── points.http
│   ├── shop.http
│   └── user.http
├── mock
│   └── mock.ts
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20241202044446_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   ├── seed.ts
│   └── structs.ts
├── src
│   ├── app.ts
│   ├── connection
│   │   └── connection.ts
│   ├── containers
│   │   ├── auth.container.ts
│   │   ├── example.container.ts
│   │   ├── exchange.container.ts
│   │   ├── notification.container.ts
│   │   ├── points.container.ts
│   │   ├── shop.container.ts
│   │   └── user.container.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── example.controller.ts
│   │   ├── exchange.controller.ts
│   │   ├── notification.controller.ts
│   │   ├── points.controller.ts
│   │   ├── shop.controller.ts
│   │   └── user.controller.ts
│   ├── repositories
│   │   ├── auth.repository.ts
│   │   ├── example.repository.ts
│   │   ├── exchange.repository.ts
│   │   ├── notification.repository.ts
│   │   ├── points.repository.ts
│   │   ├── shop.repository.ts
│   │   └── user.repository.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   ├── example.route.ts
│   │   ├── exchange.route.ts
│   │   ├── notification.route.ts
│   │   ├── points.route.ts
│   │   ├── shop.route.ts
│   │   └── user.route.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── example.service.ts
│   │   ├── exchange.service.ts
│   │   ├── notification.service.ts
│   │   ├── points.service.ts
│   │   ├── shop.service.ts
│   │   └── user.service.ts
│   ├── swagger
│   │   └── swagger.yaml
│   └── utils
│       ├── asyncHandler.ts
│       ├── errors.ts
│       ├── httpStatus.ts
│       ├── s3.ts
│       ├── upload.ts
│       └── verifyAuth.ts
└── tsconfig.json

```
