// Card templates — render(cfg) returns SVG string viewBox="0 0 360 480"
// cfg = { bg1, bg2, accent, textColor, stars, border, corners, motif, divider, occasion, year, tagline, font }

const CARD_TEMPLATES = [

  // ── Classic Elegance ──────────────────────────────────────────────────────
  {
    id: 'classic',
    name: 'Classic Elegance',
    icon: '✦',
    defaultBg1: '#0a0f1e', defaultBg2: '#1a2540',
    defaultAccent: '#c9a84c', defaultText: '#e8c96a',
    render(c) {
      const starField = c.stars ? Array.from({length:30},(_,i)=>{
        const x=25+(i*83%310), y=25+(i*67%420), r=0.5+(i*31%8)/10, op=0.2+(i*17%5)/10;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.accent}" opacity="${op}"/>`;
      }).join('') : '';
      const borderEl = c.border ? `
        <rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
        <rect x="20" y="20" width="320" height="440" fill="none" stroke="${c.accent}" stroke-width="0.3" opacity="0.25"/>` : '';
      const cornerEl = c.corners ? `
        <path d="M28 28 Q50 28 50 50" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.6"/>
        <path d="M332 28 Q310 28 310 50" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.6"/>
        <path d="M28 452 Q50 452 50 430" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.6"/>
        <path d="M332 452 Q310 452 310 430" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.6"/>` : '';
      const motifEl = c.motif ? `
        <polygon points="180,120 215,175 180,230 145,175" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.55"/>
        <polygon points="180,140 205,175 180,210 155,175" fill="${c.accent}" opacity="0.07"/>
        <circle cx="180" cy="175" r="7" fill="${c.accent}" opacity="0.45"/>
        <circle cx="180" cy="175" r="3" fill="${c.textColor}"/>
        <circle cx="145" cy="175" r="2" fill="${c.accent}" opacity="0.4"/>
        <circle cx="215" cy="175" r="2" fill="${c.accent}" opacity="0.4"/>
        <circle cx="180" cy="120" r="2" fill="${c.accent}" opacity="0.4"/>
        <circle cx="180" cy="230" r="2" fill="${c.accent}" opacity="0.4"/>` : '';
      const dividerEl = c.divider ? `
        <line x1="80" y1="275" x2="280" y2="275" stroke="${c.accent}" stroke-width="0.7" opacity="0.5"/>
        <circle cx="180" cy="275" r="3" fill="${c.accent}" opacity="0.65"/>
        <circle cx="120" cy="275" r="1.5" fill="${c.accent}" opacity="0.35"/>
        <circle cx="240" cy="275" r="1.5" fill="${c.accent}" opacity="0.35"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="80" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="3" opacity="0.6">${c.tagline.toUpperCase()}</text>` : '';
      const topLine = c.tagline ? '' : `<line x1="80" y1="68" x2="280" y2="68" stroke="${c.accent}" stroke-width="0.7" opacity="0.5"/>`;
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="70%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="55%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#bg)"/>
  <rect width="360" height="480" fill="url(#glow)"/>
  ${borderEl}${cornerEl}${starField}${topLine}${tagEl}
  ${motifEl}${dividerEl}
  <text x="180" y="330" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="22" fill="${c.textColor}" letter-spacing="3" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="368" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.65">${c.year}</text>
  <line x1="80" y1="415" x2="280" y2="415" stroke="${c.accent}" stroke-width="0.7" opacity="0.45"/>
  <circle cx="180" cy="415" r="2.5" fill="${c.accent}" opacity="0.55"/>
</svg>`;
    }
  },

  // ── Night Sky ──────────────────────────────────────────────────────────────
  {
    id: 'night-sky',
    name: 'Night Sky',
    icon: '✦',
    defaultBg1: '#020814', defaultBg2: '#08142a',
    defaultAccent: '#c9a84c', defaultText: '#e8f0ff',
    render(c) {
      const starField = c.stars ? Array.from({length:70},(_,i)=>{
        const x=10+(i*73%340), y=10+(i*97%430), r=0.4+(i*31%12)/10, op=0.25+(i*19%6)/10;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.textColor}" opacity="${op}"/>`;
      }).join('') : '';
      const borderEl = c.border ? `<rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>` : '';
      const cornerEl = c.corners ? `
        <circle cx="26" cy="26" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <circle cx="334" cy="26" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <circle cx="26" cy="454" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <circle cx="334" cy="454" r="2.5" fill="${c.accent}" opacity="0.5"/>` : '';
      const motifEl = c.motif ? `
        <circle cx="180" cy="155" r="52" fill="${c.bg2}" opacity="0.55"/>
        <circle cx="163" cy="150" r="52" fill="${c.bg1}" opacity="0.88"/>
        <circle cx="180" cy="155" r="52" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.2"/>
        <circle cx="180" cy="155" r="48" fill="none" stroke="${c.accent}" stroke-width="0.4" opacity="0.15"/>` : '';
      const dividerEl = c.divider ? `
        <line x1="90" y1="270" x2="270" y2="270" stroke="${c.accent}" stroke-width="0.6" opacity="0.4"/>
        <circle cx="180" cy="270" r="2.5" fill="${c.accent}" opacity="0.55"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="72" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="3" opacity="0.55">${c.tagline.toUpperCase()}</text>` : '';
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sky" cx="50%" cy="18%" r="80%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </radialGradient>
    <radialGradient id="moonGlow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#sky)"/>
  <rect width="360" height="480" fill="url(#moonGlow)"/>
  ${starField}${borderEl}${cornerEl}${tagEl}${motifEl}${dividerEl}
  <text x="180" y="325" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="22" fill="${c.textColor}" letter-spacing="3" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="363" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.65">${c.year}</text>
  <polygon points="180,405 183,414 180,412 177,414" fill="${c.accent}" opacity="0.5"/>
