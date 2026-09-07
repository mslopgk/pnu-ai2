import { Band } from "../../components/Canvas";

const BENEFITS = [
  {
    index: "01",
    title: "장학금",
    body: "장학금 지원이 늘어납니다 — PNU AX 1000·100·10 등 학생 지원 프로그램 확대",
    left: 117,
  },
  {
    index: "02",
    title: "실습환경",
    body: "풍부한 AI 실습 자원이 제공됩니다 — GPU·로봇·API 크레딧 확충",
    left: 545,
  },
  {
    index: "03",
    title: "유연한 학사",
    body: "더 자유롭게 도전할 수 있습니다 — 역량패스형 학점인정·창업학기제·집중수업제로 전통적 학사구조에 얽매이지 않는 성장경로 개척",
    left: 973,
  },
  {
    index: "04",
    title: "빠른 성장",
    body: "빠르게 전문 인재로 성장합니다 — 패스트트랙·URP·PNU AX 1000·100·10",
    left: 1401,
  },
];

const PROGRAMS = [
  {
    title: "URP (Undergraduate Research Program)",
    body: "3~4학년, 「연구실 매칭 → 학기·방학 연구수행 → 성과 발표」. 연구·학술대회 활동비와 AI 서비스 크레딧 지원, 우수과제는 조기 연구과제로 전환",
    left: 117,
  },
  {
    title: "6년 학·석·박 패스트트랙",
    body: "기존 7년의 학·석·박 연계과정을 학부 7학기·석사 2학기·박사 3학기의 6년 체계로 단축",
    left: 687,
  },
  {
    title: "방학 집중이수 부트캠프",
    body: "방학 중 2·4·8주 초·중·고급 부트캠프, AWS·Google·Microsoft·NVIDIA·NAVER 표준 커리큘럼으로 다분반 운영",
    left: 1257,
  },
];

/*
  The band's reveal owns each card shell's transform, so the CSS hover lift
  lives on an inner surface — otherwise gsap's inline transform would win.
*/
const SURFACE =
  "relative h-full w-full overflow-hidden rounded-[12px] transition-[transform,background-color] duration-300 ease-out motion-safe:hover:-translate-y-[6px]";

export function StudentGrowth() {
  return (
    <Band top={2264} height={1080} className="bg-white" reveal={{ stagger: 0.07 }}>
      <p className="wdth-100 absolute left-[117px] top-[90px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
        03 — 학생 성장 지원
      </p>
      <p className="wdth-100 absolute left-[117px] top-[126px] w-[1200px] text-[34px] font-black leading-[normal] text-ink">
        입학 후, 학생의 하루가 바뀝니다.
      </p>

      {BENEFITS.map(({ index, title, body, left }) => (
        <div
          key={index}
          className="absolute top-[220px] h-[220px] w-[400px]"
          style={{ left: `${left}px` }}
        >
          <div className={`${SURFACE} bg-[#f5f5f5] hover:bg-[#efefef]`}>
            <p className="wdth-100 absolute left-[24px] top-[22px] h-[30px] w-[80px] text-[22px] font-black leading-[normal] text-accent">
              {index}
            </p>
            <p className="wdth-100 absolute left-[24px] top-[60px] h-[28px] w-[352px] text-[18px] font-extrabold leading-[normal] text-ink">
              {title}
            </p>
            <p className="wdth-100 absolute left-[24px] top-[100px] h-[110px] w-[352px] text-[13px] font-normal leading-[normal] text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[490px] h-[26px] w-[600px] text-[18px] font-extrabold leading-[normal] text-ink">
        입학과 동시에 시작되는 실전 프로그램
      </p>

      {PROGRAMS.map(({ title, body, left }) => (
        <div
          key={title}
          className="absolute top-[540px] h-[260px] w-[546px]"
          style={{ left: `${left}px` }}
        >
          <div className={`${SURFACE} border border-solid border-[#e0e0e0] bg-[#e0f7eb] hover:bg-[#d6f2e3]`}>
            <p className="wdth-100 absolute left-[23px] top-[23px] h-[50px] w-[498px] text-[16px] font-extrabold leading-[normal] text-ink">
              {title}
            </p>
            <p className="wdth-100 absolute left-[23px] top-[83px] h-[150px] w-[498px] text-[13px] font-normal leading-[normal] text-muted">
              {body}
            </p>
          </div>
        </div>
      ))}

      <p className="wdth-100 absolute left-[117px] top-[850px] h-[24px] w-[1600px] text-[14px] font-normal leading-[normal] text-muted">
        저학년부터 PNU AX 100 진학트랙을 안내받고, 대학원 진학 시 「PNU AX
        진학브리지 장학」으로 입학·연구 자원을 지원받습니다.
      </p>
    </Band>
  );
}
