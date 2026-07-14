# AORR 상태 머신 설계

대상 저장소: `dooho-h.github.io`

목표: GitHub Pages에서 실행 가능한 정적 개인 프로페셔널 웹사이트를 만들고, 상단 `Games` 탭에서 키보드와 모바일 터치로 조작 가능한 지렁이 게임을 제공한다.

제약:

- 백엔드 서버 없음
- 루트 디렉토리 기준 필수 파일:
  - `index.html`
  - `styles.css`
  - `script.js`
  - 게임 구현에 필요한 JavaScript 파일 또는 `script.js` 내부 게임 코드
- HTML, CSS, JavaScript만 사용
- 설계만 수행하며, 현재 단계에서는 코드 수정/테스트/배포를 하지 않음

## 1. Target

### 프로페셔널 웹사이트 개발 목표

- 개인 소개가 명확한 프로페셔널 사이트를 만든다.
- 방문자가 첫 화면에서 이름, 소개, 핵심 경력, 프로젝트, 연락처를 빠르게 파악할 수 있어야 한다.
- 정적 콘텐츠만으로 GitHub Pages에 배포 가능해야 한다.

### GitHub Pages 배포 목표

- 정적 파일만으로 배포 가능한 구조를 유지한다.
- 상대 경로와 정적 자산 참조가 GitHub Pages 서브경로 또는 루트 배포 모두에서 동작하도록 검토한다.
- 별도 서버 의존성을 두지 않는다.

### 입력 자료

- 이름, 소개, 경력, 프로젝트 목록, 연락처 정보
- 프로필 이미지 또는 대체 텍스트 [사람 확인 필요]
- 사이트 색상/톤/브랜딩 선호 [사람 확인 필요]
- 지렁이 게임 규칙 상세값 [사람 확인 필요]
- Step 1에 `[게임 추가 기능:]` 이 있으면 해당 추가 요구사항 [사람 확인 필요]

### 필수 페이지와 섹션

- 상단 내비게이션
- Hero / 소개 영역
- About 또는 Profile 영역
- Experience 또는 Skills 영역
- Projects 영역
- Contact 영역
- `Games` 탭
- 지렁이 게임 화면

### Games 탭 및 지렁이 게임 요구사항

- `Games` 탭은 상단 내비게이션에 포함되어야 한다.
- 키보드 조작:
  - 방향키 또는 WASD [사람 확인 필요]
  - 포커스가 페이지 밖으로 빠지지 않아야 함
- 모바일 조작:
  - 터치 버튼 또는 스와이프 [사람 확인 필요]
  - 작은 화면에서 조작 UI가 겹치지 않아야 함
- 게임 기본 기능:
  - 시작
  - 이동
  - 먹이 획득
  - 점수 증가
  - 충돌 시 종료
  - 재시작
- 추가 기능은 Step 1의 `[게임 추가 기능:]` 항목이 존재할 경우 반영한다 [사람 확인 필요]

### 데스크톱 및 모바일 완료 기준

- 데스크톱:
  - 1280px 전후에서 레이아웃이 깨지지 않음
  - 네비게이션, 콘텐츠, 게임 영역이 정상 노출됨
  - 키보드로 게임 조작 가능
- 모바일:
  - 375px 전후에서 가로 스크롤 없음
  - 텍스트가 화면 밖으로 넘치지 않음
  - 터치로 게임 조작 가능
  - 회전 시에도 레이아웃이 유지됨

## 2. Act

### 한 번의 개발 루프에서 수행할 최소 작업

한 루프는 반드시 하나의 실패 원인만 다룬다.

- 대상 파일을 최소 범위로 수정한다.
- 필요한 경우에만 새 파일을 추가한다.
- 수정 후 동일한 verifier를 다시 실행한다.
- 통과한 기능은 회귀 테스트 대상으로 유지한다.

### 수정 가능한 파일 범위

- `index.html`
- `styles.css`
- `script.js`
- 게임용 추가 JavaScript 파일 [선택]
- 정적 자산 파일 [선택]

### 생성할 수 있는 파일

