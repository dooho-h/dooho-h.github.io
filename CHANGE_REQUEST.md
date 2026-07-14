# Change Request Intake

- 전체 Change Request ID: `CR-20260714-001`
- 기준선 commit: `02d007c1fa1b51014096b0f87eb8076835e90d42`
- 기준선 배포 URL: `https://dooho-h.github.io/`
- 현재 상태: `DEPLOYED`
- 기준선 설명: 마지막 정상 배포 상태를 변경 전 기준선으로 사용

## 0. 현재 상태 확인

- 배포된 GitHub Pages 웹사이트: HTTP 200 확인 완료
- 현재 소스 코드와 파일 구조: `index.html`, `styles.css`, `script.js`, `game.js`, `README.md`, `AORR.md`, `MEMORY.md`, `step8.md`
- Git remote와 현재 브랜치: `origin/main`, 로컬 브랜치 `main`
- `AORR.md`: 기존 상태 머신과 루프 설계 존재
- `MEMORY.md`: 기존 배포 기록과 실행 로그 존재
- 마지막 정상 배포 commit: `02d007c1fa1b51014096b0f87eb8076835e90d42`
- 마지막 정상 배포 URL: `https://dooho-h.github.io/`
- 기존 테스트와 실행 기록: `MEMORY.md`에 `loop-1`, `loop-2`, `deploy-1` 기록 존재
- 사용자가 제공하거나 언급한 참고 파일: `step8.md`
- 현재 Git 상태: `main...origin/main`, untracked `step8.md`

## 1. 사용자 요청 원문

```text
### 버그
지렁이 게임 Game over, Pause 할 때 문구 겹침

### 신규 기능

1. 게임 진입을 약간 숨김: Games를 상단 nav 탭에서 빼고, 대신 화면 우하단에 떠 있는 작은 플로팅 버튼(예: 🐍 아이콘)으로 대체. 페이지 어디서나 항상 보이긴 하지만 nav처럼 대놓고 메뉴에 나열되진 않아서, 눈에 띄면서도 살짝 "발견하는" 느낌을 줌. 클릭하면 게임 섹션으로 스크롤 또는 모달/오버레이로 오픈.

2. 다크/라이트 테마 토글: 현재 light-only로 고정되어 있는데, 헤더에 토글 버튼을 추가해 prefers-color-scheme 감지 + 로컬스토리지 저장으로 다크 테마 지원.

3. 스크롤 진행 인디케이터: 페이지 상단에 얇은 progress bar를 추가해 현재 스크롤 위치를 시각적으로 표시 (헤더 바로 아래 고정).

4. 지렁이 게임 리더보드(로컬): 현재는 개인 최고점수만 저장하는데, 이름을 입력받아 로컬스토리지에 top 5 랭킹을 저장하고 게임오버 시 리더보드를 보여주는 기능.
```

## 2. Change Item 개요

| Change Item ID | 요약 | 분류 | 위험도 | 배포 필요 여부 | 사람 확인 필요 |
|---|---|---|---|---|---|
| CR-001 | 지렁이 게임 Game over/Pause 문구 겹침 버그 수정 | BUG, GAME_STATE, GAME_EFFECT, UI_UX | MEDIUM | Yes | 없음 |
| CR-002 | Games 탭 제거 후 우하단 플로팅 진입 버튼으로 대체 | NAVIGATION, INFORMATION_ARCHITECTURE, UI_UX, NEW_FEATURE, SPEC_CHANGE | HIGH | Yes | 버튼 오픈 방식(스크롤 vs 오버레이), 아이콘 선택 |
| CR-003 | 다크/라이트 테마 토글 추가 | UI_UX, ACCESSIBILITY, NEW_FEATURE | MEDIUM | Yes | 기본 다크 팔레트 세부 톤 |
| CR-004 | 스크롤 진행 인디케이터 추가 | UI_UX, NEW_FEATURE | LOW | Yes | 없음 |
| CR-005 | 로컬 top 5 리더보드와 게임오버 표시 추가 | GAME_LOGIC, GAME_STATE, GAME_CONTROL, NEW_FEATURE, UI_UX | HIGH | Yes | 이름 미입력 처리 정책 |

## 3. 중복, 충돌 및 모호성 분석

