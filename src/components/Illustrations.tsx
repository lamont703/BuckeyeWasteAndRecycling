// Brand illustrations used until the client supplies real photos of their team and trucks.

function Bin({ x, y, color, lid, scale = 1 }: { x: number; y: number; color: string; lid: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-2" y="-6" width="44" height="10" rx="3" fill={lid} />
      <path d="M2 4h36l-4 62H6z" fill={color} />
      <rect x="10" y="16" width="20" height="3" rx="1.5" fill="#ffffff" opacity=".35" />
      <circle cx="9" cy="68" r="6" fill="#1b1b1b" />
      <circle cx="31" cy="68" r="6" fill="#1b1b1b" />
    </g>
  );
}

export function HomeScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A home at dusk with trash and recycling cans waiting at the curb">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f3a21" />
          <stop offset="1" stopColor="#2d6b46" />
        </linearGradient>
      </defs>
      <rect width="560" height="420" rx="32" fill="url(#sky)" />
      <circle cx="455" cy="80" r="30" fill="#f3ebdd" />
      <circle cx="468" cy="72" r="26" fill="#1a4a2d" />
      {[60, 140, 220, 330, 390].map((x, i) => (
        <circle key={x} cx={x} cy={40 + (i % 3) * 25} r="2" fill="#fff" opacity=".7" />
      ))}
      {/* trees */}
      <circle cx="70" cy="220" r="55" fill="#17532f" />
      <circle cx="115" cy="245" r="40" fill="#1d6a3d" />
      <rect x="82" y="250" width="12" height="70" fill="#3a2010" />
      {/* house */}
      <path d="M170 200 L300 110 L430 200 Z" fill="#3a2010" />
      <rect x="190" y="195" width="220" height="125" fill="#f3ebdd" />
      <rect x="215" y="225" width="50" height="45" rx="4" fill="#f6c76b" />
      <rect x="335" y="225" width="50" height="45" rx="4" fill="#f6c76b" />
      <rect x="282" y="250" width="38" height="70" rx="3" fill="#5a341a" />
      <circle cx="312" cy="287" r="3" fill="#d9b48a" />
      <rect x="240" y="225" width="2" height="45" fill="#e4e0d6" />
      <rect x="360" y="225" width="2" height="45" fill="#e4e0d6" />
      {/* lawn, driveway, street */}
      <rect x="0" y="320" width="560" height="40" fill="#24804a" />
      <path d="M282 320 h38 l40 40 h-118z" fill="#c9c2b4" />
      <rect x="0" y="352" width="560" height="10" fill="#d8d2c4" />
      <path d="M0 362h560v26a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32z" fill="#2b2f2c" />
      {[40, 140, 240, 340, 440].map((x) => (
        <rect key={x} x={x} y="386" width="50" height="5" rx="2.5" fill="#f3ebdd" opacity=".6" />
      ))}
      {/* cans at the curb */}
      <Bin x={400} y={278} color="#1d6a3d" lid="#17532f" />
      <Bin x={452} y={278} color="#2e6da4" lid="#245a88" />
      <path d="M461 300 l8 8 l14 -16" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ApartmentScene({ className = "" }: { className?: string }) {
  const doors = [0, 1, 2];
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="An apartment breezeway with trash containers set out beside each door for valet pickup">
      <rect width="560" height="420" rx="32" fill="#f3ebdd" />
      <rect x="40" y="40" width="480" height="300" rx="12" fill="#e4dccb" />
      {[0, 1].map((floor) =>
        doors.map((d) => {
          const x = 70 + d * 150;
          const y = 60 + floor * 140;
          return (
            <g key={`${floor}-${d}`}>
              <rect x={x} y={y} width="70" height="115" rx="4" fill="#5a341a" />
              <circle cx={x + 58} cy={y + 62} r="3.5" fill="#d9b48a" />
              <rect x={x + 18} y={y + 14} width="34" height="10" rx="2" fill="#d9b48a" />
              <text x={x + 35} y={y + 22} fontSize="8" textAnchor="middle" fill="#3a2010" fontWeight="700">
                {floor + 1}0{d + 1}
              </text>
              <rect x={x + 78} y={y + 80} width="30" height="35" rx="4" fill="#1d6a3d" />
              <rect x={x + 76} y={y + 76} width="34" height="7" rx="2" fill="#17532f" />
            </g>
          );
        }),
      )}
      <rect x="40" y="190" width="480" height="8" fill="#c9bea6" />
      <rect x="40" y="335" width="480" height="10" fill="#c9bea6" />
      {/* porter with bag */}
      <g transform="translate(430 250)">
        <circle cx="20" cy="0" r="13" fill="#8a5530" />
        <rect x="6" y="15" width="28" height="45" rx="10" fill="#d9731f" />
        <rect x="8" y="58" width="9" height="30" rx="4" fill="#13201a" />
        <rect x="23" y="58" width="9" height="30" rx="4" fill="#13201a" />
        <path d="M34 30 l18 10" stroke="#8a5530" strokeWidth="7" strokeLinecap="round" />
        <path d="M46 38 q14 -6 22 8 q4 22 -12 26 q-18 -2 -14 -24z" fill="#2b2f2c" />
      </g>
      <rect x="40" y="360" width="480" height="30" rx="10" fill="#ffffff" />
      <text x="280" y="380" fontSize="14" textAnchor="middle" fill="#17532f" fontWeight="700">
        Doorstep pickup · Sun–Thu · 8–10pm collection
      </text>
    </svg>
  );
}