- `index.html`
- `styles.css`
- `script.js`
- `game.js` 또는 `snake.js` 같은 게임 전용 JS 파일 [선택]
- 이미지/아이콘/폰트 등 정적 자산 [선택]
- `AORR.md`

### 실행 가능한 로컬 검증 명령어

설계 기준에서의 권장 verifier 예시:

- 파일 존재 확인
  - `test -f index.html`
  - `test -f styles.css`
  - `test -f script.js`
- 정적 문법 점검
  - HTML: 브라우저 렌더 또는 HTML 검사 도구
  - CSS: 스타일 파싱 오류 확인
  - JS: 브라우저 콘솔 오류 확인
- 로컬 서버 확인
  - `python3 -m http.server`
  - 또는 동등한 정적 서버
- 수동 검증
  - 데스크톱 폭과 모바일 폭에서 화면 확인
  - 키보드 및 터치 입력 확인
  - 가능한 경우 Playwright Chromium을 사용한 브라우저 자동화 검증

실제 실행 여부는 구현 단계에서 결정한다.

보조 메모:

- 전역 설치된 Playwright는 CLI로 직접 실행하거나, Node 스크립트에서 `NODE_PATH=$(npm root -g)`를 지정해 사용할 수 있다.
- `require('playwright')`가 실패하면 로컬 설치 누락이 아니라 Node 모듈 해석 경로 문제일 수 있다.

## 3. Observe

Observe 단계는 실패 원인 분류에 필요한 증거를 모은다.

- 파일 생성 여부
  - 필수 파일 존재 여부
- HTML, CSS, JavaScript 오류
  - 렌더링 깨짐
  - 파싱/런타임 오류
- 로컬 웹서버 응답
  - 정적 페이지가 응답하는지
- 브라우저 콘솔 오류
  - 404, JS 예외, 리소스 로드 실패
- 데스크톱 및 모바일 화면
  - 레이아웃 붕괴
  - 오버플로우
- 키보드 및 터치 게임 조작
  - 입력 반응성
  - 방향 전환 안정성
- GitHub Pages 호환성
  - 정적 호스팅만으로 동작하는지
  - 절대 경로 의존 여부

## 4. Reason

실패 원인은 다음 분류 중 하나만 사용한다.

| 분류 | 의미 |
|---|---|
| HTML_STRUCTURE | 문서 구조, 섹션 배치, 마크업 누락 |
| CSS_RESPONSIVE | 모바일/데스크톱 반응형, 레이아웃, 오버플로우 |
| JAVASCRIPT | 일반 JS 문법, 런타임, 상태 관리 |
| GAME_LOGIC | 지렁이 게임 규칙, 충돌, 점수, 이동 처리 |
| GAME_CONTROL | 키보드/터치 입력 처리, 포커스, 조작 UX |
| CONTENT | 이름, 소개, 프로젝트 등 개인 콘텐츠 불명확 또는 부재 |
| TEST | 검증 절차 자체의 실패, verifier 불충분, 테스트 누락 |
| ENVIRONMENT | 로컬 실행 환경, 브라우저 차이, 경로 문제 |
| GITHUB_PERMISSION | 인증/권한 문제, GitHub 접근 실패 |
| DEPLOYMENT | GitHub Pages 배포 실패, 경로/빌드 호환성 문제 |
| UNKNOWN | 위 분류로 확정할 수 없음 |

분류 원칙:

- 하나의 실패에서 가장 직접적인 원인만 선택한다.
- 증상이 여러 개여도 최초 원인을 우선한다.
- 추측만 가능한 경우 `UNKNOWN` 으로 둔다.

## 5. Repeat

반복 규칙:

- 한 번에 하나의 실패 원인만 수정한다.
- 관련된 최소 파일만 변경한다.
- 수정 후 동일 verifier를 다시 실행한다.
- 이미 통과한 기능에 대해 회귀 테스트를 포함한다.

권장 반복 방식:

1. 실패 원인 1개 식별
2. 최소 수정
3. 동일 verifier 재실행
4. 인접 기능 회귀 확인
5. 다음 실패로 이동

## 6. Stop

다음 조건 중 하나를 만족하면 중단한다.

