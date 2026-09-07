import { useRef, useState } from "react";
import { Band } from "../../components/Canvas";
import { Modal } from "../../components/Modal";
import { CountUp } from "../../motion/CountUp";
import { useReveal } from "../../motion/useReveal";
import { useScrub } from "../../motion/useScrub";
import { Words } from "../../motion/Words";

type Faculty = [name: string, field: string];

type Dept = { letter: string; name: string; left: number; members: Faculty[] };

const DEPARTMENTS: Dept[] = [
  {
    letter: "A",
    name: "AI컴퓨터공학부",
    left: 117,
    members: [
      ["이기준 교수", "데이터베이스·공간정보공학"],
      ["염근혁 교수", "소프트웨어공학(블록체인·마이크로서비스)"],
      ["이도훈 교수", "Visual Computing(저조도영상·이상탐지)"],
      ["김정구 교수", "통신이론·부호및정보이론"],
      ["백윤주 교수", "컴퓨터시스템(온디바이스AI·LLM파인튜닝)"],
      ["우균 교수", "프로그래밍언어및컴파일러"],
      ["김종덕 교수", "컴퓨터네트워크(무선센서네트워크)"],
      ["채흥석 교수", "소프트웨어공학(DNN테스트최적화)"],
      ["탁성우 교수", "컴퓨터네트워크(지능형통신프로토콜)"],
      ["유영환 교수", "사이버물리시스템(IoT보안)"],
      ["김호원 교수", "정보보호·physical AI"],
      ["최윤호 교수", "컴퓨터·네트워크보안(생성형AI)"],
      ["송길태 교수", "머신러닝·생성AI·바이오인포매틱스"],
      ["안성용 교수", "운영체제·스토리지시스템(ZNS SSD)"],
      ["감진규 교수", "컴퓨터비전·의료영상처리"],
      ["황원주 교수", "IoT·차세대이동통신(6G)"],
      ["권동현 교수", "소프트웨어·임베디드시스템보안"],
      ["이명호 교수", "VR/AR·디지털휴먼·메타버스"],
      ["박진선 교수", "컴퓨터비전·자율주행"],
      ["김원석 교수", "피지컬AI·디지털트윈"],
      ["김태운 교수", "무선네트워크·지능형IoT"],
      ["조준수 교수", "데이터마이닝·추천시스템·NLP"],
      ["전상률 교수", "컴퓨터비전·기계학습"],
      ["손준영 교수", "AX융합사이버보안"],
      ["박영진 교수", "컴퓨터그래픽스·3D알고리즘"],
      ["최동희 교수", "NLP·바이오/금융/Food AI"],
      ["권용인 교수", "AI시스템·AI반도체·온디바이스AI"],
      ["김철기 교수", "인공지능(인간중심AI·인터랙션)"],
      ["김태완 교수", "운영체제"],
      ["이화세 교수", "인터랙션(웹디자인·UX)"],
    ],
  },
  {
    letter: "D",
    name: "데이터사이언스학부",
    left: 457,
    members: [
      ["류광열 교수", "Physical AI·스마트제조·HRC"],
      ["지봉준 교수", "AI+X(제조·토목·환경·교육)"],
      ["강상우 교수", "전기전자공학(국방AI)"],
      ["권준호 교수", "데이터베이스(BigComp 2026)"],
      ["황윤태 교수", "금융인공지능"],
      ["권선영 교수", "전기정보공학(전NAVER AI연구원)"],
      ["김민우 교수", "전기컴퓨터공학(전삼성메디슨)"],
      ["박형기 교수", "응용수학(신진수학자상)"],
      ["백광열 교수", "뇌과학·디지털헬스"],
      ["이환희 교수", "의생명통계"],
      ["유지현 교수", "유전자교정·바이오신약"],
    ],
  },
  {
    letter: "D",
    name: "통계학과",
    left: 797,
    members: [
      ["최용석 교수", "다변량통계학·텍스트마이닝"],
      ["조영석 교수", "데이터생성"],
      ["선호근 교수", "생물통계학·생물정보학"],
      ["양호진 교수", "통계적학습·추론·예측"],
      ["박소영 교수", "포렌식데이터과학·XAI"],
      ["이동혁 교수", "계산통계·생물통계"],
      ["이종민 교수", "Non-Euclidean learning"],
      ["김민우 교수", "베이지안·공간통계·자율주행모델"],
    ],
  },
  {
    letter: "P",
    name: "산업공학부",
    left: 1137,
    members: [
      ["박찬석 교수", "응용통계"],
      ["배혜림 교수", "산업AI(항만·물류·해양AX)"],
      ["이규민 교수", "수리최적화·계산최적화"],
      ["진상은 교수", "인간-시스템 상호작용"],
      ["홍순도 교수", "생산·물류·디지털트윈"],
      ["김기훈 교수", "산업AI"],
      ["한준희 교수", "AI팩토리"],
      ["김도원 교수", "확률모형·확률기반최적화"],
      ["신혜림 교수", "최적화"],
      ["정재희 교수", "최적화이론·시스템최적화"],
    ],
  },
  {
    letter: "X",
    name: "AX융합학부",
    left: 1477,
    members: [["유철희 교수", "도시원격탐사·AI기반도시환경모델링"]],
  },
];

/* Headline rises while the instruction line settles — opposing parallax. */
const DRIFT = [
  { selector: "[data-motion=lead]", to: { y: -24 } },
  { selector: "[data-motion=note]", to: { y: 18 } },
];

