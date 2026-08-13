import './GardenScene.css'

type Hair = 'short' | 'bun' | 'pigtails' | 'crop' | 'side'

function Hairdo({ kind, hair }: { kind: Hair; hair: string }) {
  if (kind === 'bun') {
    return (
      <>
        <path d="M-14 -14 Q 0 -30 14 -14 Q 8 -7 0 -9 Q -8 -7 -14 -14" fill={hair} />
        <circle cx="1" cy="-28" r="7.5" fill={hair} />
      </>
    )
  }
  if (kind === 'pigtails') {
    return (
      <>
        <path d="M-14 -13 Q 0 -28 14 -13 Q 9 -6 0 -8 Q -9 -6 -14 -13" fill={hair} />
        <ellipse cx="-18" cy="-2" rx="5.5" ry="9" fill={hair} />
        <ellipse cx="18" cy="-2" rx="5.5" ry="9" fill={hair} />
        <circle cx="-18" cy="8" r="3.4" fill="#c45c6a" />
        <circle cx="18" cy="8" r="3.4" fill="#c45c6a" />
      </>
    )
  }
  if (kind === 'crop') {
    return <path d="M-13 -9 Q 0 -24 13 -9 Q 10 -4 0 -6 Q -10 -4 -13 -9" fill={hair} />
  }
  if (kind === 'side') {
    return (
      <>
        <path d="M-14 -12 Q -2 -30 14 -16 Q 9 -6 0 -8 Q -11 -5 -14 -12" fill={hair} />
        <path d="M11 -14 Q 18 -8 16 6" fill="none" stroke={hair} strokeWidth="4.5" strokeLinecap="round" />
      </>
    )
  }
  return <path d="M-14 -14 Q 0 -32 14 -14 Q 9 -7 0 -9 Q -9 -7 -14 -14" fill={hair} />
}

function SeatedKid({
  x,
  y,
  shirt,
  skin,
  hair,
  hairdo = 'short',
  scale = 1,
  flip = false,
}: {
  x: number
  y: number
  shirt: string
  skin: string
  hair: string
  hairdo?: Hair
  scale?: number
  flip?: boolean
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      <ellipse cx="0" cy="58" rx="34" ry="10" fill="#1a1208" opacity="0.3" />
      <path d="M-30 42 C -40 50 -22 58 -6 50" fill="#3d2a1c" />
      <path d="M30 43 C 40 51 22 59 6 51" fill="#4a3422" />
      <ellipse cx="-28" cy="51" rx="10" ry="5.5" fill="#d4a574" />
      <ellipse cx="28" cy="52" rx="10" ry="5.5" fill="#c48a5a" />
      <path
        d="M-22 6 C -26 30 -20 50 0 54 C 20 50 26 30 22 6 C 12 -2 -12 -2 -22 6 Z"
        fill={shirt}
      />
      <path d="M-9 12 L 0 22 L 9 12" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.2" strokeLinejoin="round" />
      <path
        d="M-18 16 C -32 22 -42 12 -46 2"
        fill="none"
        stroke={skin}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M18 18 C 34 12 46 4 52 -8"
        fill="none"
        stroke={skin}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M52 -8 L 62 -14" fill="none" stroke={skin} strokeWidth="3.4" strokeLinecap="round" />
      <rect x="-6" y="-4" width="12" height="12" rx="4" fill={skin} />
      <circle cx="0" cy="-14" r="15.5" fill={skin} />
      <Hairdo kind={hairdo} hair={hair} />
      <circle cx="-5" cy="-13" r="1.7" fill="#1a1208" />
      <circle cx="5.2" cy="-13" r="1.7" fill="#1a1208" />
      <path d="M-3.5 -5 Q 0 -2.5 3.5 -5" fill="none" stroke="#a86b48" strokeWidth="1.3" strokeLinecap="round" />
    </g>
  )
}

function LeafMass({
  x,
  y,
  s = 1,
  rot = 0,
  fill,
}: {
  x: number
  y: number
  s?: number
  rot?: number
  fill: string
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path
        d="M0 -78 C 52 -82 102 -42 96 6 C 128 28 110 86 48 96 C 16 128 -40 116 -76 72 C -118 50 -112 -8 -74 -44 C -46 -80 -18 -78 0 -78 Z"
        fill={fill}
      />
    </g>
  )
}

