# PNU AI College

부산대학교 AI대학 웹사이트. Figma 파일 `DL6FSuNFgjdKZkEStGBoZR`의 데스크톱
프레임 5개 + 모바일/태블릿 프레임 2개 + 사이드바 메뉴를 구현했습니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## 페이지

| 라우트 | Figma 프레임 | 크기 |
| --- | --- | --- |
| `/` | Desktop - 3 (67:564) | 1920 × 15633 |
| `/` (≤ 639px) | Mobile - 390 (26:77) | 390 × 4712 |
| `/` (640–1023px) | Tablet - 834 (27:161) | 834 × 3406 |
| `/overview` | Desktop - Overview (136:504) | 1920 × 7396 |
| `/departments` | Desktop - Departments (118:424) | 1920 × 4156 |
| `/education-research` | Desktop - Education Research (145:579) | 1920 × 12796 |
| `/admissions-career` | Desktop - Admissions Career (146:1026) | 1920 × 7396 |

Departments의 AX 클러스터 카드와 Education·Research의 학과 카드를 누르면 상세
오버레이가 열립니다 (`AX Detail Overlay K0~K4`, `Faculty Detail Overlay` 5종).
Figma에는 오버레이가 프레임 10개로 따로 그려져 있는데, 카드와 같은 데이터를
쓰므로 각각 하나의 컴포넌트로 합쳤습니다 — 표 데이터는 한 곳에만 정의됩니다.

햄버거 버튼을 누르면 사이드바가 열립니다 (`Sidebar Overlay` 프레임 5종).
Figma에는 페이지별로 하나씩 정적 프레임이 있는데, 활성 그룹과 플라이아웃만
다르므로 하나의 인터랙티브 컴포넌트로 합쳤습니다 — 해당 페이지의 그룹이 기본
활성이고, 다른 그룹에 마우스를 올리면 플라이아웃이 바뀝니다.

## 이미지·영상 에셋

배경 에셋은 Higgsfield로 제작했습니다. 스틸은 GPT Image 2, 영상은 그 스틸을
**시작 프레임이자 종료 프레임**으로 넣은 Seedance 2.0 image-to-video입니다
(첫 프레임과 끝 프레임이 같아야 `loop`가 끊겨 보이지 않습니다).

| 에셋 | 위치 | 영상 |
| --- | --- | --- |
| `hero-portrait.png` | 01 Hero — 로봇 | ✅ |
| `adpx-splash.png` | 03 ADP+X — Metallic Paint 배경 | ✅ |
| `adpx-card-1.png` | 03 ADP+X 카드 — Satellite | — |
| `adpx-card-4.png` | 03 ADP+X 카드 — Random Visual | — |
| `launch-2027.png` | 13 Launch 배경 | — |
| `stats-visual.png` | 02 Statistics | ✅ (교체 대상 아님) |
| `education.png` | 06 Education | ✅ (교체 대상 아님) |

