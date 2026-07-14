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

- 현재 상태: `DEPLOY_APPROVAL_REQUIRED`
- 완료한 루프: 2회차까지 완료
- 다음 루프: 사용자 배포 승인 대기
- 현재 Retry 횟수: 2
- 현재 오류 fingerprint: 없음
- Blocker: 없음
- 마지막 정상 상태: `NODE_PATH=$(npm root -g) node /tmp/verify_portfolio.js` 최종 통과 상태

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

