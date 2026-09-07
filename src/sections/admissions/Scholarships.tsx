import { Band } from "../../components/Canvas";

const CARDS = [
  { title: "대통령과학장학금", value: "선발제", sub: null, note: "국가 이공계 최우수 장학", left: 518 },
  { title: "국가장학금", value: "소득기준", sub: null, note: "소득 기준 국가 지원", left: 972 },
  { title: "AX캡스톤 연구비", value: "프로젝트", sub: "단위 지원", note: "AX캡스톤 참여 학생", left: 1426 },
];

const TAGS = [
  { label: "등록금·생활장학", left: 634, width: 96 },
  { label: "연구(GPU·클라우드·산업데이터)", left: 742, width: 176 },
  { label: "국제화(해외연수·국제공동연구)", left: 930, width: 160 },
  { label: "지도·경력(산학전담지도·기업인턴십)", left: 1102, width: 184 },
];

/*
  Every card is an outer positioning shell plus an inner surface. The band's
  reveal owns the shell's transform, so the CSS hover lift has to live on the
  inner element or gsap's inline transform would win.
*/
const SURFACE =
  "relative h-full w-full overflow-hidden rounded-[16px] transition-[transform,background-color] duration-300 ease-out motion-safe:hover:-translate-y-[6px]";

export function Scholarships() {
  return (
    <Band top={1184} height={1080} className="bg-black" reveal={{ stagger: 0.09 }}>
      <p className="wdth-100 absolute left-0 top-[204.5px] w-[1920px] text-center text-[13px] font-extrabold leading-[normal] text-accent">
        02 — 장학 프로그램
      </p>
      <p className="wdth-100 absolute left-0 top-[240.5px] w-[1920px] text-center text-[32px] font-extrabold leading-[normal] text-white">
        네 가지 방식으로 학업을 지원합니다.
      </p>

      {/* Featured card — 20px taller and pulled up, with an accent outline. */}
      <div className="absolute left-[64px] top-[324.5px] h-[480px] w-[430px]">
        <div className={`${SURFACE} border-2 border-solid border-accent bg-[#002614] hover:bg-[#00311a]`}>
          <p className="wdth-100 absolute left-[30px] top-[30px] w-[366px] text-[18px] font-extrabold leading-[normal] text-accent">
            장영실AI펠로우십
          </p>
          <p className="wdth-100 absolute left-[30px] top-[98px] w-[366px] text-[40px] font-black leading-[normal] text-white">
            PNU AX 1000·100·10
          </p>
          <p className="wdth-100 absolute left-[30px] top-[146px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-[#999]">
            연계 선발
          </p>
          <p className="wdth-100 absolute left-[30px] top-[388px] w-[366px] text-[15px] font-normal leading-[normal] text-[#999]">
            정예연구 10 트랙 선발자 대상 연구비 지원
          </p>
        </div>
      </div>

      {CARDS.map(({ title, value, sub, note, left }) => (
        <div
          key={title}
          className="absolute top-[344.5px] h-[480px] w-[430px]"
          style={{ left: `${left}px` }}
        >
          <div className={`${SURFACE} bg-[#141414] hover:bg-[#1c1c1c]`}>
            <p className="wdth-100 absolute left-[32px] top-[32px] w-[366px] text-[18px] font-extrabold leading-[normal] text-white">
              {title}
            </p>
            <p className="wdth-100 absolute left-[32px] top-[100px] w-[366px] text-[40px] font-black leading-[normal] text-white">
              {value}
            </p>
            {sub && (
              <p className="wdth-100 absolute left-[32px] top-[148px] text-[14px] font-normal leading-[normal] whitespace-nowrap text-[#999]">
                {sub}
              </p>
            )}
            <p className="wdth-100 absolute left-[32px] top-[390px] w-[366px] text-[15px] font-normal leading-[normal] text-[#999]">
              {note}
            </p>
          </div>
        </div>
      ))}

      <p className="wdth-100 absolute left-0 top-[854.5px] w-[1920px] text-center text-[15px] font-normal leading-[normal] text-muted-dark">
        장영실AI펠로우십은 PNU AX 1000·100·10 프로그램과 연계해 정예연구 트랙
        선발자에게 연구비를 지원하며, 국가장학금·대통령과학장학금과 중복 수혜가
        가능합니다.
      </p>
      <p className="wdth-100 absolute left-0 top-[905px] h-[40px] w-[1900px] text-center text-[13px] font-normal leading-[normal] text-muted">
        ※ 장영실AI펠로우십은 대학원(석사·박사·통합과정) 재학생 대상 PNU AX 10
        정예연구트랙 지원제도로, 대학원혁신실이 통합 관리합니다. 선정기준:
        국제학술대회 논문·AX 특허·기술이전·실증·연구계획·지도교수 추천
        종합평가(5대 공통역량 보조평가). 펠로우는 PNU AX 산학연 얼라이언스(PNU AX Alliance)로
        논문·특허·데이터셋을 축적합니다.
      </p>

      {TAGS.map(({ label, left, width }) => (
        <div
          key={label}
          className="absolute top-[960px] h-[32px] overflow-hidden rounded-[16px] border border-solid border-[#008040] bg-[#1a1a1a] transition-colors duration-300 hover:bg-[#232323]"
          style={{ left: `${left}px`, width: `${width}px` }}
        >
          <p
            className="wdth-100 absolute left-0 top-[8px] h-[16px] text-center text-[12px] font-extrabold leading-[normal] text-accent"
            style={{ width: `${width}px` }}
          >
            {label}
          </p>
        </div>
      ))}
    </Band>
  );
}
