import { Band } from "../../components/Canvas";

/*
  Figma frame 146:1115 ("Frame") sits at x=931, y=405 inside the band and its
  bubbles never overflow it, so the bubbles are rendered as siblings of the
  panel at their absolute band coordinates (panel origin + child offset). That
  puts each one in the band's reveal, which cascades the conversation.
*/
const PANEL = { left: 931, top: 405 };

const CHAT = [
  { from: "user" as const, text: "AX융합학부는 어떤 전공인가요?", x: 136, y: 72, height: 45 },
  {
    from: "bot" as const,
    text: "다른 학부와 이중전공·부전공 형태로 결합해 AI 윤리·정책·크리에이티브 디자인 등 자신만의 융합 트랙을 설계하는 학부입니다.",
    x: 24,
    y: 133,
    height: 66,
  },
  { from: "user" as const, text: "장학금은 중복 신청이 가능한가요?", x: 136, y: 215, height: 45 },
  {
    from: "bot" as const,
    text: "국가장학금과 장영실AI펠로우십은 중복 신청이 가능합니다. 자세한 기준은 설명회에서 안내드려요.",
    x: 24,
    y: 276,
    height: 66,
  },
];

const HIGHLIGHTS = ["24/7 운영", "즉시 응답", "입학·장학·캠퍼스 생활 안내"];

export function Counseling() {
  return (
    <Band top={4424} height={1080} className="bg-white" reveal={{ stagger: 0.08 }}>
      <p className="wdth-100 absolute left-[388px] top-[225px] text-[13px] font-extrabold leading-[normal] whitespace-nowrap text-accent">
        05 — 입학 상담
      </p>
      <p className="wdth-100 absolute left-[388px] top-[261px] w-[1000px] text-[34px] font-black leading-[normal] text-ink">
        산지니 AI, 24시간 상담을 받다.
      </p>
      <p className="wdth-100 absolute left-[388px] top-[335px] w-[900px] text-[16px] font-normal leading-[normal] text-muted">
        입학, 장학, 캠퍼스 생활에 대한 질문에 즉시 답변하는 AI 챗봇입니다.
      </p>

      {HIGHLIGHTS.map((text, i) => (
        <p
          key={text}
          className="wdth-100 absolute left-[388px] text-[20px] font-extrabold leading-[normal] whitespace-nowrap text-ink"
          style={{ top: `${525 + i * 40}px` }}
        >
          {text}
        </p>
      ))}

      <div
        className="absolute h-[378px] w-[600px] rounded-[20px] bg-[#f2f2f2]"
        style={{ left: `${PANEL.left}px`, top: `${PANEL.top}px` }}
      />
      <p
        className="wdth-100 absolute text-[16px] font-extrabold leading-[normal] whitespace-nowrap text-ink"
        style={{ left: `${PANEL.left + 28}px`, top: `${PANEL.top + 24}px` }}
      >
        산지니 AI 상담
      </p>

      {CHAT.map(({ from, text, x, y, height }) => (
        <div
          key={text}
          className={`absolute w-[440px] overflow-hidden rounded-[12px] ${
            from === "user" ? "bg-ink" : "bg-white"
          }`}
          style={{
            left: `${PANEL.left + x}px`,
            top: `${PANEL.top + y}px`,
            height: `${height}px`,
          }}
        >
          <p
            className={`wdth-100 absolute left-[16px] top-[12px] w-[408px] text-[15px] font-normal leading-[normal] ${
              from === "user" ? "text-white" : "text-ink"
            }`}
          >
            {text}
          </p>
        </div>
      ))}

      <p className="wdth-100 absolute left-[388px] top-[813px] w-[900px] text-[15px] font-normal leading-[normal] text-muted">
        단순 FAQ 답변을 넘어, 성적과 관심 분야를 입력하면 예상 지원 전형과 장학금
        조합까지 추천해줍니다. 상담 내용이 복잡하면 담당 입학홍보팀 상담원 연결로
        자동 전환됩니다.
      </p>
    </Band>
  );
}