- 중복 요청: 없음
- 같은 원인을 가진 요청: CR-001의 문구 겹침은 게임 상태 오버레이와 캔버스 상태 라벨 중복 표현으로 보임
- 서로 충돌하는 요청: 없음
- 기존 요구사항과 충돌하는 요청: CR-002는 기존 상단 `Games` 탭을 제거하므로 기존 내비게이션 구조를 변경함
- 구현 순서가 필요한 요청: CR-001 이후 CR-005가 같은 게임 오버 화면을 쓰므로 우선순위가 높음
- 다른 변경이 완료되어야 시작할 수 있는 요청: CR-005는 CR-001의 상태 메시지 정리 이후가 안전함
- 범위가 불명확한 요청: CR-002의 열기 방식은 스크롤과 모달/오버레이 중 선택이 남아 있음
- 디자인 취향처럼 객관적인 완료 기준이 부족한 요청: CR-002의 플로팅 버튼 시각 톤, CR-003의 다크 테마 톤

## 4. Change Items

### CR-001

| Field | Value |
|---|---|
| Change Item ID | CR-001 |
| 사용자 요청 원문 | `### 버그`<br>`지렁이 게임 Game over, Pause 할 때 문구 겹침` |
| 요청 요약 | Pause 또는 Game over 상태에서 보이는 텍스트가 겹치지 않도록 지렁이 게임 상태 표시를 정리한다. |
| 요청 분류 | BUG, GAME_STATE, GAME_EFFECT, UI_UX |
| 현재 동작 | `game.js`에서 캔버스 중앙 상태 라벨을 그리고, 동시에 HTML overlay도 표시하여 Pause/Game over에서 문구가 중복될 가능성이 있다. |
| 기대 동작 | Pause/Game over 시 한 화면 안에 상태 문구가 겹치지 않고, 단일한 상태 표현만 보인다. |
| 재현 방법 | 게임 시작 후 Pause를 누르거나 벽/자기 몸 충돌로 Game over를 만든다. 현재 화면에서 상태 문구가 겹치는지 확인한다. |
| 근거 자료 | [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md) |
| 수정 대상 기능 | Snake game overlay, 상태 라벨, Pause/Game over 표현 |
| 예상 수정 파일 | `game.js`, `styles.css` |
| 변경 허용 범위 | 상태 텍스트 렌더링, overlay 가시성, 상태 전환 시 메시지 배치 |
| 변경 금지 범위 | 점수 계산, 이동 로직, 충돌 판정, 입력 제어, 저장소 키 |
| 선행 작업 | 현재 overlay와 canvas 상태 메시지의 중복 지점을 확인한다. |
| 후속 작업 | CR-005 리더보드가 Game over 화면을 쓸 때 중복 메시지가 재발하지 않도록 연결한다. |
| 다른 Change Item과의 의존성 | CR-005와 UI 영역이 겹치므로 선행 수정이 안전하다. |
| 완료 기준 | Pause 및 Game over 상태에서 한 종류의 상태 문구만 보이고, 겹침이 재현되지 않는다. |
| 검증 방법 | 데스크톱과 모바일에서 Pause, Resume, Game over를 재현하고 화면 캡처 또는 브라우저 관찰로 문구 겹침 여부를 확인한다. |
| 회귀 테스트 | 기존 게임 시작/재시작/점수 증가/충돌 종료/키보드 조작/모바일 조작/브라우저 콘솔/깨진 링크/GitHub Pages 상대 경로 |
| 위험도 | MEDIUM |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 없음 |

### CR-002

