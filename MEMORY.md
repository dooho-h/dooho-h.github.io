# MEMORY

## Goal

- GitHub Pages용 프로페셔널 웹사이트 완성
- 반응형 데스크톱 및 모바일 지원
- `Games` 탭 구현
- 키보드와 모바일 터치로 조작 가능한 지렁이 게임 구현
- GitHub Pages 최초 배포
- Step 1의 `[게임 추가 기능:]` 반영

## Required Deliverables

- 프로젝트 루트의 `index.html`
- `styles.css`
- `script.js`
- 필요한 경우 별도 `game.js`
- 필요한 이미지 및 정적 assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- 정적 HTML, CSS, JavaScript
- 프로페셔널 웹사이트 콘텐츠
- 반응형 레이아웃
- `Games` 탭
- 지렁이 게임
- GitHub Pages 배포

## Out of Scope

- 백엔드 서버
- 데이터베이스
- 로그인 및 회원가입
- 결제
- 사용자 개인정보 수집
- 별도 승인 없는 외부 API
- 별도 승인 없는 프레임워크 전환

## Current State

- 현재 상태: `DEPLOYED`
- 완료한 루프: 2회차까지 완료
- 다음 루프: 없음
- 현재 Retry 횟수: 2
- 현재 오류 fingerprint: 없음
- Blocker: 없음
- 마지막 정상 상태: GitHub Pages 라이브 사이트 검증 통과

## Guardrails

- 기존 개인 콘텐츠 임의 삭제 금지
- 확인되지 않은 경력이나 프로젝트 정보 생성 금지
- 테스트 삭제 또는 완화 금지
- 토큰 출력 금지
- 토큰을 HTML, CSS, JavaScript에 저장 금지
- 토큰을 Git에 커밋 금지
- `github_token.txt` 커밋 금지
- `env_settings.txt` 커밋 금지
- 백엔드 기능 추가 금지
- 대규모 리팩토링 금지
- 테스트를 통과시키기 위한 기능 제거 금지

## Acceptance Criteria

- 루트 `index.html` 존재
- 로컬 정적 서버에서 정상 로드
- CSS와 JavaScript 정상 로드
- 콘솔 오류 없음
- 모바일 및 데스크톱에서 레이아웃 정상
- `Games` 탭 정상 이동
- 지렁이 게임 정상 실행
- 키보드 조작 정상
- 모바일 터치 조작 정상
- 점수 및 재시작 정상
- GitHub Pages에서 HTTP 200 응답
- 배포된 사이트에서도 동일 기능 정상

## Retry Policy

- 하나의 오류당 최대 3회
- 동일 오류 fingerprint 2회 반복 시 중지
- 한 번의 Retry에서 하나의 원인만 수정
- Retry마다 동일 Verifier 재실행

## HITL Conditions

- 개인 프로필 내용 불명확
- 기존 콘텐츠 삭제 필요
- 요구사항 충돌
- GitHub 저장소 권한 부족
- GitHub Pages 설정 변경 필요
- 외부 서비스 추가 필요
- Retry 한계 도달

## Tool Policy

- Codex는 작업 제어, 파일 수정, 테스트 실행 담당
- 가능하면 Claude Code CLI를 독립 Verifier로 사용
- 실제 사용한 Claude 모델명 기록
- 토큰 값은 어떠한 실행 기록에도 남기지 않음

## Execution Log Template

- Loop ID
- 시작 시각
- 목표
- 시작 상태
- 가설
- Act
- 변경 파일
- Verifier
- 테스트 결과
- exit code
- 오류 fingerprint
- Retry 횟수
- 종료 상태
- 다음 작업
- 사람 확인 필요 항목

## Repository Notes

- 현재 저장소에는 `AORR.md`와 `README.md`만 확인됨
- 아직 `index.html`, `styles.css`, `script.js`, `package.json`은 확인되지 않음
- 현재 단계에서는 웹사이트 코드 수정, 테스트 실행, 배포를 수행하지 않음

