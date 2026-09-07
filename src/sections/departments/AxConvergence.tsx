import { useRef, useState } from "react";
import { Band } from "../../components/Canvas";
import { Modal } from "../../components/Modal";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

type Row = [name: string, core: string, bridge: string, depts: string, note: string];

type Cluster = { key: string; title: string; left: number; rows: Row[] };

const CLUSTERS: Cluster[] = [
  {
    key: "K0",
    title: "AI·수리·계산 플랫폼",
    left: 117,
    rows: [
      ["AI융합계산과학", "E-코어+계산과학심화(42)", "인공지능프로그래밍", "학부대학, 화공생명공학과 등", "신규(안)·디지털트윈·AI소재"],
      ["AI·수리데이터과학", "D·E선택+수리·데이터심화(42)", "인공지능 수학적 모델링", "수학과, 통계학과 등", "신규(안)·수학캡스톤"],
    ],
  },
  {
    key: "K1",
    title: "해양·항만·도시 AX",
    left: 457,
    rows: [
      ["해운물류AX", "D-코어+해운물류심화(39)", "해운네트워크AX최적화", "산업공학전공, 산업AI전공", "신규(안)·항만 운영최적화"],
      ["해양금융AX", "L·D선택+해양금융심화(47)", "AI를 활용한 해양금융데이터 분석", "경제학부, 무역학부 등", "신규(안)·해양금융"],
      ["해양도시기후환경AX", "D-코어+해양도시·기후·환경심화(42)", "해양도시 기후·환경 AI 인텔리전스", "대기환경과학과, 해양학과 등", "신규(안)·기후·환경"],
      ["스마트시티", "D-코어+스마트시티심화(42)", "기술변화와 도시", "스마트시티전공, 도시공학과 등", "편제 대상·도시 특화"],
    ],
  },
  {
    key: "K2",
    title: "첨단제조·피지컬AI AX",
    left: 797,
    rows: [
      ["모빌리티·해양AX감각인지", "E-코어+감각인지·모빌리티심화(47)", "피지컬AI 데이터 파이프라인", "광메카트로닉스전공, 미래에너지전공 등", "신규(안)·피지컬AI"],
      ["AI반도체 소자·공정", "E-코어+반도체·공정심화(61)", "AI 기반 나노소자 공정 최적화", "나노소자첨단제조전공 등", "신규(안)·전력반도체"],
      ["산업인공지능", "D·E선택+산업AI심화(42)", "산업AI 개론 등", "산업공학과, 전기공학전공 등", "기존 운영·제조AX"],
      ["지능형로봇AI", "E-코어+지능형로봇심화(42)", "피지컬AI·로봇시스템 설계", "전기공학전공, 전자공학전공 등", "기존 운영·피지컬AI"],
    ],
  },
  {
    key: "K3",
    title: "바이오·라이프 AX",
    left: 1137,
    rows: [
      ["AI·바이오·데이터사이언스", "D-코어+바이오·데이터심화(42)", "바이오 사이언스", "미생물학과", "신규(안)·생태·환경 데이터"],
      ["AX신약", "D-코어+AI·신약심화(21)", "AI 기반 신약개발", "약학과·제약학과", "신규(안)·AI 신약개발"],
      ["애그테크 AX", "L·D선택+애그테크심화(42)", "애그테크 AI 빅데이터", "바이오산업기계공학과 등", "신규(안)·밀양캠퍼스"],
      ["라이프케어산업 AX", "L-코어+라이프케어심화(36)", "생활데이터 서비스기획", "실내환경디자인학과, 식품영양학과 등", "신규(안)·생활데이터 리빙랩"],
    ],
  },
  {
    key: "K4",
    title: "인간·사회·경영 AX",
    left: 1477,
    rows: [
      ["AX휴먼내러티브", "L-코어+휴먼내러티브심화(36)", "AI 스토리텔링과 휴먼내러티브", "국어국문학과, 사학과 등", "신규(안)·인문콘텐츠"],
      ["AX·소셜데이터분석", "L·D선택+사회데이터심화(36)", "AX·소셜데이터분석 기초", "행정학과, 사회학과 등", "신규(안)·사회문제 리빙랩"],
      ["AX 전략경영", "L·D선택+전략경영심화(57)", "AX 전략 의사결정실험실", "경영학과", "신규(안)·기업 데이터"],
    ],
  },
];

const COLUMNS = [
  { left: 40, head: 200, cell: 210, label: "전공명" },
  { left: 260, head: 200, cell: 210, label: "코어교과·학점" },
  { left: 480, head: 260, cell: 270, label: "AI 융합 교과목(브릿지)" },
  { left: 760, head: 320, cell: 330, label: "참여학과" },
  { left: 1100, head: 260, cell: 260, label: "비고" },
];

/* The headline and the cluster row move against each other. */
const DRIFT = [
  { selector: "[data-motion=words]", to: { y: -26 } },
  { selector: "[data-motion=card]", to: { y: 16 } },
];