- 전체 테스트가 통과한 경우
- 최대 Retry에 도달한 경우
- 동일한 오류 fingerprint가 2회 반복된 경우
- 개인정보나 콘텐츠 확인이 필요한 경우
- GitHub 인증 또는 배포 권한 문제가 발생한 경우

오류 fingerprint 예시:

- 동일한 콘솔 예외
- 동일한 레이아웃 붕괴 위치
- 동일한 입력 오작동 재현 패턴

## 7. Human-in-the-loop

다음 상황에서는 사람 확인이 필요하다.

- 이름, 소개, 경력, 프로젝트 등 개인 콘텐츠가 불명확한 경우
- 기존 콘텐츠 삭제가 필요한 경우
- 외부 분석 도구나 외부 서비스를 추가해야 하는 경우
- GitHub 저장소 설정을 변경해야 하는 경우
- 요구사항이 충돌하는 경우
- 게임 규칙 또는 추가 기능이 Step 1에서 명시되지 않은 경우

## 8. AORR 상태 정의

| 상태 | 의미 |
|---|---|
| READY | 작업 시작 가능, 입력과 범위가 정의됨 |
| ACTING | 현재 루프에서 수정 작업 수행 중 |
| VERIFYING | 수정 후 검증 중 |
| RETRYING | 동일 실패 원인을 최소 수정으로 재시도 중 |
| PASSED | 해당 루프의 검증 통과 |
| DEPLOY_READY | 배포 가능 상태, 배포 전 최종 점검 완료 |
| DEPLOYING | GitHub Pages 배포 진행 중 |
| DEPLOYED | 배포 완료 |
| BLOCKED | 기술적 또는 환경적 이유로 진행 불가 |
| HITL_REQUIRED | 사람 확인이 필요한 상태 |

## 9. 루프별 상태 머신 설계

각 단계는 입력 → Act → Observe → Output → Test Criteria → Next State 순서로 진행한다.

| 단계 | 입력 | Act | Observe | 출력 | 테스트 기준 | 다음 상태 |
|---|---|---|---|---|---|---|
| READY | 기준선, 요구사항, 파일 구조 | 수정 범위 정의 | 실패 원인/변경 후보 식별 | 실행 가능한 루프 | 범위와 verifier가 정의됨 | ACTING |
| ACTING | 실행 가능한 루프 | 최소 수정 수행 | 변경 파일과 diff 확인 | 수정 완료 후보 | 예상 파일만 바뀜 | VERIFYING |
| VERIFYING | 수정된 산출물 | 동일 verifier 실행 | 콘솔, 렌더, 응답 코드 확인 | 성공/실패 판정 | 완료 기준 충족 | PASSED 또는 RETRYING |
| RETRYING | 실패한 검증 결과 | 실패 원인 1개만 재수정 | 동일 fingerprint 여부 확인 | 재시도 결과 | fingerprint 변경 또는 해결 | ACTING 또는 STOP |
| PASSED | 통과한 루프 | 회귀 범위 확인 | 인접 기능 깨짐 여부 확인 | 다음 루프 준비 | 회귀 없음 | READY 또는 DEPLOY_READY |
| DEPLOY_READY | 모든 루프 통과 | 배포 승인 확인 | 배포 전 최종 점검 | 배포 가능 상태 | 배포 전 조건 충족 | DEPLOYING |
| DEPLOYING | 승인된 배포 | GitHub Pages 반영 | 라이브 URL 응답 확인 | 라이브 배포 | HTTP 200 및 기능 유지 | DEPLOYED |
| BLOCKED | 외부 제약 | 원인 기록 | 해제 조건 확인 | 중단 상태 | 자체 해결 불가 | HITL_REQUIRED 또는 READY |
| HITL_REQUIRED | 사람 확인 필요 항목 | 질문/대기 | 답변 반영 | 재개 가능 여부 | 필요 정보 확보 | READY |

## 10. Retry 정책

- 하나의 실패 원인당 최대 3회
- 동일 fingerprint가 2회 반복되면 즉시 중지
- Retry마다 동일 verifier를 유지한다
- Retry 동안에는 범위를 넓히지 않는다

## 11. GitHub Pages 호환성