**알파 처리** — 원본 PNG는 대부분 배경이 투명한 컷아웃인데 영상에는 알파가
없습니다. 그래서 영상용 시작 프레임은 각 섹션의 실제 배경색(#E3E3E3 / #000 /
#FFF)과 `object-cover` 크롭을 그대로 재현해 평탄화한 뒤 넣었습니다. Hero 스틸도
생성 결과의 배경 톤(238)을 섹션색 227로 균일 보정해, 이미지와 밴드 경계에
사각형 자국이 남지 않게 했습니다.

`launch-2027.png`는 섹션색과 상단 페이드를 에셋에 미리 합성했습니다. 빛나는
지평선이 마일스톤 레일 아래로 가고 위쪽 텍스트는 near-black 위에 놓입니다.

`MediaBackdrop`이 영상과 스틸을 함께 다룹니다. poster가 영상의 첫 프레임이라
전환이 보이지 않고, reduced-motion이거나 파일 로드가 실패하면 스틸로 남습니다.

## 모션

GSAP + ScrollTrigger + Lenis. anime.js는 쓰지 않았습니다 — GSAP과 하는 일이
완전히 겹쳐서 트윈 엔진을 두 벌 넣을 이유가 없었습니다.

```
src/motion/gsap.ts         플러그인 등록 + prefersReducedMotion()
src/motion/SmoothScroll.tsx  Lenis 프로바이더 (gsap.ticker로 구동)
src/motion/lenis.ts          useLenis / useScrollLock (오버레이 열릴 때 배경 스크롤 정지)
src/motion/ScrollReset.tsx   라우트 이동 시 최상단 + ScrollTrigger.refresh()
src/motion/useReveal.ts      섹션 진입 리빌 (Band의 reveal prop이 사용)
src/motion/useScrub.ts       스크롤 스크럽 (패럴랙스·드리프트)
src/motion/CountUp.tsx       숫자 카운트업
```

Lenis는 자체 RAF 루프 대신 `gsap.ticker`로 구동합니다. 루프가 둘이면 스크럽
애니메이션이 미세하게 떨립니다.

**핀(pin)은 쓰지 않습니다.** 캔버스에 `transform: scale()`이 걸려 있어
ScrollTrigger의 pinning이 요소 위치를 잘못 잡습니다. 스크럽·리빌은 영향받지
않습니다. 대신 스케일이 바뀔 때(창 크기 변경) `ScrollTrigger.refresh()`를
`Canvas`에서 호출합니다.

리빌은 `gsap.from`이 아니라 **`fromTo` + `immediateRender: false`**를 씁니다.
`from`은 트윈을 만드는 순간 요소를 숨기기 때문에, 트리거가 어떤 이유로든 발화하지
않으면 콘텐츠가 영영 안 보이게 됩니다. 이 방식은 트리거가 실제로 돌기 전까지
섹션이 정상 렌더됩니다.

랜딩 시네마틱: Hero 패럴랙스, ARISE·PNU 드리프트 + 통계 카운트업, ADPX 스플래시
확장 + 자간 확장, ADPX 카드 가로 흐름, Academics 카드/워드마크 역방향 드리프트,
Growth·Launch 타임라인 라인 드로잉, Admission 정원 카운트업. 나머지 섹션과
서브페이지 4개는 공통 리빌(페이드 + y 24px, stagger)만 씁니다.

`prefers-reduced-motion: reduce`면 Lenis를 켜지 않고 모든 애니메이션 훅이 즉시
반환합니다 — 요소는 최종 상태로 렌더됩니다.

## 구현 방식

각 프레임이 고정 폭 캔버스이므로, Figma의 좌표·크기 값을 **px 그대로** 쓰고
캔버스 전체를 뷰포트 폭에 맞춰 균일하게 `transform: scale()` 합니다
(`src/components/Canvas.tsx`). 어떤 창 크기에서도 디자인과 1:1로 비례가
유지되고, 값을 눈대중으로 환산하며 생기는 오차가 없습니다.

```
src/components/Canvas.tsx      스케일링 캔버스 + 섹션 밴드(Band) + useCanvasScale
src/components/Navigation.tsx  상단 네비 + 햄버거
src/components/Sidebar.tsx     사이드바 오버레이 (뷰포트 고정 → body로 portal)
src/components/Modal.tsx       상세 오버레이 공용 모달 (동일 스케일 재적용)
src/components/Footer.tsx      공용 푸터
src/pages/*.tsx                페이지 = Figma 프레임 1개
src/sections/<page>/*.tsx      섹션 1개 = 파일 1개, Figma 프레임 순서와 동일
src/hooks/useViewport.ts       모바일/태블릿/데스크톱 브레이크포인트
public/assets/*                Figma에서 받은 이미지 원본
src/index.css                  디자인 토큰(--color-accent 등) + 타이포
```

## 폰트

| 디자인 | 구현 |
| --- | --- |
| Mona Sans | Mona Sans (Google Fonts, wght + wdth 가변축) |
| Inter | Inter (Google Fonts) — 네비게이션 / 푸터 링크 |
| Coolvetica | Mona Sans `weight 625 / width 88%` (`.display-type`) |

Coolvetica는 웹폰트로 제공되지 않아 대체했습니다. 대체값은 Figma 텍스트 노드의
실제 advance width(`Intelligence,` 1223px, `Reimagined.` 1239px, `A/D/P/X`
322/304/268/303px)와 획 두께(250px에서 34px)에 맞춰 피팅한 값입니다. 로컬에
Coolvetica가 설치돼 있으면 그쪽이 먼저 쓰입니다. 한글은 Pretendard(jsDelivr
CDN)로 폴백합니다.

## 디자인 원본을 그대로 둔 것

- **Academics 카드 반복** — 랜딩/모바일/태블릿의 학과 카드 일부가 Figma에서도
  같은 플레이스홀더(`DATA SCIENCE` / 달마시안 사진)로 반복돼 있습니다.
- **모바일·태블릿 통계 배경 이미지** — Figma에서 `x = -390` / `x = -400`으로
  캔버스 밖에 놓여 있어 보이지 않습니다. 그대로 뒀습니다.

## 디자인과 의도적으로 다르게 한 것

- **사이드바 교육·연구 플라이아웃 높이** — Figma 프레임은 330px 고정인데 항목이
  11개로 늘어 6개가 잘립니다. 항목 수에서 높이를 계산하도록 했습니다.

## 남은 것

- **모바일·태블릿 프레임의 범위** — Figma의 Mobile-390 / Tablet-834는 구버전
  기준이라 Hero · Statistics · ADPX · Academics · Education 5개 섹션만 있습니다.
  현재 데스크톱 랜딩은 16개 섹션이고, 서브페이지 4개는 모바일 디자인이 없습니다.
  디자인이 있는 만큼만 구현했으므로, 작은 화면에서는 랜딩이 5개 섹션이고
  서브페이지는 데스크톱 캔버스가 축소돼 보입니다.
- **Desktop - 2** (1920 × 14304) — Desktop-3로 대체된 이전 랜딩이라 건너뛰었습니다.

## 참고

Figma 파일이 작업 중 여러 번 편집되었습니다. 최근 반영한 변경:

- `07 Industry Partnership` · `08 Roadmap 2026-2030` · `09 As-Is To-Be` 3개 섹션이
  **Overview → Education·Research로 이동** (Overview 10636→7396,
  Education·Research 9556→12796)
- `06 Faculty Directory Full` → **`06 Faculty Directory Collapsed`** (학과 카드 5개
  + 클릭 시 전체 명단 오버레이)
- `03 AX Convergence Ecosystem` → **`03 AX Convergence Collapsed`** (클러스터 카드
  5개 + 클릭 시 세부 전공표 오버레이)
- Departments `01 Origin Story` 재작성, Overview 인사말·ADP+X 비전 문구 축약

디자인이 또 바뀌면 페이지 단위 `get_metadata`로 프레임 높이를 먼저 비교하는 것이
가장 빠릅니다 — 높이가 달라진 프레임에 섹션 증감이 있습니다. 높이가 같아도 내부
문구만 바뀌는 경우가 있어, 이전 스냅샷과 노드 목록을 대조하면 확실합니다.