function DetailOverlay({
  cluster,
  onClose,
}: {
  cluster: Cluster | null;
  onClose: () => void;
}) {
  /*
    No entrance tween here: <Modal> staggers its own surface children, so the
    heading, the column labels and each row group cascade in on open. Keeping
    them as separate top-level children is what makes that cascade work — a
    wrapper element would collapse the whole table into one step.
  */
  return (
    <Modal
      open={cluster !== null}
      width={1400}
      height={760}
      onClose={onClose}
      label={cluster ? `${cluster.key} — ${cluster.title}` : ""}
    >
      {cluster && (
        <>
          <p className="wdth-100 absolute left-[40px] top-[32px] h-[32px] w-[1000px] text-[24px] font-black leading-[normal] text-ink">
            {cluster.key} — {cluster.title}
          </p>

          {COLUMNS.map(({ left, head, label }) => (
            <p
              key={label}
              className="wdth-100 absolute top-[90px] h-[14px] text-[11px] font-extrabold leading-[normal] text-muted"
              style={{ left: `${left}px`, width: `${head}px` }}
            >
              {label}
            </p>
          ))}
          <div className="absolute left-[40px] top-[112px] h-px w-[1320px] bg-[#ebebeb]" />

          {cluster.rows.map((row, r) => (
            <div key={row[0]}>
              {row.map((cell, c) => (
                <p
                  key={c}
                  className={`wdth-100 absolute h-[40px] leading-[normal] ${
                    c === 0
                      ? "text-[12px] font-extrabold text-ink"
                      : "text-[11px] font-normal text-muted"
                  }`}
                  style={{
                    left: `${COLUMNS[c].left}px`,
                    width: `${COLUMNS[c].cell}px`,
                    top: `${130 + r * 48}px`,
                  }}
                >
                  {cell}
                </p>
              ))}
              {/* Figma puts the rule 40px below the row top, not 30px. */}
              <div
                className="absolute left-[40px] h-px w-[1320px] bg-[#ebebeb]"
                style={{ top: `${170 + r * 48}px` }}
              />
            </div>
          ))}
        </>
      )}
    </Modal>
  );
}

/*
  Three nested boxes, one transform each: the <article> takes the band's
  reveal, the middle box the scrubbed parallax, the inner box the CSS hover
  lift. The inner box is also the stagger root for the card's own contents.
*/
function ClusterCard({
  cluster,
  onOpen,
}: {
  cluster: Cluster;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, true, { stagger: 0.05, y: 12 });

  return (
    <article
      className="absolute top-[250px] h-[620px] w-[316px]"
      style={{ left: `${cluster.left}px` }}
    >
      <div data-motion="card" className="h-full w-full">
        <div
          ref={ref}
          className="group relative h-full w-full overflow-hidden rounded-[12px] bg-[#f7f7f7] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[8px] hover:shadow-[0_18px_40px_rgba(22,22,22,0.16)]"
        >
          <p className="wdth-100 absolute left-[24px] top-[24px] h-[36px] w-[100px] text-[28px] font-black leading-[normal] text-accent">
            {cluster.key}
          </p>
          <p className="wdth-100 absolute left-[24px] top-[66px] h-[46px] w-[268px] text-[17px] font-extrabold leading-[normal] text-ink">
            {cluster.title}
          </p>
          <p className="wdth-100 absolute left-[24px] top-[112px] h-[16px] w-[200px] text-[12px] font-normal leading-[normal] text-muted">
            {cluster.rows.length}개 전공
          </p>

          {cluster.rows.map((row, i) => (
            <div
              key={row[0]}
              className="absolute left-[24px] h-[30px] w-[268px] overflow-hidden rounded-[8px] bg-white"
              style={{ top: `${148 + i * 38}px` }}
            >
              <p className="wdth-100 absolute left-[12px] top-[8px] h-[16px] w-[244px] text-[12px] font-normal leading-[normal] text-ink">
                {row[0]}
              </p>
            </div>
          ))}

          <button
            type="button"
            onClick={onOpen}
            className="absolute left-[24px] top-[564px] h-[36px] w-[268px] cursor-pointer overflow-hidden rounded-[18px] bg-ink"
          >
            <span className="absolute left-0 top-[11px] flex h-[16px] w-[268px] items-center justify-center">
              <span className="wdth-100 text-[12px] font-extrabold leading-[normal] text-white">
                세부 전공표 보기
              </span>
              <span className="wdth-100 ml-[7px] text-[12px] font-extrabold leading-[normal] text-white transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
                →
              </span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function AxConvergence() {
  const ref = useRef<HTMLElement>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const open = CLUSTERS.find((c) => c.key === openKey) ?? null;

  useScrub(ref, DRIFT);

  return (
    <>
      <Band
        top={2264}
        height={1080}
        className="bg-white"
        reveal={{ stagger: 0.09, y: 28 }}
        innerRef={ref}
      >
        <p className="wdth-100 absolute left-[117px] top-[90px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
          03 — AX 융합전공
        </p>
        <p className="wdth-100 absolute left-[117px] top-[126px] w-[1600px] text-[34px] font-black leading-[normal] text-ink">
          <Words text="대학 전체가 참여하는 17개 AX융합전공." />
        </p>
        <p className="wdth-100 absolute left-[117px] top-[182px] h-[22px] w-[1600px] text-[14px] font-normal leading-[normal] text-muted">
          공학·자연과학·의약학·생명자원·인문·사회·경영 등 전 계열 59개 학사단위가
          참여합니다. 카드를 클릭하면 세부 전공표가 열립니다.
        </p>

        {CLUSTERS.map((cluster) => (
          <ClusterCard
            key={cluster.key}
            cluster={cluster}
            onOpen={() => setOpenKey(cluster.key)}
          />
        ))}
      </Band>

      <DetailOverlay cluster={open} onClose={() => setOpenKey(null)} />
    </>
  );
}