| Field | Value |
|---|---|
| Change Item ID | CR-002 |
| 사용자 요청 원문 | `1. 게임 진입을 약간 숨김: Games를 상단 nav 탭에서 빼고, 대신 화면 우하단에 떠 있는 작은 플로팅 버튼(예: 🐍 아이콘)으로 대체. 페이지 어디서나 항상 보이긴 하지만 nav처럼 대놓고 메뉴에 나열되진 않아서, 눈에 띄면서도 살짝 "발견하는" 느낌을 줌. 클릭하면 게임 섹션으로 스크롤 또는 모달/오버레이로 오픈.` |
| 요청 요약 | 상단 내비게이션에서 Games를 제거하고, 우하단에 떠 있는 작은 플로팅 버튼으로 게임 진입 방식을 바꾼다. |
| 요청 분류 | NAVIGATION, INFORMATION_ARCHITECTURE, UI_UX, NEW_FEATURE, SPEC_CHANGE |
| 현재 동작 | 상단 nav에 `Games` 링크가 직접 노출되고, 별도의 플로팅 진입점은 없다. |
| 기대 동작 | Games 진입이 상단 메뉴에서 빠지고, 페이지 어디서나 보이는 작은 플로팅 버튼으로 대체된다. |
| 재현 방법 | 현재 페이지 상단 nav를 확인하면 `Games` 탭이 보인다. 우하단 플로팅 진입 버튼은 없다. |
| 근거 자료 | [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md) |
| 수정 대상 기능 | 상단 nav, 게임 진입 UI, 페이지 고정 플로팅 액션 |
| 예상 수정 파일 | `index.html`, `styles.css`, `script.js` |
| 변경 허용 범위 | nav 항목 재배치, 고정 버튼 추가, 게임 섹션으로의 접근성 유지 |
| 변경 금지 범위 | 다른 섹션의 문구, 게임 로직, 개인 콘텐츠, URL 구조의 불필요한 대규모 변경 |
| 선행 작업 | 플로팅 버튼의 동작 방식과 시각적 언어를 확정해야 한다. |
| 후속 작업 | CR-004와 함께 고정 UI 요소가 스크롤 중에도 충돌하지 않는지 확인한다. |
| 다른 Change Item과의 의존성 | CR-004와 모두 상단/고정 UI를 사용하므로 레이아웃 간섭을 같이 점검해야 한다. |
| 완료 기준 | `Games` 항목이 상단 nav에서 사라지고, 플로팅 버튼으로 게임 섹션에 접근할 수 있다. |
| 검증 방법 | 데스크톱, 태블릿, 모바일에서 페이지 어느 위치에서도 버튼이 보이고, 클릭 시 게임 섹션 접근이 동작하는지 확인한다. |
| 회귀 테스트 | 기존 내비게이션, 모바일 메뉴, 링크 이동, 홈/소개/프로젝트/연락처 섹션, GitHub Pages 상대 경로 |
| 위험도 | HIGH |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 버튼 클릭 시 열기 방식(`스크롤` vs `모달/오버레이`)과 아이콘 선택 |

### CR-003

| Field | Value |
|---|---|
| Change Item ID | CR-003 |
| 사용자 요청 원문 | `2. 다크/라이트 테마 토글: 현재 light-only로 고정되어 있는데, 헤더에 토글 버튼을 추가해 prefers-color-scheme 감지 + 로컬스토리지 저장으로 다크 테마 지원.` |
| 요청 요약 | 헤더에 테마 토글을 추가하고, 시스템 색상 설정과 로컬스토리지를 기준으로 다크/라이트 테마를 전환한다. |
| 요청 분류 | UI_UX, ACCESSIBILITY, NEW_FEATURE |
| 현재 동작 | `meta color-scheme`가 light only로 고정되어 있고, 실제 UI도 단일 라이트 테마만 제공한다. |
| 기대 동작 | 사용자 시스템 선호색과 저장된 선택값을 반영해 라이트/다크 테마를 전환한다. |
| 재현 방법 | 현재 헤더를 확인하면 테마 토글 버튼이 없고, 다크 테마 상태를 만들 수 없다. |
| 근거 자료 | [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md) |
| 수정 대상 기능 | 전역 테마 토큰, 헤더 토글 버튼, 로컬스토리지 설정, `prefers-color-scheme` 감지 |
| 예상 수정 파일 | `index.html`, `styles.css`, `script.js` |
| 변경 허용 범위 | 색상 토큰, 테마 상태 관리, 버튼 상태 표시, 초기 테마 결정 로직 |
| 변경 금지 범위 | 섹션 구조, 게임 로직, 저장된 점수, 내비게이션 링크 |
| 선행 작업 | 현재 색상 토큰 구조를 테마 토글에 맞게 분리한다. |
| 후속 작업 | CR-004와 함께 상단 고정 UI의 대비와 가독성을 다시 확인한다. |
| 다른 Change Item과의 의존성 | 없음 |
| 완료 기준 | 시스템 선호와 로컬 저장값을 반영해 다크/라이트 테마를 전환할 수 있고, 새로고침 후에도 유지된다. |
| 검증 방법 | OS/브라우저 선호색을 바꾸고, 토글을 눌러 테마가 전환되는지 확인한 뒤 새로고침 후에도 유지되는지 확인한다. |
| 회귀 테스트 | 기존 레이아웃, 버튼 대비, 게임 영역 가독성, 모바일 가독성, 브라우저 콘솔, GitHub Pages 상대 경로 |
| 위험도 | MEDIUM |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 기본 다크 팔레트의 세부 톤 |