function Grass({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 C -7 -20 -2 -36 3 -30 C 2 -18 3 -8 0 0" fill="#3d5428" />
      <path d="M6 0 C 2 -18 8 -34 13 -28 C 10 -14 9 -6 6 0" fill="#547434" />
      <path d="M-6 0 C -12 -16 -14 -28 -8 -26 C -7 -14 -6 -6 -6 0" fill="#2f451c" />
    </g>
  )
}

export function GardenScene() {
  return (
    <div className="garden" aria-hidden="true">
      <svg className="garden-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8dca8" />
            <stop offset="38%" stopColor="#efc47a" />
            <stop offset="100%" stopColor="#d9a85a" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="76%" cy="14%" r="46%">
            <stop offset="0%" stopColor="#ffe9b4" stopOpacity="1" />
            <stop offset="40%" stopColor="#f0c56a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#efc47a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7e9248" />
            <stop offset="50%" stopColor="#5d7236" />
            <stop offset="100%" stopColor="#3e4e26" />
          </linearGradient>
          <linearGradient id="trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3a2612" />
            <stop offset="35%" stopColor="#7a5230" />
            <stop offset="70%" stopColor="#5a3a1c" />
            <stop offset="100%" stopColor="#2e1c0e" />
          </linearGradient>
          <radialGradient id="shade" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#2a3814" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#2a3814" stopOpacity="0" />
          </radialGradient>
          <clipPath id="matClip">
            <ellipse cx="800" cy="700" rx="290" ry="92" />
          </clipPath>
          <pattern id="dhurrie" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#d4b06a" />
            <rect width="24" height="8" fill="#b24a3a" />
            <rect y="16" width="24" height="3" fill="#6b3a24" opacity="0.45" />
          </pattern>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />
        <rect width="1600" height="900" fill="url(#sunGlow)" />
        <circle cx="1220" cy="118" r="78" fill="#ffe7a8" />
        <circle cx="1220" cy="118" r="124" fill="#ffe7a8" opacity="0.2" />

        <g className="clouds" fill="#f7ead0" opacity="0.42">
          <ellipse cx="280" cy="108" rx="110" ry="30" />
          <ellipse cx="350" cy="98" rx="60" ry="24" />
          <ellipse cx="1500" cy="168" rx="80" ry="24" />
        </g>

        <g fill="none" stroke="#5a3d24" strokeWidth="1.8" strokeLinecap="round" opacity="0.35">
          <path d="M980 78c8 3 14 3 20 1" />
          <path d="M1040 58c10 2 16 2 22 0" />
          <path d="M1320 70c-8 3 -14 4 -20 2" />
        </g>

        <path d="M0 400 C 220 360 420 430 700 390 C 980 350 1240 420 1600 370 L 1600 560 L 0 560 Z" fill="#8a9a52" />
        <g className="far" opacity="0.85">
          <path d="M90 390 C 90 330 150 300 190 340 C 230 300 280 330 275 390 Z" fill="#4a6230" />
          <path d="M1380 380 C 1380 310 1460 280 1510 330 C 1560 290 1600 330 1590 385 Z" fill="#3f5628" />
          <path d="M1480 385 C 1480 330 1540 310 1575 350 C 1600 330 1600 370 1595 390 Z" fill="#4d6632" />
        </g>

        <path d="M0 470 C 280 430 560 520 880 470 C 1160 430 1400 500 1600 460 L 1600 900 L 0 900 Z" fill="url(#ground)" />
        <ellipse cx="800" cy="660" rx="460" ry="170" fill="url(#shade)" />

        <g className="dapple" fill="#9aaa58" opacity="0.22">
          <ellipse cx="520" cy="640" rx="70" ry="28" />
          <ellipse cx="700" cy="600" rx="90" ry="34" />
          <ellipse cx="980" cy="630" rx="80" ry="30" />
          <ellipse cx="1140" cy="720" rx="60" ry="24" />
          <ellipse cx="430" cy="760" rx="50" ry="20" />
        </g>

        <g className="canopy">
          <LeafMass x={780} y={175} s={3.1} fill="#1e3318" />
          <LeafMass x={420} y={230} s={2.15} rot={-18} fill="#2a4420" />
          <LeafMass x={1160} y={215} s={2.35} rot={16} fill="#243a1c" />
          <LeafMass x={780} y={110} s={2.2} fill="#355428" />
          <LeafMass x={560} y={155} s={1.45} rot={-8} fill="#4a6a30" />
          <LeafMass x={1000} y={145} s={1.55} rot={10} fill="#3f5e28" />
          <LeafMass x={680} y={70} s={1.15} fill="#5c7c38" />
          <LeafMass x={900} y={78} s={1.1} rot={8} fill="#547434" />
          <LeafMass x={300} y={200} s={1.05} rot={-22} fill="#334c24" />
          <LeafMass x={1280} y={185} s={1.2} rot={20} fill="#2f4822" />
          <LeafMass x={200} y={255} s={0.85} rot={-12} fill="#3d5a28" />
          <LeafMass x={1400} y={240} s={0.9} rot={14} fill="#3a5426" />
        </g>

        <path
          d="M736 210 C 718 340 706 470 698 590 C 690 680 704 760 742 805 L 838 802 C 862 740 850 650 846 560 C 842 430 858 320 834 210 Z"
          fill="url(#trunk)"
        />
        <path d="M790 250 C 760 255 750 280 748 310" fill="none" stroke="#2e1c0e" strokeWidth="3" opacity="0.35" />
        <path d="M760 280 C 620 255 500 340 430 455" fill="none" stroke="#4a3018" strokeWidth="18" strokeLinecap="round" />
        <path d="M820 300 C 960 270 1100 330 1200 450" fill="none" stroke="#3a2612" strokeWidth="16" strokeLinecap="round" />
        <path d="M770 410 C 660 490 630 580 600 650" fill="none" stroke="#5a3a1c" strokeWidth="12" strokeLinecap="round" />
        <path d="M830 430 C 930 510 970 600 1000 670" fill="none" stroke="#4a3018" strokeWidth="11" strokeLinecap="round" />

        <g fill="none" stroke="#4a3018" strokeLinecap="round" opacity="0.8">
          <path d="M600 200 C 594 340 588 500 586 640" strokeWidth="4.5" />
          <path d="M690 155 C 686 320 682 490 680 650" strokeWidth="5.5" />
          <path d="M940 165 C 946 330 950 500 948 640" strokeWidth="5" />
          <path d="M1055 210 C 1062 360 1066 510 1062 640" strokeWidth="3.8" />
        </g>

        <g>
          <path d="M530 300 C 526 312 534 328 538 338 C 544 328 546 312 530 300 Z" fill="#d08a28" />
          <path d="M568 268 C 564 280 572 296 576 306 C 582 296 584 280 568 268 Z" fill="#c45c26" />
          <path d="M1048 290 C 1044 302 1052 318 1056 328 C 1062 318 1064 302 1048 290 Z" fill="#d08a28" />
          <path d="M1000 250 C 996 261 1004 276 1008 286 C 1014 276 1016 261 1000 250 Z" fill="#e09a38" />
          <path d="M710 228 C 706 239 714 254 718 264 C 724 254 726 239 710 228 Z" fill="#c45c26" />
        </g>

        <ellipse cx="800" cy="700" rx="296" ry="96" fill="#1a1208" opacity="0.2" />
        <g clipPath="url(#matClip)">
          <ellipse cx="800" cy="700" rx="290" ry="92" fill="url(#dhurrie)" />
        </g>
        <ellipse cx="800" cy="700" rx="290" ry="92" fill="none" stroke="#8a5a30" strokeWidth="6" />
        <ellipse cx="800" cy="700" rx="36" ry="12" fill="#6b3a24" opacity="0.28" />

        <SeatedKid x={540} y={620} shirt="#3d5c7a" skin="#c48a5a" hair="#2a1c12" hairdo="crop" scale={1.02} />
        <SeatedKid x={660} y={575} shirt="#8b3d3d" skin="#d4a574" hair="#1c120c" hairdo="bun" scale={0.92} />
        <SeatedKid x={940} y={572} shirt="#e0c878" skin="#b87540" hair="#3a2414" hairdo="side" scale={0.94} flip />
        <SeatedKid x={1060} y={625} shirt="#3f6b4a" skin="#c48a5a" hair="#24160e" hairdo="short" scale={1.05} flip />
        <SeatedKid x={430} y={710} shirt="#c45c26" skin="#b87540" hair="#1c120c" hairdo="pigtails" scale={1.08} />
        <SeatedKid x={1170} y={715} shirt="#2c4a6e" skin="#c48a5a" hair="#3a2414" hairdo="crop" scale={1.06} flip />

        <g transform="translate(250 760)">
          <ellipse cx="0" cy="12" rx="30" ry="16" fill="#2c4a6e" />
          <path d="M-26 4 Q 0 -20 26 4" fill="#2c4a6e" />
          <rect x="-9" y="-4" width="18" height="11" rx="2" fill="#e0c878" />
        </g>
        <g transform="translate(1360 775)">
          <ellipse cx="0" cy="12" rx="32" ry="17" fill="#8b3d3d" />
          <path d="M-28 4 Q 0 -22 28 4" fill="#8b3d3d" />
        </g>
        <g transform="translate(1260 640) rotate(-16)">
          <rect x="0" y="0" width="11" height="100" rx="3" fill="#8a6230" />
          <ellipse cx="5.5" cy="5" rx="20" ry="11" fill="#d4b06a" />
        </g>

        <ellipse cx="310" cy="820" rx="17" ry="7.5" fill="#5a3d24" />
        <ellipse cx="342" cy="824" rx="17" ry="7.5" fill="#5a3d24" />
        <ellipse cx="1288" cy="830" rx="16" ry="7" fill="#3d2814" />
        <ellipse cx="1318" cy="834" rx="16" ry="7" fill="#3d2814" />
        <circle cx="1224" cy="848" r="10" fill="#c45c26" />
        <circle cx="1224" cy="848" r="6.5" fill="#f0d78a" />
        <ellipse cx="220" cy="844" rx="13" ry="9" fill="#d5dce0" />
        <rect x="213" y="826" width="14" height="18" rx="2" fill="#d5dce0" />

        <ellipse cx="620" cy="820" rx="8" ry="13" fill="#4a6a30" transform="rotate(-28 620 820)" />
        <ellipse cx="1020" cy="840" rx="7" ry="12" fill="#5c7c38" transform="rotate(24 1020 840)" />
        <ellipse cx="480" cy="860" rx="9" ry="14" fill="#3d5a28" transform="rotate(48 480 860)" />

        <Grass x={70} y={830} s={1.8} />
        <Grass x={130} y={870} s={1.3} flip />
        <Grass x={210} y={800} s={1.5} />
        <Grass x={1500} y={820} s={1.9} flip />
        <Grass x={1410} y={870} s={1.4} />
        <Grass x={1555} y={770} s={1.2} />
        <Grass x={40} y={700} s={1.3} />
        <Grass x={760} y={875} s={1} />
        <Grass x={920} y={868} s={1.1} flip />

        <g className="leaf leaf-a" fill="#4a6a30">
          <ellipse cx="0" cy="0" rx="8" ry="15" />
        </g>
        <g className="leaf leaf-b" fill="#6a8a40">
          <ellipse cx="0" cy="0" rx="7" ry="13" />
        </g>
        <g className="leaf leaf-c" fill="#2f4822">
          <ellipse cx="0" cy="0" rx="6" ry="12" />
        </g>
        <g className="leaf leaf-d" fill="#c45c26">
          <ellipse cx="0" cy="0" rx="6" ry="11" />
        </g>

        <g className="fireflies">
          <circle className="fly fly-a" cx="400" cy="250" r="2.3" fill="#ffe9a8" />
          <circle className="fly fly-b" cx="1000" cy="190" r="1.9" fill="#ffe9a8" />
          <circle className="fly fly-c" cx="1200" cy="330" r="2.1" fill="#ffe9a8" />
          <circle className="fly fly-d" cx="240" cy="470" r="1.7" fill="#ffe9a8" />
          <circle className="fly fly-e" cx="1340" cy="500" r="2.2" fill="#ffe9a8" />
        </g>

        <path d="M0 830 C 90 800 160 860 250 808 C 320 870 400 800 470 900 L 0 900 Z" fill="#2a3818" opacity="0.5" />
        <path d="M1600 810 C 1490 780 1420 860 1330 798 C 1250 870 1180 790 1140 900 L 1600 900 Z" fill="#2a3818" opacity="0.48" />
      </svg>
    </div>
  )
}
