> [![Typing SVG](https://readme-typing-svg.demolab.com?font=Poppins&weight=900&size=46&pause=1000&color=F7D511&vCenter=true&width=435&lines=pikapick+photo)](https://git.io/typing-svg)

> 2024.11.15 - 12.09
> 코드잇 스프린트 풀스택 2기 중급 프로젝트 2팀 (Backend)
> [Frontend Github 바로가기 🔗](https://github.com/2-FavoritePhoto-2/2-FavoritePhoto-2-FE)

_~~(협업 문서 링크: 노션- 어떤 페이지 넣을지 고민 중)
(프로젝트 소개)~~_

## 🛠️ 기술스택

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![postgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![aws](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white) ![notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

## 💁 구성원

|                       김영은                       |                     이동훈                     |                                 강명곤                                 |
| :------------------------------------------------: | :--------------------------------------------: | :--------------------------------------------------------------------: |
|     ![imgur](https://i.imgur.com/lVepEn6.png)      |    ![imgur](https://imgur.com/sPgtNAy.png)     | <img src="https://i.imgur.com/UtZDvAf.png"  width="200" height="400"/> |
| [Maybeiley's Github](https://github.com/Maybeiley) | [ciin1411 Github](https://github.com/ciin1411) |              [GGON123 Github](https://github.com/GGON123)              |

김영은

- 프로젝트 폴더 아키텍쳐 및 기초 세팅
- AWS 및 Render 서버 배포 관리

이동훈

- 유저 기반 조회 기능 및 카드 생성

강명곤

- 교환 관련 제안, 승인, 거절, 취소 기능
- 포인트 관련 랜덤 포인트 획득, 마지막으로 뽑은 시간 조회, 포인트 로그 조회 기능

## 📋 팀원별 구현 기능 상세

### 김영은

- 인증 및 인가, 판매 관련 CRUD, 알림

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

### 강명곤

#### 교환 관련 기능

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

#### 포인트 관련 기능

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

## 💡 결과물

~~_(링크)_~~

## 🍰 프로젝트 회고

~~_(링크)_~~

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