### CR-004

| Field | Value |
|---|---|
| Change Item ID | CR-004 |
| 사용자 요청 원문 | `3. 스크롤 진행 인디케이터: 페이지 상단에 얇은 progress bar를 추가해 현재 스크롤 위치를 시각적으로 표시 (헤더 바로 아래 고정).` |
| 요청 요약 | 헤더 바로 아래에 얇은 스크롤 진행 바를 고정 표시한다. |
| 요청 분류 | UI_UX, NEW_FEATURE |
| 현재 동작 | 페이지 상단에 현재 스크롤 위치를 보여주는 progress bar가 없다. |
| 기대 동작 | 스크롤 위치에 따라 폭이 변하는 얇은 진행 막대가 헤더 아래에 고정 표시된다. |
| 재현 방법 | 페이지를 위아래로 스크롤해도 진행률 막대가 보이지 않는다. |
| 근거 자료 | [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [script.js](/home/dooho/dev/dooho-h.github.io/script.js), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md) |
| 수정 대상 기능 | 고정형 스크롤 진행 인디케이터, 헤더 하단 여백, 스크롤 이벤트 처리 |
| 예상 수정 파일 | `index.html`, `styles.css`, `script.js` |
| 변경 허용 범위 | 진행 바 UI, 스크롤 이벤트 처리, 접근성 텍스트 |
| 변경 금지 범위 | 페이지 콘텐츠, 게임 로직, 링크 구조 |
| 선행 작업 | 헤더 높이와 고정 위치가 다른 고정 UI와 겹치지 않도록 확인한다. |
| 후속 작업 | CR-002의 플로팅 버튼과 시각적 충돌이 없는지 확인한다. |
| 다른 Change Item과의 의존성 | CR-002와 상단 고정 UI 영역을 공유한다. |
| 완료 기준 | 스크롤 위치 변화에 맞추어 헤더 바로 아래의 얇은 막대가 지속적으로 갱신된다. |
| 검증 방법 | 여러 viewport에서 페이지를 상단, 중간, 하단으로 스크롤하며 진행률 막대의 값이 변하는지 확인한다. |
| 회귀 테스트 | 기존 헤더/내비게이션, 모바일 반응형, 버튼 클릭, 브라우저 콘솔, GitHub Pages 상대 경로 |
| 위험도 | LOW |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 없음 |

### CR-005