function DetailOverlay({ dept, onClose }: { dept: Dept | null; onClose: () => void }) {
  /*
    Two columns, split down the middle. Rows step 34px from y = 90, and the
    frame height in Figma is exactly 180 + rowsPerColumn * 34.
  */
  const perColumn = dept ? Math.ceil(dept.members.length / 2) : 0;
  const columns = dept
    ? [dept.members.slice(0, perColumn), dept.members.slice(perColumn)]
    : [];

  return (
    <Modal
      open={dept !== null}
      width={1000}
      height={180 + perColumn * 34}
      onClose={onClose}
      label={dept ? `${dept.name} 전임교원 명단` : ""}
    >
      {dept && (
        <>
          <p className="wdth-100 absolute left-[40px] top-[32px] h-[32px] w-[700px] text-[22px] font-black leading-[normal] text-ink">
            {dept.name} ({dept.members.length}명)
          </p>

          {columns.map((column, c) =>
            column.map(([name, field], i) => (
              <div key={`${c}-${name}-${i}`}>
                <p
                  className="wdth-100 absolute h-[18px] w-[110px] text-[12px] font-extrabold leading-[normal] text-ink"
                  style={{ left: `${c === 0 ? 40 : 480}px`, top: `${90 + i * 34}px` }}
                >
                  {name}
                </p>
                <p
                  className="wdth-100 absolute h-[30px] w-[325px] text-[11px] font-normal leading-[normal] text-muted"
                  style={{ left: `${c === 0 ? 155 : 595}px`, top: `${90 + i * 34}px` }}
                >
                  {field}
                </p>
              </div>
            )),
          )}
        </>
      )}
    </Modal>
  );
}

export function FacultyDirectory() {
  const ref = useRef<HTMLElement>(null);
  const lead = useRef<HTMLParagraphElement>(null);
  const [openName, setOpenName] = useState<string | null>(null);
  const open = DEPARTMENTS.find((d) => d.name === openName) ?? null;

  useScrub(ref, DRIFT);
  useReveal(lead, true, { stagger: 0.05, y: 20 });

  return (
    <>
      <Band
        top={5504}
        height={1080}
        className="bg-black"
        innerRef={ref}
        reveal={{ stagger: 0.08, y: 26 }}
      >
        <p className="wdth-100 absolute left-[117px] top-[150px] w-[400px] text-[13px] font-extrabold leading-[normal] text-accent">
          06 — 대표 연구진
        </p>

        <div className="absolute left-[117px] top-[186px] w-[1200px]">
          <Words
            ref={lead}
            data-motion="lead"
            className="wdth-100 text-[34px] font-black leading-[normal] text-white"
            text="60명 전임교원, 5개 학과."
          />
        </div>

        <div className="absolute left-[117px] top-[242px] h-[22px] w-[1200px]">
          <p
            data-motion="note"
            className="wdth-100 text-[14px] font-normal leading-[normal] text-muted"
          >
            학과 카드를 클릭하면 전체 명단이 열립니다.
          </p>
        </div>

        {DEPARTMENTS.map((dept) => {
          const preview = dept.members.slice(0, 3);
          const rest = dept.members.length - preview.length;
          return (
            <div
              key={dept.name}
              className="group absolute top-[310px] h-[620px] w-[316px]"
              style={{ left: `${dept.left}px` }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-[#141414] transition-[transform,background-color] duration-300 ease-out hover:bg-[#1b1b1b] motion-safe:group-hover:-translate-y-[8px]">
                <p className="wdth-100 absolute left-[24px] top-[24px] h-[36px] w-[100px] text-[28px] font-black leading-[normal] text-accent">
                  {dept.letter}
                </p>
                <p className="wdth-100 absolute left-[24px] top-[66px] h-[46px] w-[268px] text-[18px] font-extrabold leading-[normal] text-white">
                  {dept.name}
                </p>
                <p className="wdth-100 absolute left-[24px] top-[112px] h-[40px] w-[200px] text-[30px] font-black leading-[normal] text-accent">
                  <CountUp value={String(dept.members.length)} />명
                </p>

                {preview.map(([name, field], i) => (
                  <div key={name}>
                    <p
                      className="wdth-100 absolute left-[24px] h-[16px] w-[268px] text-[12px] font-extrabold leading-[normal] text-white"
                      style={{ top: `${170 + i * 40}px` }}
                    >
                      {name}
                    </p>
                    <p
                      className="wdth-100 absolute left-[24px] w-[268px] text-[10px] font-normal leading-[normal] text-[#999]"
                      style={{ top: `${186 + i * 40}px` }}
                    >
                      {field}
                    </p>
                  </div>
                ))}

                {rest > 0 && (
                  <p className="wdth-100 absolute left-[24px] top-[294px] w-[268px] text-[11px] font-normal leading-[normal] text-[#808080]">
                    + {rest}명 더보기
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setOpenName(dept.name)}
                  className="absolute left-[24px] top-[564px] h-[36px] w-[268px] cursor-pointer overflow-hidden rounded-[18px] bg-white transition-colors duration-300 hover:bg-[#e6e6e6]"
                >
                  <span className="wdth-100 absolute left-0 top-[11px] h-[16px] w-[268px] text-center text-[12px] font-extrabold leading-[normal] text-ink">
                    전체 명단 보기 &nbsp;
                    <span className="inline-block transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-[4px]">
                      →
                    </span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </Band>

      <DetailOverlay dept={open} onClose={() => setOpenName(null)} />
    </>
  );
}