## Execution Log

- Loop ID: `loop-1`
- 시작 시각: `2026-07-14`
- 목표: GitHub Pages용 정적 웹사이트의 가장 안전한 기본 구조 생성
- 시작 상태: `READY`
- 가설: 루트 정적 셸과 반응형 내비게이션부터 만들면 이후 기능 확장이 안전하다
- Act: `index.html`, `styles.css`, `script.js`를 최소 구성으로 생성
- 변경 파일: `index.html`, `styles.css`, `script.js`, `MEMORY.md`
- Verifier: `test -f index.html`; `test -f styles.css`; `test -f script.js`; `node --check script.js`; `python3 -m http.server 8123`; `curl -I http://127.0.0.1:8123/`; `curl -I http://127.0.0.1:8123/index.html`; `curl -I http://127.0.0.1:8123/styles.css`; `curl -I http://127.0.0.1:8123/script.js`; `curl -s http://127.0.0.1:8123/ | rg -n 'viewport|styles.css|script.js|Home|About|Projects|Games|<main|<nav|<section'`; `claude --print --model sonnet ...`
- 테스트 결과: 통과
- exit code: `0`
- 오류 fingerprint: 없음
- Retry 횟수: 0
- 종료 상태: `PASSED`
- 다음 작업: `Games` 탭의 실제 상호작용 또는 지렁이 게임 최소 기능 설계
- 사람 확인 필요 항목: 브라우저 자동화 도구 부재로 인한 모바일 viewport 시각 검증, 실제 개인 콘텐츠 입력, Games 세부 규칙

## Execution Log - Loop 2

- Loop ID: `loop-2`
- 시작 시각: `2026-07-14`
- 목표: GitHub Pages용 정적 개인 프로페셔널 웹사이트와 snake 게임 전체 기능 구현
- 시작 상태: `PASSED` after the first safe shell loop
- 가설: 기존 최소 셸을 확장하면 페이지, 반응형 내비게이션, 게임 전체 기능을 한 번에 완성할 수 있다
- Act: `index.html`, `styles.css`, `script.js`, `game.js`를 전체 구현으로 교체 및 확장
- 변경 파일: `index.html`, `styles.css`, `script.js`, `game.js`, `MEMORY.md`
- Verifier: `node --check game.js`; `node --check script.js`; `python3 -m http.server 8124`; `NODE_PATH=$(npm root -g) node /tmp/verify_portfolio.js`; `claude --print --model sonnet ...`
- 테스트 결과: 통과
- exit code: `0`
- 오류 fingerprint: `TEST|mobile-dpad-selector-scope` -> resolved; touch support gap -> resolved
- Retry 횟수: `2`
- 종료 상태: `DEPLOY_APPROVAL_REQUIRED`
- 다음 작업: 사용자 배포 승인 대기
- 사람 확인 필요 항목: 실제 개인 프로필 / 경력 / 프로젝트 / 연락처 값, GitHub Pages 최초 배포 승인

## Tool Notes

- Claude Code CLI 모델: `Claude Sonnet 5 (claude-sonnet-5)`
- 브라우저 자동화: Playwright Chromium via global install
- Node에서 `require('playwright')`를 쓸 때는 `NODE_PATH=$(npm root -g)`가 필요할 수 있음

## Change Request Intake - CR-20260714-001

### Baseline

- 마지막 정상 배포 commit: `02d007c1fa1b51014096b0f87eb8076835e90d42`
- 마지막 정상 배포 URL: `https://dooho-h.github.io/`

### Request Summary

- 사용자 요청 요약: 지렁이 게임의 Pause/Game over 문구 겹침 버그를 고치고, Games 진입을 플로팅 버튼으로 숨긴 뒤, 다크/라이트 테마 토글, 스크롤 진행 인디케이터, 로컬 top 5 리더보드를 추가한다.
- 새로운 전체 Change Request ID: `CR-20260714-001`

### Change Items