- 정적 파일만으로 동작해야 한다.
- 상대 경로는 루트 배포와 서브경로 배포를 모두 고려한다.
- 루트 파일명은 `index.html` 기준으로 유지한다.
- 브라우저 기능만으로 동작해야 한다.

## 12. Change Request Loop Plan

### Change Request Overview

- Change Request ID: `CR-20260714-001`
- 기준선 commit: `02d007c1fa1b51014096b0f87eb8076835e90d42`
- 기준선 URL: `https://dooho-h.github.io/`
- 현재 계획 상태: `CHANGE_PLANNED`

### Loop Summary

| Loop ID | Connected Change Item | Target | Status | Next |
|---|---|---|---|---|
| LOOP-CR-001 | CR-001 | Game over / Pause 문구 겹침 버그 제거 | READY | LOOP-CR-002 |
| LOOP-CR-002 | CR-002 | Games 진입을 플로팅 버튼으로 전환 | READY | LOOP-CR-005 |
| LOOP-CR-005 | CR-005 | 로컬 top 5 리더보드와 Game over 표시 추가 | READY | LOOP-CR-003 |
| LOOP-CR-003 | CR-003 | 다크/라이트 테마 토글 추가 | READY | LOOP-CR-004 |
| LOOP-CR-004 | CR-004 | 스크롤 진행 인디케이터 추가 | READY | 없음 |

### LOOP-CR-001

