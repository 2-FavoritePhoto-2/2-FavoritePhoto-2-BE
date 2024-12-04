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

|                       김영은                       |                     이동훈                     | ㅇㅇㅇ |
| :------------------------------------------------: | :--------------------------------------------: | :----: |
|     ![imgur](https://i.imgur.com/lVepEn6.png)      |    ![imgur](https://imgur.com/sPgtNAy.png)     | ㅇㅇㅇ |
| [Maybeiley's Github](https://github.com/Maybeiley) | [ciin1411 Github](https://github.com/ciin1411) | ㅇㅇㅇ |

김영은

- 프로젝트 폴더 아키텍쳐 및 기초 세팅
- AWS 및 Render 서버 배포 관리

이동훈

- 유저 기반 조회 기능 및 카드 생성

강명곤

- 역할

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

-

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