- CR-001: 지렁이 게임 Game over / Pause 문구 겹침 버그 수정
- CR-002: Games 탭 제거 후 우하단 플로팅 진입 버튼으로 대체
- CR-003: 다크/라이트 테마 토글 추가
- CR-004: 스크롤 진행 인디케이터 추가
- CR-005: 로컬 top 5 리더보드와 게임오버 표시 추가

### Reference Materials

- [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md)
- [AORR.md](/home/dooho/dev/dooho-h.github.io/AORR.md)
- [README.md](/home/dooho/dev/dooho-h.github.io/README.md)
- 현재 소스 파일: `index.html`, `styles.css`, `script.js`, `game.js`

### Current State

- 현재 요청 상태: `CHANGE_PLANNED`
- 기준선은 기존 정상 배포 상태로 고정
- 현재 Git 상태: `main` 브랜치, `origin/main` 추적, untracked `step8.md`

### New Acceptance Criteria

- CR-001: Pause/Game over 상태에서 문구 겹침이 재현되지 않는다
- CR-002: `Games` 탭이 nav에서 사라지고 플로팅 버튼으로 게임 진입 가능하다
- CR-003: 라이트/다크 테마가 시스템 선호와 저장값에 따라 전환된다
- CR-004: 헤더 아래 스크롤 진행 바가 현재 위치를 시각적으로 표시한다
- CR-005: top 5 리더보드가 저장되고 Game over 시 표시된다

### Loop Execution Order

- 1순위: `LOOP-CR-001`
- 2순위: `LOOP-CR-002`
- 3순위: `LOOP-CR-005`
- 4순위: `LOOP-CR-003`
- 5순위: `LOOP-CR-004`

### Next Step 9 Loop ID

- `LOOP-CR-001`

### Rollback Criteria

- 새 오류가 기존 정상 배포 기준보다 커졌을 때
- 동일 콘솔 예외나 동일 레이아웃 붕괴가 반복될 때
- GitHub Pages 상대 경로가 깨질 때
- 기존 게임 조작 또는 점수 표시가 망가질 때

### HITL Items

- CR-002: 플로팅 버튼의 열기 방식과 아이콘 선택
- CR-003: 기본 다크 팔레트의 세부 톤
- CR-005: 이름 미입력 처리 정책

### Notes

- 기존 배포 기록과 실행 로그는 유지한다
- 기존 테스트 기록은 삭제하지 않는다
- 배포나 코드 수정은 이 단계에서 수행하지 않는다

## Change Request Execution - CR-20260714-002

### Pre-change Baseline

- 변경 전 commit hash: `7b9249eccaaf140d4f1339fabe37a9c2bf5f58c9`
- 마지막 정상 배포 commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- 마지막 정상 배포 URL: `https://dooho-h.github.io/`
- 현재 Git 상태: `main...origin/main`, untracked `step8.md`
- 기존 테스트 결과: `node --check game.js`, `node --check script.js`, mock DOM validation, Playwright browser validation, local HTTP 200 checks all passed for CR-20260714-001
- 수정 전 웹사이트 상태: 기존 배포본은 정상 동작하지만, 이름 입력칸에서 `WASD` / 방향키가 게임 단축키에 가로채일 가능성이 확인됨
- 수정 전 게임 상태: 이름 입력칸에서 일부 키가 누락되는 입력 충돌 존재
- Rollback 기준: 이름 입력이 더 깨지거나, 기존 게임 조작/리더보드/테마/스크롤 기능에 회귀가 발생하면 롤백 검토

### Loop Records

- LOOP-CR-006
  - Change Item ID: CR-006
  - 시작 상태: `READY`
  - 종료 상태: `READY`
  - 가설: 전역 keydown에서 편집 가능한 필드를 제외하면 이름 입력칸의 키보드 입력이 온전히 복구된다
  - Act: 편집 가능한 요소 감지 헬퍼를 추가해 입력칸 포커스 중에는 게임 hotkey를 무시하도록 수정
  - 변경 파일: `game.js`, `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md`
  - Verifier: `node --check game.js`; Playwright 입력 검증 예정
  - 결과: 진행 중
  - exit code: `pending`
  - 오류 fingerprint: pending
  - Retry 횟수: `0`
  - 다음 Loop: 없음
  - 사람 확인 필요 항목: 없음

