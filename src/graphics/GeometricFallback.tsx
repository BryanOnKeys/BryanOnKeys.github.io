import { seededRandom } from './math';
function project(x: number, y: number, z: number) {
  const angle = 0.32;
  return [
    230 + (x * Math.cos(angle) - z * Math.sin(angle)) * 120,
    212 + (y * 0.94 + (x * Math.sin(angle) + z * Math.cos(angle)) * 0.22) * 120,
  ];
}
const grid = Array.from({ length: 10 }, (_, lat) => {
  const a = ((lat + 1) / 11) * Math.PI;
  return Array.from({ length: 41 }, (_, i) =>
    project(
      Math.sin(a) * Math.cos((i / 40) * Math.PI * 2),
      Math.cos(a),
      Math.sin(a) * Math.sin((i / 40) * Math.PI * 2),
    ),
  )
    .map((p) => p.join(','))
    .join(' ');
});
const meridians = Array.from({ length: 12 }, (_, lng) =>
  Array.from({ length: 61 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2,
      b = (lng / 12) * Math.PI;
    return project(Math.sin(a) * Math.cos(b), Math.cos(a), Math.sin(a) * Math.sin(b));
  })
    .map((p) => p.join(','))
    .join(' '),
);
const random = seededRandom(72);
const stars = Array.from({ length: 58 }, () => ({
  x: random() * 460,
  y: random() * 420,
  r: random() * 0.7 + 0.3,
}));
export default function GeometricFallback() {
  return (
    <svg
      className="geometric-fallback"
      viewBox="0 0 460 440"
      role="img"
      aria-label="Alternativa geométrica programada; WebGL no disponible"
    >
      <defs>
        <radialGradient id="fallback-globe">
          <stop offset="0" stopColor="#142d58" stopOpacity=".45" />
          <stop offset=".8" stopColor="#172b57" stopOpacity=".2" />
          <stop offset="1" stopColor="#7696fa" stopOpacity=".24" />
        </radialGradient>
        <linearGradient id="fallback-orbit">
          <stop stopColor="#4ac6ff" stopOpacity=".3" />
          <stop offset=".5" stopColor="#9c7dff" />
          <stop offset="1" stopColor="#4b7fd4" stopOpacity=".3" />
        </linearGradient>
        <radialGradient id="fallback-glow">
          <stop stopColor="#a8e2ff" />
          <stop offset=".22" stopColor="#51adff" stopOpacity=".9" />
          <stop offset="1" stopColor="#4475ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cube-top" x2="1" y2="1">
          <stop stopColor="#6fd4ff" />
          <stop offset="1" stopColor="#2861cb" />
        </linearGradient>
      </defs>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={i % 2 ? '#5c84cd' : '#a592dc'}
          opacity=".5"
        />
      ))}
      <circle
        cx="230"
        cy="212"
        r="121"
        fill="url(#fallback-globe)"
        stroke="#7593dc"
        strokeOpacity=".4"
      />
      <g fill="none" stroke="#4978ba" strokeWidth=".5" opacity=".38">
        {grid.map((p, i) => (
          <polyline points={p} key={'a' + i} />
        ))}
        {meridians.map((p, i) => (
          <polyline points={p} key={'b' + i} />
        ))}
      </g>
      <g className="fallback-orbits" fill="none" stroke="url(#fallback-orbit)" strokeWidth=".9">
        <ellipse cx="230" cy="212" rx="180" ry="54" transform="rotate(-23 230 212)" />
        <ellipse cx="230" cy="212" rx="171" ry="63" transform="rotate(27 230 212)" />
        <ellipse cx="230" cy="212" rx="165" ry="57" transform="rotate(-58 230 212)" />
      </g>
      <g className="fallback-core">
        <polygon
          points="230,154 257,171 230,188 203,171"
          fill="url(#cube-top)"
          stroke="#80cfff"
          strokeWidth=".7"
        />
        <polygon
          points="203,171 230,188 230,221 203,203"
          fill="#174b9a"
          fillOpacity=".8"
          stroke="#649de4"
          strokeWidth=".7"
        />
        <polygon
          points="257,171 230,188 230,221 257,203"
          fill="#2c286d"
          fillOpacity=".8"
          stroke="#836ee2"
          strokeWidth=".7"
        />
      </g>
      <g>
        <circle cx="121" cy="171" r="18" fill="url(#fallback-glow)" />
        <circle cx="121" cy="171" r="4.5" fill="#8ce0ff" />
        <circle cx="348" cy="270" r="18" fill="url(#fallback-glow)" />
        <circle cx="348" cy="270" r="4.5" fill="#aca1ff" />
        <circle cx="289" cy="102" r="12" fill="url(#fallback-glow)" />
        <circle cx="289" cy="102" r="3" fill="#d3c0ff" />
      </g>
      <g transform="translate(207 264) scale(.42)">
        <polygon points="0,-20 24,-5 0,10 -24,-5" fill="#3985c3" stroke="#76c8ff" />
        <polygon points="-24,-5 0,10 0,39 -24,23" fill="#143c78" stroke="#559cd9" />
        <polygon points="24,-5 0,10 0,39 24,23" fill="#293362" stroke="#7068ad" />
      </g>
    </svg>
  );
}