</svg>`;
    }
  },

  // ── Art Deco ───────────────────────────────────────────────────────────────
  {
    id: 'art-deco',
    name: 'Art Deco',
    icon: '◆',
    defaultBg1: '#06080e', defaultBg2: '#10141e',
    defaultAccent: '#c9a84c', defaultText: '#f0e8d0',
    render(c) {
      const borderEl = c.border ? `
        <rect x="10" y="10" width="340" height="460" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity="0.6"/>
        <rect x="18" y="18" width="324" height="444" fill="none" stroke="${c.accent}" stroke-width="0.4" opacity="0.3"/>` : '';
      const cornerEl = c.corners ? `
        <polygon points="10,10 40,10 10,40" fill="${c.accent}" opacity="0.25"/>
        <polygon points="350,10 320,10 350,40" fill="${c.accent}" opacity="0.25"/>
        <polygon points="10,470 40,470 10,440" fill="${c.accent}" opacity="0.25"/>
        <polygon points="350,470 320,470 350,440" fill="${c.accent}" opacity="0.25"/>` : '';
      const motifEl = c.motif ? `
        <polygon points="180,80 195,120 235,120 205,145 215,185 180,162 145,185 155,145 125,120 165,120" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.55"/>
        <polygon points="180,95 192,128 222,128 198,146 207,178 180,160 153,178 162,146 138,128 168,128" fill="${c.accent}" opacity="0.07"/>
        <circle cx="180" cy="135" r="12" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
        <circle cx="180" cy="135" r="5" fill="${c.accent}" opacity="0.45"/>
        <line x1="50" y1="200" x2="150" y2="200" stroke="${c.accent}" stroke-width="0.8" opacity="0.45"/>
        <line x1="210" y1="200" x2="310" y2="200" stroke="${c.accent}" stroke-width="0.8" opacity="0.45"/>
        <line x1="50" y1="204" x2="150" y2="204" stroke="${c.accent}" stroke-width="0.3" opacity="0.25"/>
        <line x1="210" y1="204" x2="310" y2="204" stroke="${c.accent}" stroke-width="0.3" opacity="0.25"/>
        <polygon points="180,195 185,200 180,205 175,200" fill="${c.accent}" opacity="0.7"/>` : '';
      const dividerEl = c.divider ? `
        <line x1="60" y1="290" x2="290" y2="290" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
        <line x1="60" y1="294" x2="290" y2="294" stroke="${c.accent}" stroke-width="0.3" opacity="0.25"/>
        <rect x="172" y="287" width="16" height="10" fill="${c.bg1}"/>
        <polygon points="180,285 185,290 180,295 175,290" fill="${c.accent}" opacity="0.8"/>` : '';
      const starField = c.stars ? `
        <line x1="40" y1="240" x2="40" y2="260" stroke="${c.accent}" stroke-width="0.5" opacity="0.3"/>
        <line x1="32" y1="250" x2="48" y2="250" stroke="${c.accent}" stroke-width="0.5" opacity="0.3"/>
        <line x1="320" y1="240" x2="320" y2="260" stroke="${c.accent}" stroke-width="0.5" opacity="0.3"/>
        <line x1="312" y1="250" x2="328" y2="250" stroke="${c.accent}" stroke-width="0.5" opacity="0.3"/>
        <circle cx="40" cy="380" r="3" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.3"/>
        <circle cx="320" cy="380" r="3" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.3"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="60" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="4" opacity="0.6">${c.tagline.toUpperCase()}</text>` : '';
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="adbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </linearGradient>
  </defs>
  <rect width="360" height="480" fill="url(#adbg)"/>
  ${borderEl}${cornerEl}${motifEl}${starField}${dividerEl}${tagEl}
  <text x="180" y="345" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="21" fill="${c.textColor}" letter-spacing="5" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="380" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="7" opacity="0.6">${c.year}</text>
  <line x1="100" y1="420" x2="260" y2="420" stroke="${c.accent}" stroke-width="1" opacity="0.45"/>
  <line x1="100" y1="424" x2="260" y2="424" stroke="${c.accent}" stroke-width="0.3" opacity="0.2"/>