## Change Request Execution - CR-20260714-001

### Pre-change Baseline

- 변경 전 commit hash: `02d007c1fa1b51014096b0f87eb8076835e90d42`
- 마지막 정상 배포 commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- 마지막 정상 배포 URL: `https://dooho-h.github.io/`
- 현재 Git 상태: `main...origin/main`, untracked `step8.md`
- 기존 테스트 결과: `MEMORY.md`의 `loop-1`, `loop-2`, `deploy-1` 기록은 통과
- 수정 전 웹사이트 상태: GitHub Pages 라이브 사이트는 HTTP 200, 현재 구현은 Games 탭 노출과 단일 라이트 테마, 스크롤 인디케이터 없음, 로컬 리더보드는 없음
- 수정 전 게임 상태: Pause/Game over overlay 텍스트 중복 가능성, high score만 저장
- Rollback 기준: 새 오류가 기존 정상 배포 기준보다 커질 때, 동일 콘솔 예외/레이아웃 붕괴가 반복될 때, GitHub Pages 상대 경로가 깨질 때, 기존 게임 조작 또는 점수 표시가 망가질 때

### Loop Records

- LOOP-CR-001
  - Change Item ID: CR-001
  - 시작 상태: `READY`
  - 종료 상태: `PASSED`
  - 가설: overlay와 canvas 상태 라벨을 분리하면 Pause/Game over 문구 겹침이 사라진다
  - Act: 게임오버 및 일시정지 상태에서 overlay-only 메시지 흐름과 leaderboard 공간을 정리
  - 변경 파일: `game.js`, `styles.css`
  - Verifier: `node --check game.js`; mock DOM runtime validation
  - 결과: 통과
  - exit code: `0`
  - 오류 fingerprint: 없음
  - Retry 횟수: `0`
  - 다음 Loop: `LOOP-CR-002`
- LOOP-CR-002
  - Change Item ID: CR-002
  - 시작 상태: `READY`
  - 종료 상태: `PASSED`
  - 가설: Games를 nav에서 제거하고 floating button으로 대체하면 요청한 숨김 진입 방식이 성립한다
  - Act: 상단 nav에서 Games 제거, theme toggle과 floating game entry 추가, sticky progress bar 레이아웃 확보
  - 변경 파일: `index.html`, `script.js`, `styles.css`
  - Verifier: local HTTP 200 checks; mock DOM initialization validation
  - 결과: 통과
  - exit code: `0`
  - 오류 fingerprint: 없음
  - Retry 횟수: `0`
  - 다음 Loop: `LOOP-CR-005`
- LOOP-CR-005
  - Change Item ID: CR-005
  - 시작 상태: `READY`
  - 종료 상태: `PASSED`
  - 가설: leaderboard 저장/렌더 경로를 추가하면 gameover 시 top 5 local ranking을 노출할 수 있다
  - Act: player name input, save score action, leaderboard storage/rendering 추가
  - 변경 파일: `game.js`, `index.html`, `styles.css`
  - Verifier: mock DOM runtime validation; leaderboard save/render path validation
  - 결과: 통과
  - exit code: `0`
  - 오류 fingerprint: 없음
  - Retry 횟수: `0`
  - 다음 Loop: `LOOP-CR-003`
- LOOP-CR-003
  - Change Item ID: CR-003
  - 시작 상태: `READY`
  - 종료 상태: `PASSED`
  - 가설: theme token과 persisted toggle을 추가하면 light-only 고정을 해제할 수 있다
  - Act: theme toggle, prefers-color-scheme detection, theme-color meta update 추가
  - 변경 파일: `index.html`, `script.js`, `styles.css`
  - Verifier: mock DOM theme toggle validation
  - 결과: 통과
  - exit code: `0`
  - 오류 fingerprint: 없음
  - Retry 횟수: `0`
  - 다음 Loop: `LOOP-CR-004`