export function PhoneNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto w-72 rounded-[2.5rem] bg-ink p-3 shadow-2xl ${className}`}>
      <div className="rounded-[2rem] bg-cream p-4">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-ink/20" />
        <p className="text-center text-xs font-semibold text-muted">Messages · Buckeye WR</p>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
            ✅ Your cans are at the curb for tomorrow&apos;s pickup.
            <HomeScene className="mt-2 w-full rounded-xl" />
            <p className="mt-1 text-[11px] text-muted">Tue 8:42 PM</p>
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
            ↩️ Cans returned to the side of your garage. See you next week!
            <p className="mt-1 text-[11px] text-muted">Wed 3:15 PM</p>
          </div>
          <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-leaf-700 px-3 py-2 text-sm text-white">
            You guys are the best 🙌
          </div>
        </div>
      </div>
    </div>
  );
}

export function BinCleanScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A trash bin being pressure washed and sanitized">
      <rect width="560" height="420" rx="32" fill="#eef7f1" />
      <circle cx="280" cy="200" r="150" fill="#d6ecdd" />
      <g transform="translate(225 140)">
        <Bin x={0} y={0} color="#1d6a3d" lid="#17532f" scale={2.6} />
      </g>
      {[[150, 120], [170, 170], [140, 220], [400, 130], [420, 190], [390, 250]].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <path d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4z" fill="#ffffff" />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={190 + i * 45} cy={360 + (i % 2) * 10} r={10 + (i % 3) * 4} fill="#ffffff" opacity=".85" />
      ))}
      <text x="280" y="60" fontSize="22" textAnchor="middle" fill="#17532f" fontWeight="800">
        Washed · Sanitized · Deodorized
      </text>
    </svg>
  );
}

export function TruckScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 420" className={className} role="img" aria-label="A Buckeye junk removal truck loaded with furniture">
      <rect width="560" height="420" rx="32" fill="#f3ebdd" />
      <rect x="0" y="330" width="560" height="90" rx="0" fill="#2b2f2c" />
      <path d="M0 330h560v58a32 32 0 0 1-32 32H32A32 32 0 0 1 0 388z" fill="#2b2f2c" />
      <rect x="70" y="160" width="270" height="150" rx="10" fill="#1d6a3d" />
      <rect x="85" y="125" width="70" height="45" rx="6" fill="#8a5530" />
      <rect x="165" y="105" width="90" height="65" rx="8" fill="#d9b48a" />
      <rect x="262" y="135" width="60" height="35" rx="6" fill="#5a341a" />
      <path d="M340 200h90l50 50v60H340z" fill="#17532f" />
      <path d="M360 215h60l35 35h-95z" fill="#cfe7f5" />
      <circle cx="140" cy="320" r="30" fill="#13201a" />
      <circle cx="140" cy="320" r="12" fill="#c9c2b4" />
      <circle cx="420" cy="320" r="30" fill="#13201a" />
      <circle cx="420" cy="320" r="12" fill="#c9c2b4" />
      <text x="205" y="245" fontSize="26" textAnchor="middle" fill="#ffffff" fontWeight="800">
        BUCKEYE
      </text>
      <text x="205" y="272" fontSize="12" textAnchor="middle" fill="#d6ecdd" fontWeight="700" letterSpacing="2">
        WASTE &amp; RECYCLING
      </text>
    </svg>
  );
}