</svg>`;
    }
  },

  // ── Floral ────────────────────────────────────────────────────────────────
  {
    id: 'floral',
    name: 'Floral Garden',
    icon: '✿',
    defaultBg1: '#0a0c08', defaultBg2: '#141a0c',
    defaultAccent: '#c9a84c', defaultText: '#e8d8b0',
    render(c) {
      const borderEl = c.border ? `<rect x="13" y="13" width="334" height="454" fill="none" stroke="${c.accent}" stroke-width="0.9" opacity="0.4"/>` : '';
      const cornerEl = c.corners ? `
        <path d="M30 30 Q52 30 62 52" fill="none" stroke="${c.accent}" stroke-width="1.1" opacity="0.45"/>
        <circle cx="30" cy="30" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <path d="M330 30 Q308 30 298 52" fill="none" stroke="${c.accent}" stroke-width="1.1" opacity="0.45"/>
        <circle cx="330" cy="30" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <path d="M30 450 Q52 450 62 428" fill="none" stroke="${c.accent}" stroke-width="1.1" opacity="0.45"/>
        <circle cx="30" cy="450" r="2.5" fill="${c.accent}" opacity="0.5"/>
        <path d="M330 450 Q308 450 298 428" fill="none" stroke="${c.accent}" stroke-width="1.1" opacity="0.45"/>
        <circle cx="330" cy="450" r="2.5" fill="${c.accent}" opacity="0.5"/>` : '';
      const motifEl = c.motif ? `
        <circle cx="180" cy="130" r="20" fill="${c.accent}" opacity="0.12"/>
        <circle cx="180" cy="130" r="9" fill="${c.accent}" opacity="0.35"/>
        <circle cx="180" cy="130" r="4" fill="${c.textColor}" opacity="0.8"/>
        ${[0,45,90,135,180,225,270,315].map(a=>{
          const rad=a*Math.PI/180, px=180+Math.cos(rad)*17, py=130+Math.sin(rad)*17;
          return `<ellipse cx="${px}" cy="${py}" rx="4" ry="9" fill="${c.accent}" opacity="0.3" transform="rotate(${a} ${px} ${py})"/>`;
        }).join('')}
        <circle cx="120" cy="158" r="6" fill="${c.accent}" opacity="0.25"/>
        <circle cx="240" cy="158" r="6" fill="${c.accent}" opacity="0.25"/>
        <path d="M180 149 Q160 162 120 166" fill="none" stroke="${c.accent}" stroke-width="0.9" opacity="0.3"/>
        <path d="M180 149 Q200 162 240 166" fill="none" stroke="${c.accent}" stroke-width="0.9" opacity="0.3"/>
        <circle cx="75" cy="200" r="4" fill="${c.accent}" opacity="0.18"/>
        <circle cx="285" cy="200" r="4" fill="${c.accent}" opacity="0.18"/>` : '';
      const dividerEl = c.divider ? `
        <line x1="80" y1="232" x2="280" y2="232" stroke="${c.accent}" stroke-width="0.6" opacity="0.45"/>
        <circle cx="180" cy="232" r="3" fill="${c.accent}" opacity="0.6"/>
        <circle cx="140" cy="232" r="1.5" fill="${c.accent}" opacity="0.3"/>
        <circle cx="220" cy="232" r="1.5" fill="${c.accent}" opacity="0.3"/>` : '';
      const starField = c.stars ? `
        <circle cx="55" cy="90" r="1.2" fill="${c.accent}" opacity="0.35"/>
        <circle cx="305" cy="80" r="1.4" fill="${c.accent}" opacity="0.3"/>
        <circle cx="40" cy="310" r="1" fill="${c.accent}" opacity="0.25"/>
        <circle cx="320" cy="330" r="1.2" fill="${c.accent}" opacity="0.3"/>
        <circle cx="60" cy="400" r="1" fill="${c.accent}" opacity="0.2"/>
        <circle cx="300" cy="410" r="1.3" fill="${c.accent}" opacity="0.25"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="65" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="3" opacity="0.55">${c.tagline.toUpperCase()}</text>` : '';
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fbg" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#fbg)"/>
  ${borderEl}${cornerEl}${starField}${tagEl}${motifEl}${dividerEl}
  <text x="180" y="292" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="22" fill="${c.textColor}" letter-spacing="3" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="330" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.65">${c.year}</text>
  <circle cx="180" cy="400" r="5" fill="${c.accent}" opacity="0.18"/>
  <circle cx="150" cy="408" r="3.5" fill="${c.accent}" opacity="0.12"/>
  <circle cx="210" cy="408" r="3.5" fill="${c.accent}" opacity="0.12"/>
  <line x1="85" y1="425" x2="275" y2="425" stroke="${c.accent}" stroke-width="0.6" opacity="0.38"/>
</svg>`;
    }
  },

  // ── Geometric ─────────────────────────────────────────────────────────────
  {
    id: 'geometric',
    name: 'Geometric',
    icon: '◈',
    defaultBg1: '#080c14', defaultBg2: '#101828',
    defaultAccent: '#c9a84c', defaultText: '#e8c96a',
    render(c) {
      const borderEl = c.border ? `
        <rect x="12" y="12" width="336" height="456" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
        <rect x="20" y="20" width="320" height="440" fill="none" stroke="${c.accent}" stroke-width="0.3" opacity="0.2"/>` : '';
      const cornerEl = c.corners ? `
        <polygon points="12,12 52,12 12,52" fill="${c.accent}" opacity="0.2"/>
        <polygon points="348,12 308,12 348,52" fill="${c.accent}" opacity="0.2"/>
        <polygon points="12,468 52,468 12,428" fill="${c.accent}" opacity="0.2"/>
        <polygon points="348,468 308,468 348,428" fill="${c.accent}" opacity="0.2"/>` : '';
      const motifEl = c.motif ? `
        <polygon points="180,75 225,108 225,168 180,200 135,168 135,108" fill="none" stroke="${c.accent}" stroke-width="1.4" opacity="0.55"/>
        <polygon points="180,93 210,112 210,162 180,182 150,162 150,112" fill="${c.accent}" opacity="0.06"/>
        <polygon points="180,112 205,127 205,158 180,172 155,158 155,127" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>
        <circle cx="180" cy="138" r="9" fill="${c.accent}" opacity="0.4"/>
        <circle cx="180" cy="138" r="4" fill="${c.textColor}"/>
        <line x1="135" y1="108" x2="35" y2="55" stroke="${c.accent}" stroke-width="0.5" opacity="0.18"/>
        <line x1="225" y1="108" x2="325" y2="55" stroke="${c.accent}" stroke-width="0.5" opacity="0.18"/>
        <line x1="135" y1="168" x2="35" y2="225" stroke="${c.accent}" stroke-width="0.5" opacity="0.18"/>
        <line x1="225" y1="168" x2="325" y2="225" stroke="${c.accent}" stroke-width="0.5" opacity="0.18"/>` : '';
      const dividerEl = c.divider ? `
        <polygon points="180,262 186,270 180,278 174,270" fill="${c.accent}" opacity="0.75"/>
        <polygon points="157,266 161,270 157,274 153,270" fill="${c.accent}" opacity="0.35"/>
        <polygon points="203,266 207,270 203,274 199,270" fill="${c.accent}" opacity="0.35"/>
        <line x1="80" y1="270" x2="147" y2="270" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>
        <line x1="213" y1="270" x2="280" y2="270" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>` : '';
      const starField = c.stars ? `
        <line x1="35" y1="230" x2="35" y2="250" stroke="${c.accent}" stroke-width="0.6" opacity="0.28"/>
        <line x1="26" y1="240" x2="44" y2="240" stroke="${c.accent}" stroke-width="0.6" opacity="0.28"/>
        <line x1="325" y1="230" x2="325" y2="250" stroke="${c.accent}" stroke-width="0.6" opacity="0.28"/>
        <line x1="316" y1="240" x2="334" y2="240" stroke="${c.accent}" stroke-width="0.6" opacity="0.28"/>
        <circle cx="55" cy="360" r="2" fill="${c.accent}" opacity="0.2"/>
        <circle cx="305" cy="360" r="2" fill="${c.accent}" opacity="0.2"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="55" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="4" opacity="0.55">${c.tagline.toUpperCase()}</text>` : '';
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </linearGradient>
  </defs>
  <rect width="360" height="480" fill="url(#gbg)"/>
  ${borderEl}${cornerEl}${starField}${tagEl}${motifEl}${dividerEl}
  <text x="180" y="332" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="21" fill="${c.textColor}" letter-spacing="4" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="370" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="7" opacity="0.62">${c.year}</text>
</svg>`;
    }
  },

  // ── Celestial ─────────────────────────────────────────────────────────────
  {
    id: 'celestial',
    name: 'Celestial',
    icon: '☽',
    defaultBg1: '#040610', defaultBg2: '#0c1230',
    defaultAccent: '#8899ee', defaultText: '#dde8ff',
    render(c) {
      const starField = c.stars ? Array.from({length:80},(_,i)=>{
        const x=5+(i*61%350), y=5+(i*89%460), r=0.3+(i*41%14)/10, op=0.2+(i*23%7)/10;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.textColor}" opacity="${op}"/>`;
      }).join('') : '';
      const borderEl = c.border ? `<rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.3"/>` : '';
      const cornerEl = c.corners ? `
        <path d="M14 34 A20 20 0 0 1 34 14" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.45"/>
        <path d="M346 34 A20 20 0 0 0 326 14" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.45"/>
        <path d="M14 446 A20 20 0 0 0 34 466" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.45"/>
        <path d="M346 446 A20 20 0 0 1 326 466" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.45"/>` : '';
      const motifEl = c.motif ? `
        <!-- moon phases row -->
        <circle cx="100" cy="135" r="22" fill="${c.bg2}" opacity="0.7"/>
        <circle cx="88" cy="132" r="22" fill="${c.bg1}" opacity="0.9"/>
        <circle cx="100" cy="135" r="22" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.3"/>
        <!-- full moon -->
        <circle cx="180" cy="130" r="28" fill="${c.bg2}" opacity="0.5"/>
        <circle cx="180" cy="130" r="28" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
        <circle cx="180" cy="130" r="24" fill="none" stroke="${c.accent}" stroke-width="0.3" opacity="0.2"/>
        <!-- waning -->
        <circle cx="260" cy="135" r="22" fill="${c.bg2}" opacity="0.7"/>
        <circle cx="272" cy="132" r="22" fill="${c.bg1}" opacity="0.9"/>
        <circle cx="260" cy="135" r="22" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.3"/>
        <!-- connecting line -->
        <line x1="122" y1="135" x2="152" y2="130" stroke="${c.accent}" stroke-width="0.4" opacity="0.2"/>
        <line x1="208" y1="130" x2="238" y2="135" stroke="${c.accent}" stroke-width="0.4" opacity="0.2"/>` : '';
      const dividerEl = c.divider ? `
        <line x1="80" y1="278" x2="280" y2="278" stroke="${c.accent}" stroke-width="0.5" opacity="0.35"/>
        <circle cx="180" cy="278" r="2.5" fill="${c.accent}" opacity="0.5"/>` : '';
      const tagEl = c.tagline ? `<text x="180" y="68" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="10" fill="${c.accent}" letter-spacing="3" opacity="0.55">${c.tagline.toUpperCase()}</text>` : '';
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="celbg" cx="50%" cy="25%" r="80%">
      <stop offset="0%" stop-color="${c.bg2}"/>
      <stop offset="100%" stop-color="${c.bg1}"/>
    </radialGradient>
    <radialGradient id="celglow" cx="50%" cy="27%" r="45%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#celbg)"/>
  <rect width="360" height="480" fill="url(#celglow)"/>
  ${starField}${borderEl}${cornerEl}${tagEl}${motifEl}${dividerEl}
  <text x="180" y="335" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="22" fill="${c.textColor}" letter-spacing="3" opacity="0.95">${c.occasion.toUpperCase()}</text>
  <text x="180" y="373" text-anchor="middle" font-family="${c.font},Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.65">${c.year}</text>
  <line x1="90" y1="415" x2="270" y2="415" stroke="${c.accent}" stroke-width="0.5" opacity="0.35"/>
</svg>`;
    }
  },

];