- LOOP-CR-004
  - Change Item ID: CR-004
  - 시작 상태: `READY`
  - 종료 상태: `PASSED`
  - 가설: sticky header 아래 progress bar를 추가하고 scroll listener를 갱신하면 진행률을 시각화할 수 있다
  - Act: scroll progress indicator와 rAF 기반 scroll handler 추가
  - 변경 파일: `index.html`, `script.js`, `styles.css`
  - Verifier: mock DOM scroll validation
  - 결과: 통과
  - exit code: `0`
  - 오류 fingerprint: 없음
  - Retry 횟수: `0`
  - 다음 Loop: 없음

### Current State Update

- 현재 상태: `DEPLOYED`
- 현재 정상 commit 후보: `05638e00e854848d74ceed4fd89f997a852165f5`
- 배포 전 rollback 기준: 마지막 정상 배포 commit과 URL 유지

## Playwright Verification Loop

- Loop ID: `playwright-verify-1`
- 대상 Change Item: `CR-001`, `CR-002`, `CR-003`, `CR-004`, `CR-005`
- 시작 상태: `DEPLOY_APPROVAL_REQUIRED`
- 종료 상태: `PASSED`
- 가설: 전역 설치된 Playwright를 `NODE_PATH=$(npm root -g)`와 함께 쓰면 브라우저 레벨에서 현재 변경사항을 직접 검증할 수 있다
- Act: `chromium` headless로 `http://127.0.0.1:8124/`를 열고 nav, floating button, theme toggle, scroll progress, leaderboard UI를 확인
- 변경 파일: 없음
- Verifier: Playwright Chromium via `NODE_PATH=$(npm root -g) node`
- 결과: 통과
- exit code: `0`
- 오류 fingerprint: 없음
- Retry 횟수: `0`
- 다음 Loop: 없음
- 사람 확인 필요 항목: 없음
- 브라우저 관찰: scroll progress bar width changed from `0px` at top to `54.3281px` after scrolling to the bottom

## Deployment Record - CR-20260714-001

- Deployment status: `DEPLOYED`
- Deployed commit: `05638e00e854848d74ceed4fd89f997a852165f5`
- Deployed URL: `https://dooho-h.github.io/`
- Deployment verification:
  - GitHub Pages HTTP 200 confirmed
  - GitHub Pages HTML includes `theme-toggle`, `scroll-progress`, `floating-game-button`, `data-player-name`, and `data-leaderboard`
  - Playwright browser validation on live site passed with no console errors
- Remaining manual blockers: 없음

## Change Request Execution - CR-20260714-002

- Loop ID: `LOOP-CR-006`
- Change Item ID: `CR-006`
- 시작 상태: `READY`
- 종료 상태: `PASSED`
- 가설: 전역 keydown에서 편집 가능한 필드를 제외하면 이름 입력칸의 키보드 입력이 온전히 복구된다
- Act: 편집 가능한 요소 감지 헬퍼를 추가해 입력칸 포커스 중에는 게임 hotkey를 무시하도록 수정
- 변경 파일: `game.js`, `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md`
- Verifier: `node --check game.js`; Playwright 입력 검증; 게임 패널 keyboard regression 검증
- 결과: 통과
- exit code: `0`
- 오류 fingerprint: 없음
- Retry 횟수: `0`
- 다음 Loop: 없음
- 현재 정상 commit 후보: 변경 사항은 아직 커밋하지 않음
- Rollback 기준: 이름 입력이 다시 깨지거나, 기존 게임 조작/리더보드/테마/스크롤 기능에 회귀가 생기면 수정 전 상태로 되돌리는 방향으로 검토
- 브라우저 관찰: name input accepted `wasd` and `abc`; focused game panel accepted `ArrowUp` and moved into running state
- 현재 상태: `DEPLOY_APPROVAL_REQUIRED`