- Target: 지렁이 게임의 Pause / Game over 문구 겹침을 제거한다.
- 입력 자료: [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- Act: overlay와 캔버스 상태 라벨의 중복 렌더링 경로를 최소 수정으로 분리한다.
- Observe: Pause / Game over 상태에서 문구가 하나만 보이는지 확인한다.
- Reason: BUG, GAME_STATE, GAME_EFFECT
- Verifier: 로컬 정적 서버 + 브라우저 수동 검수 + `node --check game.js`
- 완료 기준: Pause와 Game over에서 겹치는 문구가 재현되지 않는다.
- Retry 정책: 동일 fingerprint 최대 3회, 2회 반복 시 중지
- Stop 조건: 문구 겹침이 사라지거나, 동일한 겹침이 2회 반복되거나, 새로운 콘솔 오류가 생기면 중지
- HITL 조건: 없음
- 예상 수정 파일: `game.js`, `styles.css`
- 선행 Loop: 없음
- 다음 Loop: `LOOP-CR-002`
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 모호성 발견 시 `HITL_REQUIRED`

### LOOP-CR-002

- Target: `Games`를 상단 nav에서 제거하고 우하단 플로팅 버튼으로 대체한다.
- 입력 자료: [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- Act: 상단 내비게이션 재구성, 플로팅 버튼 추가, 게임 섹션 이동 또는 오버레이 진입 중 하나를 적용한다.
- Observe: 모든 viewport에서 버튼이 보이고, `Games` 항목이 nav에서 사라졌는지 확인한다.
- Reason: NAVIGATION, INFORMATION_ARCHITECTURE, UI_UX, NEW_FEATURE, SPEC_CHANGE
- Verifier: 브라우저 렌더 확인, 모바일 viewport 확인, 링크 이동 확인, `node --check script.js`
- 완료 기준: 상단 nav에서 Games가 제거되고, 플로팅 버튼으로 게임에 접근 가능하다.
- Retry 정책: 동일 fingerprint 최대 3회, 디자인 충돌 시 범위 축소 후 재시도
- Stop 조건: 기존 nav 구조가 무너지거나, 모바일에서 버튼이 다른 UI를 가리거나, HITL 선택이 필요한 경우
- HITL 조건: 열기 방식(스크롤 vs 오버레이), 아이콘/레이블
- 예상 수정 파일: `index.html`, `styles.css`, `script.js`
- 선행 Loop: `LOOP-CR-001`
- 다음 Loop: `LOOP-CR-005`
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 선택 필요 시 `HITL_REQUIRED`

### LOOP-CR-005

- Target: 로컬 top 5 리더보드와 Game over 표시를 추가한다.
- 입력 자료: [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- Act: 이름 입력, 점수 저장 구조, top 5 정렬, Game over 화면 리더보드 표시를 연결한다.
- Observe: 여러 번 게임오버를 만들었을 때 top 5가 정확히 저장/정렬되고 보이는지 확인한다.
- Reason: GAME_LOGIC, GAME_STATE, GAME_CONTROL, NEW_FEATURE, UI_UX
- Verifier: 로컬 서버, 브라우저 수동 검수, 로컬스토리지 확인, `node --check game.js`
- 완료 기준: 이름 입력값이 top 5 리더보드에 저장되고, Game over 시 UI로 확인 가능하다.
- Retry 정책: 동일 fingerprint 최대 3회, 순위 계산 또는 저장 충돌 시 재시도
- Stop 조건: 점수/이름 저장이 깨지거나, 기존 게임 오버 상태가 읽기 어려워지면 중지
- HITL 조건: 이름 미입력 처리 정책
- 예상 수정 파일: `game.js`, `index.html`, `styles.css`
- 선행 Loop: `LOOP-CR-001`
- 다음 Loop: `LOOP-CR-003`
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 정책 불명확 시 `HITL_REQUIRED`

### LOOP-CR-003

- Target: 헤더에 다크/라이트 테마 토글을 추가한다.
- 입력 자료: [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- Act: `prefers-color-scheme` 감지, 로컬스토리지 저장, 전역 토큰 전환을 추가한다.
- Observe: 시스템 선호와 저장값이 반영되고 새로고침 후에도 유지되는지 확인한다.
- Reason: UI_UX, ACCESSIBILITY, NEW_FEATURE
- Verifier: 브라우저 수동 검수, 테마 토글 상태 확인, `node --check script.js`
- 완료 기준: 라이트/다크 테마가 토글되고 새로고침 후 상태가 유지된다.
- Retry 정책: 동일 fingerprint 최대 3회, 색상 대비 문제 발생 시 조정 후 재검증
- Stop 조건: 기존 대비가 무너지거나, 가독성이 떨어지거나, 저장 로직이 실패하면 중지
- HITL 조건: 없음
- 예상 수정 파일: `index.html`, `styles.css`, `script.js`
- 선행 Loop: `LOOP-CR-005`
- 다음 Loop: `LOOP-CR-004`
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 저장 정책 문제 시 `HITL_REQUIRED`

### LOOP-CR-004

- Target: 헤더 바로 아래의 얇은 스크롤 진행 인디케이터를 추가한다.
- 입력 자료: [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- Act: 스크롤 이벤트와 고정 바 스타일을 추가한다.
- Observe: 페이지 상단부터 하단까지 스크롤할 때 진행률이 시각적으로 갱신되는지 확인한다.
- Reason: UI_UX, NEW_FEATURE
- Verifier: 브라우저 수동 검수, 다양한 viewport에서 스크롤 테스트, `node --check script.js`
- 완료 기준: 헤더 아래 얇은 progress bar가 스크롤 위치를 반영한다.
- Retry 정책: 동일 fingerprint 최대 3회, 고정 UI 충돌 시 레이아웃 조정 후 재검증
- Stop 조건: 고정 UI가 헤더나 플로팅 버튼과 충돌하거나, 스크롤 성능이 눈에 띄게 저하되면 중지
- HITL 조건: 없음
- 예상 수정 파일: `index.html`, `styles.css`, `script.js`
- 선행 Loop: `LOOP-CR-003`
- 다음 Loop: 없음
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 충돌 시 `BLOCKED`

## 15. Change Request Loop Results

### Execution Summary

- Change Request ID: `CR-20260714-001`
- Current state after local execution: `DEPLOYED`
- Last normal deployment commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- Last normal deployment URL: `https://dooho-h.github.io/`

### Completed Loops

| Loop ID | Change Item | Result | Notes |
|---|---|---|---|
| LOOP-CR-001 | CR-001 | PASSED | Pause/Game over overlap removed by separating the overlay flow from canvas state labels |
| LOOP-CR-002 | CR-002 | PASSED | `Games` removed from primary nav and replaced with a floating bottom-right snake button |
| LOOP-CR-005 | CR-005 | PASSED | Local top 5 leaderboard, name input, and game-over display added |
| LOOP-CR-003 | CR-003 | PASSED | Theme toggle and persisted dark/light mode added |
| LOOP-CR-004 | CR-004 | PASSED | Scroll progress indicator added below the sticky header |

### Retry and Verification Notes

- Retry count: 0 code retries, 1 temporary mock-DOM verification retry caused by the harness missing `document.createElement`
- Verification results:
  - `node --check script.js` passed
  - `node --check game.js` passed
  - mock DOM initialization and game-over leaderboard path passed
  - mock DOM theme toggle path passed
  - mock DOM scroll progress path passed
  - local HTTP 200 responses confirmed for `index.html`, `styles.css`, `script.js`, and `game.js`
  - Playwright Chromium browser validation passed with `NODE_PATH=$(npm root -g)`
- Final deployment result: `DEPLOYED`
- Last normal deployment commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- Last normal deployment URL: `https://dooho-h.github.io/`

### Rollback Reminder

- Keep the last normal deployment commit as the rollback baseline
- Avoid overwriting the deployment record until a fresh deployment is approved and verified

## Change Request Loop Plan - CR-20260714-002

### LOOP-CR-006

- Target: 이름 입력칸에서 게임 단축키가 텍스트 입력을 가로채지 않도록 한다.
- 입력 자료: [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [CHANGE_REQUEST.md](/home/dooho/dev/dooho-h.github.io/CHANGE_REQUEST.md), [MEMORY.md](/home/dooho/dev/dooho-h.github.io/MEMORY.md)
- Act: 전역 `keydown` 핸들러에서 편집 가능한 요소를 감지해, 이름 입력칸이 포커스된 동안에는 게임 단축키를 무시하도록 수정한다.
- Observe: 이름 입력칸에 `wasd`와 방향키가 포함된 텍스트를 입력했을 때 입력값이 누락되지 않는지 확인한다.
- Reason: BUG, GAME_CONTROL, ACCESSIBILITY, UI_UX
- Verifier: 로컬 정적 서버, Playwright 입력 검증, `node --check game.js`
- 완료 기준: 이름 입력칸에서 일반 텍스트와 `wasd` / 방향키 입력이 온전히 동작하고, 게임 패널 포커스 시 기존 조작은 유지된다.
- Retry 정책: 동일 fingerprint 최대 3회, 동일 입력 누락이 2회 반복되면 중지
- Stop 조건: 입력값 손상이 지속되거나, 게임 컨트롤 회귀가 발생하거나, 새로운 콘솔 오류가 생기면 중지
- HITL 조건: 없음
- 예상 수정 파일: `game.js`, `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md`
- 선행 Loop: 없음
- 다음 Loop: 없음
- 상태: `READY`
- 상태 전이: `READY -> ACTING -> VERIFYING -> PASSED`, 실패 시 `RETRYING`, 반복 실패 시 `BLOCKED`

## Change Request Loop Results - CR-20260714-002

### Execution Summary

- Change Request ID: `CR-20260714-002`
- Current state after local execution: `DEPLOYED`
- Baseline commit before change: `7b9249eccaaf140d4f1339fabe37a9c2bf5f58c9`
- Last normal deployment commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- Last normal deployment URL: `https://dooho-h.github.io/`
- Deployed commit for CR-20260714-002: `dc145af7f0d0b16eec84275e612cf804d655c81c`

### Completed Loops

| Loop ID | Change Item | Result | Notes |
|---|---|---|---|
| LOOP-CR-006 | CR-006 | PASSED | Editable-field guard restored text input while preserving game-panel keyboard control |

### Retry and Verification Notes

- Retry count: 0 code retries
- Verification results:
  - `node --check game.js` passed
  - Playwright input verification passed: `wasd` and `abc` were fully entered in the name field
  - Game panel keyboard regression passed: `ArrowUp` on the focused game panel yielded `gameState=running` and `nextDirection={x:0,y:-1}`
- Final local state: `DEPLOYED`

### Rollback Reminder

- Revert the `isEditableTarget` guard first if the new input behavior causes regressions
- Keep the leaderboard and theme changes untouched unless a separate regression appears