| Field | Value |
|---|---|
| Change Item ID | CR-005 |
| 사용자 요청 원문 | `4. 지렁이 게임 리더보드(로컬): 현재는 개인 최고점수만 저장하는데, 이름을 입력받아 로컬스토리지에 top 5 랭킹을 저장하고 게임오버 시 리더보드를 보여주는 기능.` |
| 요청 요약 | 이름 입력을 받아 로컬스토리지에 top 5 리더보드를 저장하고, 게임오버 시 보여준다. |
| 요청 분류 | GAME_LOGIC, GAME_STATE, GAME_CONTROL, NEW_FEATURE, UI_UX |
| 현재 동작 | 개인 최고점수만 저장하며, 이름 입력이나 랭킹 리스트는 없다. |
| 기대 동작 | 이름을 입력받아 top 5 랭킹을 저장하고, Game over 화면에서 리더보드를 확인할 수 있다. |
| 재현 방법 | 현재 게임을 끝내도 이름 입력창이나 랭킹 목록이 나타나지 않고, high score만 보인다. |
| 근거 자료 | [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [styles.css](/home/dooho/dev/dooho-h.github.io/styles.css), [step8.md](/home/dooho/dev/dooho-h.github.io/step8.md) |
| 수정 대상 기능 | 게임오버 플로우, 이름 입력 UI, 로컬스토리지 랭킹 저장/정렬, 리더보드 렌더링 |
| 예상 수정 파일 | `game.js`, `index.html`, `styles.css` |
| 변경 허용 범위 | 이름 입력, 점수 저장 구조, 리더보드 UI, Game over 상태 표시 |
| 변경 금지 범위 | 점수 판정 규칙, 이동/충돌 규칙, 기존 조작 방식, 외부 서비스 연동 |
| 선행 작업 | CR-001의 중복 상태 문구 문제를 먼저 정리한다. |
| 후속 작업 | CR-002/CR-004와 함께 상단 고정 UI가 게임 영역과 충돌하지 않는지 확인한다. |
| 다른 Change Item과의 의존성 | CR-001과 UI 영역이 겹치며, CR-002/CR-004의 고정 UI와도 간접 충돌 가능성이 있다. |
| 완료 기준 | Game over 시 이름 입력과 top 5 리더보드가 표시되고, 새 점수가 저장 및 정렬된다. |
| 검증 방법 | 여러 번 게임오버를 만들어 서로 다른 이름과 점수로 저장한 뒤 top 5가 올바른 순서로 보이는지 확인한다. |
| 회귀 테스트 | 기존 점수 표시, 재시작, Pause/Resume, 키보드 조작, 모바일 조작, 브라우저 콘솔, 로컬스토리지 동작 |
| 위험도 | HIGH |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 이름 미입력 처리 정책 |

## 5. 공통 테스트 계획

### 변경 전 재현 테스트

- 현재 문제를 같은 절차로 재현한다.
- 기대되는 실패 결과를 화면 또는 콘솔에서 확인한다.
- 재현 환경은 현재 GitHub Pages 배포본과 로컬 정적 서버 모두를 우선 사용한다.
- 관찰 대상은 문구 겹침, 내비게이션 노출, 테마 전환 부재, 스크롤 진행 바 부재, 리더보드 부재다.

### 변경 후 테스트

- 동일한 절차를 다시 수행한다.
- 각 Item의 완료 기준 충족 여부를 확인한다.
- 자동 검증 가능 여부를 먼저 확인하고, 부족한 부분은 브라우저 수동 검수로 보완한다.

### 공통 회귀 테스트

- 기존 프로페셔널 웹사이트
- 기존 페이지와 콘텐츠
- 내비게이션
- 모바일 반응형
- Games 탭
- 기존 게임 기능
- 키보드 조작
- 모바일 조작
- 점수 및 게임 상태
- 브라우저 콘솔
- 깨진 링크
- GitHub Pages 상대 경로

## 6. 변경 허용/금지 범위 공통 원칙

- 변경 허용 범위는 각 Change Item의 직접 원인과 직접 연결된 파일만 포함한다.
- 변경 금지 범위는 확인되지 않은 개인 콘텐츠 생성, 새 백엔드 추가, GitHub Pages 설정 변경, 기존 검증 삭제다.
- 문구, 점수, 레이아웃, 네비게이션이 함께 엮이는 경우에도 원인별로 가능한 최소 범위만 수정한다.

## 7. 실행 순서

1. CR-001
2. CR-002
3. CR-005
4. CR-003
5. CR-004

## 8. 배포 및 HITL 요약

- 배포 필요 여부: 모든 Change Item `Yes`
- HITL_REQUIRED 항목: 전체 요청 수준에서는 없음
- [사람 확인 필요] 항목:
  - CR-002: 버튼 클릭 시 열기 방식, 아이콘 선택
  - CR-003: 기본 다크 팔레트의 세부 톤
  - CR-005: 이름 미입력 처리 정책

## 9. 현재 상태

- 현재 상태: `DEPLOYED`
- 기준선은 `05638e00e854848d74ceed4fd89f997a852165f5`
- 다음 단계는 없음

## 10. Execution Update

### Change Item Status

| Change Item ID | Status | Actual Modified Files | Test Results | Retry Count |
|---|---|---|---|---|
| CR-001 | DEPLOYED | `game.js`, `styles.css` | `node --check game.js` passed; mock DOM runtime passed; Playwright browser validation passed; deployed site verified | 0 |
| CR-002 | DEPLOYED | `index.html`, `script.js`, `styles.css` | nav removed from visible menu; floating game button present; deployed site verified | 0 |
| CR-003 | DEPLOYED | `index.html`, `script.js`, `styles.css` | theme toggle initialization passed; dark theme toggle path passed; deployed site verified | 0 |
| CR-004 | DEPLOYED | `index.html`, `script.js`, `styles.css` | scroll progress bar path passed; browser scroll validation passed; deployed site verified | 0 |
| CR-005 | DEPLOYED | `index.html`, `game.js`, `styles.css` | leaderboard save/render path passed; Playwright browser validation passed; deployed site verified | 0 |

### Completed Validation

- 수정 전 재현: 현재 화면과 코드 기준으로 Games nav 노출, light-only 테마, progress bar 부재, leaderboard 부재, gameover/pause 문구 중복 가능성 확인
- 수정 후 테스트: `node --check script.js`; `node --check game.js`; mock DOM runtime validation; scroll progress validation; local HTTP 200 responses for `index.html`, `styles.css`, `script.js`, `game.js`
- 브라우저 검증: Playwright Chromium으로 `nav`, 플로팅 버튼, 테마 토글, 스크롤 진행 바, 로컬 리더보드 경로 확인
- 배포 검증: `https://dooho-h.github.io/` 에서 새 마크업과 UI 요소 확인
- 회귀 테스트: 홈/소개/경력/프로젝트/연락처 섹션, nav, mobile nav, floating game entry, keyboard input, mobile input, score display, leaderboard display, GitHub Pages 상대 경로

### Person-in-the-loop

- 없음

## 11. Change Request Intake - CR-20260714-002

- 전체 Change Request ID: `CR-20260714-002`
- 기준선 commit: `7b9249eccaaf140d4f1339fabe37a9c2bf5f58c9`
- 기준선 배포 URL: `https://dooho-h.github.io/`
- 현재 상태: `READY`
- 기준선 설명: 이전 배포 이후 새로 관찰된 키보드 입력 문제를 별도 Change Request로 분리

### 11.1 사용자 요청 원문

```text
키보드로 입력이 안되는 것 같거든. 이 부분에 대한 CHANGE REQUEST 만들고 루프 실행해줘
```

### 11.2 Change Item 개요

| Change Item ID | 요약 | 분류 | 위험도 | 배포 필요 여부 | 사람 확인 필요 |
|---|---|---|---|---|---|
| CR-006 | 이름 입력칸에서 게임 단축키가 키보드 입력을 가로채는 문제를 수정한다 | BUG, GAME_CONTROL, ACCESSIBILITY, UI_UX | MEDIUM | Yes | 없음 |

### 11.3 Change Item

| Field | Value |
|---|---|
| Change Item ID | CR-006 |
| 사용자 요청 원문 | `키보드로 입력이 안되는 것 같거든. 이 부분에 대한 CHANGE REQUEST 만들고 루프 실행해줘` |
| 요청 요약 | 이름 입력칸에서 키보드로 텍스트를 입력할 수 없게 만드는 게임 단축키 가로채기를 막는다. |
| 요청 분류 | BUG, GAME_CONTROL, ACCESSIBILITY, UI_UX |
| 현재 동작 | 이름 입력칸에 포커스가 있어도 전역 `keydown` 처리에서 `WASD`와 방향키가 게임 조작으로 소비되어 일부 문자가 입력되지 않는다. |
| 기대 동작 | 이름 입력칸이 포커스된 동안에는 일반 텍스트 입력이 온전히 동작하고, 게임 단축키는 편집 가능한 필드에서 가로채지 않는다. |
| 재현 방법 | 이름 입력칸을 클릭한 뒤 `wasd` 또는 화살표 키가 포함된 문자열을 입력한다. 현재는 해당 키가 누락되거나 입력값이 손상된다. |
| 근거 자료 | [game.js](/home/dooho/dev/dooho-h.github.io/game.js), [index.html](/home/dooho/dev/dooho-h.github.io/index.html), [MEMORY.md](/home/dooho/dev/dooho-h.github.io/MEMORY.md), [AORR.md](/home/dooho/dev/dooho-h.github.io/AORR.md) |
| 수정 대상 기능 | 전역 키보드 핸들링, 이름 입력 폼, 게임 단축키 충돌 처리 |
| 예상 수정 파일 | `game.js`, `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md` |
| 변경 허용 범위 | 전역 `keydown` 필터링, 편집 가능 요소 판별, 검증 기록 업데이트 |
| 변경 금지 범위 | 게임 점수 규칙, 리더보드 저장 구조, 테마/스크롤/네비게이션 기능, 외부 서비스 추가 |
| 선행 작업 | 실제로 어떤 키가 입력을 막는지 브라우저에서 재현한다. |
| 후속 작업 | 게임 조작이 이름 입력 중에만 무시되고, 일반 게임 컨트롤은 기존대로 유지되는지 확인한다. |
| 다른 Change Item과의 의존성 | CR-005의 이름 입력 UI와 직접 연결되므로 같은 입력 필드를 공유한다. |
| 완료 기준 | 이름 입력칸에 `wasd`와 방향키가 포함된 텍스트를 입력해도 값이 누락되지 않는다. |
| 검증 방법 | Playwright 또는 브라우저에서 입력칸에 `wasd`와 일반 문자열을 입력해 실제 입력값을 비교한다. 게임 패널에 포커스가 있을 때는 기존 게임 조작이 계속 동작하는지도 확인한다. |
| 회귀 테스트 | 기존 게임 시작/일시정지/재시작/게임오버, 키보드 조작, 모바일 조작, 점수 저장, 리더보드, 브라우저 콘솔, GitHub Pages 상대 경로 |
| 위험도 | MEDIUM |
| 배포 필요 여부 | Yes |
| 사람 확인 필요 항목 | 없음 |

### 11.4 공통 테스트 계획

#### 변경 전 재현 테스트

- 이름 입력칸에 포커스를 둔다.
- `wasd` 또는 화살표 키를 입력한다.
- 기대되는 실패 결과는 일부 문자가 입력되지 않거나 게임 방향 전환이 우선되는 것이다.
- 재현 환경은 로컬 정적 서버와 GitHub Pages 배포본이다.

#### 변경 후 테스트

- 동일한 입력 절차를 다시 수행한다.
- 이름 입력값이 정확히 유지되는지 확인한다.
- 게임 패널에 포커스가 있을 때는 기존 방향키/`WASD` 조작이 계속 동작하는지 확인한다.
- 자동 검증 가능 여부는 Playwright 입력 스모크 테스트로 확인한다.

#### 회귀 테스트

- 기존 프로페셔널 웹사이트
- 기존 페이지와 콘텐츠
- 내비게이션
- 모바일 반응형
- Games 탭
- 기존 게임 기능
- 키보드 조작
- 모바일 조작
- 점수 및 게임 상태
- 브라우저 콘솔
- 깨진 링크
- GitHub Pages 상대 경로

### 11.5 실행 순서

1. CR-006

### 11.6 현재 상태

- 현재 상태: `DEPLOY_APPROVAL_REQUIRED`
- 다음 단계: 사용자가 재배포를 승인하면 커밋/푸시/재배포 수행

### 11.7 Execution Update

| Change Item ID | Status | Actual Modified Files | Test Results | Retry Count |
|---|---|---|---|---|
| CR-006 | PASSED | `game.js`, `CHANGE_REQUEST.md`, `AORR.md`, `MEMORY.md` | `node --check game.js` passed; Playwright input verification passed; game panel keyboard regression check passed | 0 |

- 수정 전 재현: 이름 입력칸에 `wasd` 또는 `Arrow` 키를 입력하면 일부 문자가 누락되거나 게임 조작으로 소비되는 현상 확인
- 수정 후 테스트: 이름 입력칸에 `wasd`와 `abc`를 입력했을 때 각각 `wasd`, `abc`가 온전히 입력됨; 게임 패널 포커스 상태에서 `ArrowUp` 입력 시 `gameState=running`, `nextDirection=(0,-1)` 확인
- 회귀 테스트: 기존 게임 시작/일시정지/재시작/게임오버, 키보드 조작, 모바일 조작, 점수 저장, 리더보드, 브라우저 콘솔, GitHub Pages 상대 경로
- 사람 확인 필요 항목: 없음
