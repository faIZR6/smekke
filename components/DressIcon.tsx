type Props = { index: number; className?: string; style?: React.CSSProperties };

const dresses = [
  // 0 — Silk Cascade Evening Gown: long sleeveless A-line
  <>
    <path
      d="M 44,22 Q 60,12 76,22 L 80,58 C 84,110 90,160 94,192 L 26,192 C 30,160 36,110 40,58 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 40,68 Q 60,75 80,68" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
  </>,

  // 1 — Venetian Lace: fitted bodice, very full circle skirt
  <>
    <path
      d="M 44,22 Q 60,12 76,22 L 74,58 C 68,78 66,92 64,104 C 80,130 86,162 88,192 L 32,192 C 34,162 40,130 56,104 C 54,92 52,78 46,58 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 46,78 Q 60,85 74,78" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
  </>,

  // 2 — Merino Wrap Day Dress: V-neckline
  <>
    <path
      d="M 38,18 L 60,50 L 82,18 L 86,60 C 88,108 86,165 84,192 L 36,192 C 34,165 32,108 34,60 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 60,50 L 60,192" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="4 3" strokeLinecap="round" />
  </>,

  // 3 — Velvet Soirée Midi: sweetheart neckline, midi length
  <>
    <path
      d="M 40,30 C 50,12 70,12 80,30 L 84,68 C 86,108 82,158 80,176 L 40,176 C 38,158 34,108 36,68 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 40,30 C 46,20 54,26 60,30 C 66,26 74,20 80,30" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 36,76 Q 60,83 84,76" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinecap="round" />
  </>,

  // 4 — Crêpe Shift: clean sleeveless rectangle
  <>
    <path
      d="M 36,20 Q 60,11 84,20 L 87,55 L 89,184 L 31,184 L 33,55 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 33,68 L 87,68" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity={0.5} />
  </>,

  // 5 — Garden Party Chiffon: spaghetti straps, tiered skirt
  <>
    <path
      d="M 52,10 L 68,10 L 72,55 L 82,100 L 88,146 L 92,190 L 28,190 L 32,146 L 38,100 L 48,55 Z"
      fillOpacity={0.07}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M 48,55 Q 60,61 72,55" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 38,100 Q 60,108 82,100" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 32,146 Q 60,154 88,146" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
  </>,
];

export default function DressIcon({ index, className = "", style }: Props) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {dresses[index % dresses.length]}
    </svg>
  );
}
