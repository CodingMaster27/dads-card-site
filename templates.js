// Card front templates — each returns an SVG string (viewBox="0 0 360 480")
// c = { primary, secondary, accent, text } color theme

const CARD_TEMPLATES = [
  {
    id: 'navy-gold',
    name: 'Navy & Gold',
    themes: [
      { id: 'classic', label: 'Classic', primary: '#0a0f1e', secondary: '#111f3a', accent: '#c9a84c', text: '#e8c96a' },
      { id: 'midnight', label: 'Midnight', primary: '#050810', secondary: '#0d1422', accent: '#a07830', text: '#c9a84c' },
      { id: 'royal', label: 'Royal', primary: '#0d0b2e', secondary: '#1a1650', accent: '#c9a84c', text: '#e8d070' },
    ],
    render(c, occasion, year) {
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${c.secondary}"/>
      <stop offset="100%" stop-color="${c.primary}"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#bg)"/>
  <rect width="360" height="480" fill="url(#glow)"/>
  <!-- border -->
  <rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
  <rect x="20" y="20" width="320" height="440" fill="none" stroke="${c.accent}" stroke-width="0.4" opacity="0.3"/>
  <!-- top ornament -->
  <line x1="80" y1="60" x2="280" y2="60" stroke="${c.accent}" stroke-width="0.8" opacity="0.6"/>
  <circle cx="180" cy="60" r="4" fill="${c.accent}" opacity="0.8"/>
  <circle cx="80" cy="60" r="2" fill="${c.accent}" opacity="0.6"/>
  <circle cx="280" cy="60" r="2" fill="${c.accent}" opacity="0.6"/>
  <polygon points="180,40 184,54 180,52 176,54" fill="${c.accent}" opacity="0.7"/>
  <!-- stars scattered -->
  <circle cx="60" cy="120" r="1.2" fill="${c.accent}" opacity="0.5"/>
  <circle cx="300" cy="100" r="1.5" fill="${c.accent}" opacity="0.4"/>
  <circle cx="40" cy="200" r="1" fill="${c.accent}" opacity="0.35"/>
  <circle cx="320" cy="220" r="1.2" fill="${c.accent}" opacity="0.4"/>
  <circle cx="70" cy="320" r="1" fill="${c.accent}" opacity="0.3"/>
  <circle cx="290" cy="340" r="1.5" fill="${c.accent}" opacity="0.4"/>
  <circle cx="50" cy="380" r="1" fill="${c.accent}" opacity="0.3"/>
  <circle cx="310" cy="370" r="1" fill="${c.accent}" opacity="0.35"/>
  <!-- main diamond -->
  <polygon points="180,130 210,180 180,230 150,180" fill="none" stroke="${c.accent}" stroke-width="1.2" opacity="0.6"/>
  <polygon points="180,148 200,180 180,212 160,180" fill="${c.accent}" opacity="0.08"/>
  <circle cx="180" cy="180" r="6" fill="${c.accent}" opacity="0.5"/>
  <circle cx="180" cy="180" r="3" fill="${c.text}"/>
  <!-- corner flourishes -->
  <path d="M30 30 Q50 30 50 50" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
  <path d="M330 30 Q310 30 310 50" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
  <path d="M30 450 Q50 450 50 430" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
  <path d="M330 450 Q310 450 310 430" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.5"/>
  <!-- divider -->
  <line x1="100" y1="280" x2="260" y2="280" stroke="${c.accent}" stroke-width="0.6" opacity="0.5"/>
  <circle cx="180" cy="280" r="3" fill="${c.accent}" opacity="0.6"/>
  <!-- occasion text -->
  <text x="180" y="330" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${c.text}" letter-spacing="3" opacity="0.95">${occasion.toUpperCase()}</text>
  <!-- year -->
  <text x="180" y="370" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${c.accent}" letter-spacing="6" opacity="0.7">${year}</text>
  <!-- bottom ornament -->
  <line x1="80" y1="420" x2="280" y2="420" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <circle cx="180" cy="420" r="3" fill="${c.accent}" opacity="0.6"/>
</svg>`;
    }
  },

  {
    id: 'night-sky',
    name: 'Night Sky',
    themes: [
      { id: 'cosmos', label: 'Cosmos', primary: '#020814', secondary: '#08142a', accent: '#c9a84c', text: '#e8f0ff' },
      { id: 'aurora', label: 'Aurora', primary: '#020c14', secondary: '#061a1e', accent: '#4cc9a8', text: '#b0f0e0' },
      { id: 'dusk', label: 'Dusk', primary: '#10060e', secondary: '#200a1c', accent: '#c97aaa', text: '#f0c0e0' },
    ],
    render(c, occasion, year) {
      const stars = Array.from({length: 60}, (_, i) => {
        const x = 20 + (i * 73 % 320);
        const y = 20 + (i * 97 % 380);
        const r = 0.5 + (i * 31 % 10) / 10;
        const op = 0.3 + (i * 17 % 6) / 10;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${c.text}" opacity="${op}"/>`;
      }).join('');
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sky" cx="50%" cy="20%" r="80%">
      <stop offset="0%" stop-color="${c.secondary}"/>
      <stop offset="100%" stop-color="${c.primary}"/>
    </radialGradient>
    <radialGradient id="moonGlow" cx="50%" cy="0%" r="60%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#sky)"/>
  <rect width="360" height="480" fill="url(#moonGlow)"/>
  ${stars}
  <!-- moon -->
  <circle cx="180" cy="150" r="55" fill="${c.secondary}" opacity="0.6"/>
  <circle cx="180" cy="150" r="50" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.4"/>
  <circle cx="165" cy="145" r="50" fill="${c.primary}" opacity="0.85"/>
  <!-- crescent glow -->
  <circle cx="180" cy="150" r="50" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity="0.25"/>
  <!-- border -->
  <rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>
  <!-- constellation lines -->
  <line x1="60" y1="80" x2="90" y2="110" stroke="${c.text}" stroke-width="0.4" opacity="0.25"/>
  <line x1="90" y1="110" x2="130" y2="90" stroke="${c.text}" stroke-width="0.4" opacity="0.25"/>
  <line x1="280" y1="70" x2="260" y2="100" stroke="${c.text}" stroke-width="0.4" opacity="0.25"/>
  <line x1="260" y1="100" x2="290" y2="120" stroke="${c.text}" stroke-width="0.4" opacity="0.25"/>
  <!-- bright stars -->
  <circle cx="60" cy="80" r="2" fill="${c.accent}" opacity="0.9"/>
  <circle cx="90" cy="110" r="1.5" fill="${c.text}" opacity="0.8"/>
  <circle cx="130" cy="90" r="2" fill="${c.accent}" opacity="0.7"/>
  <circle cx="280" cy="70" r="2.5" fill="${c.accent}" opacity="0.9"/>
  <circle cx="260" cy="100" r="1.5" fill="${c.text}" opacity="0.7"/>
  <circle cx="290" cy="120" r="1.8" fill="${c.accent}" opacity="0.8"/>
  <!-- divider -->
  <line x1="80" y1="270" x2="280" y2="270" stroke="${c.accent}" stroke-width="0.6" opacity="0.4"/>
  <circle cx="180" cy="270" r="2.5" fill="${c.accent}" opacity="0.6"/>
  <!-- text -->
  <text x="180" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${c.text}" letter-spacing="3" opacity="0.95">${occasion.toUpperCase()}</text>
  <text x="180" y="360" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.7">${year}</text>
  <!-- bottom ornament -->
  <line x1="100" y1="410" x2="260" y2="410" stroke="${c.accent}" stroke-width="0.6" opacity="0.4"/>
  <polygon points="180,395 183,405 180,403 177,405" fill="${c.accent}" opacity="0.5"/>
</svg>`;
    }
  },

  {
    id: 'floral',
    name: 'Floral Elegance',
    themes: [
      { id: 'gold', label: 'Gold', primary: '#0c0d08', secondary: '#141a0a', accent: '#c9a84c', text: '#e8c96a' },
      { id: 'rose', label: 'Rose', primary: '#120808', secondary: '#1e0f0f', accent: '#c9707a', text: '#f0c0c5' },
      { id: 'sage', label: 'Sage', primary: '#080c0a', secondary: '#0f1812', accent: '#7ac990', text: '#b0e8c0' },
    ],
    render(c, occasion, year) {
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fbg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${c.secondary}"/>
      <stop offset="100%" stop-color="${c.primary}"/>
    </radialGradient>
  </defs>
  <rect width="360" height="480" fill="url(#fbg)"/>
  <!-- border -->
  <rect x="12" y="12" width="336" height="456" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <!-- top floral cluster -->
  <!-- center flower -->
  <circle cx="180" cy="120" r="18" fill="${c.accent}" opacity="0.15"/>
  <circle cx="180" cy="120" r="8" fill="${c.accent}" opacity="0.4"/>
  <circle cx="180" cy="120" r="4" fill="${c.text}" opacity="0.8"/>
  <!-- petals -->
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(0 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(45 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(90 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(135 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(180 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(225 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(270 180 120)"/>
  <ellipse cx="180" cy="100" rx="5" ry="12" fill="${c.accent}" opacity="0.35" transform="rotate(315 180 120)"/>
  <!-- side flowers small -->
  <circle cx="110" cy="150" r="5" fill="${c.accent}" opacity="0.3"/>
  <ellipse cx="110" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(0 110 150)"/>
  <ellipse cx="110" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(60 110 150)"/>
  <ellipse cx="110" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(120 110 150)"/>
  <circle cx="250" cy="150" r="5" fill="${c.accent}" opacity="0.3"/>
  <ellipse cx="250" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(0 250 150)"/>
  <ellipse cx="250" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(60 250 150)"/>
  <ellipse cx="250" cy="142" rx="3" ry="7" fill="${c.accent}" opacity="0.25" transform="rotate(120 250 150)"/>
  <!-- stems/vines -->
  <path d="M180 138 Q160 160 110 165" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.3"/>
  <path d="M180 138 Q200 160 250 165" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.3"/>
  <!-- corner ornaments -->
  <path d="M28 28 Q50 28 60 48" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <circle cx="28" cy="28" r="2.5" fill="${c.accent}" opacity="0.5"/>
  <path d="M332 28 Q310 28 300 48" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <circle cx="332" cy="28" r="2.5" fill="${c.accent}" opacity="0.5"/>
  <path d="M28 452 Q50 452 60 432" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <circle cx="28" cy="452" r="2.5" fill="${c.accent}" opacity="0.5"/>
  <path d="M332 452 Q310 452 300 432" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <circle cx="332" cy="452" r="2.5" fill="${c.accent}" opacity="0.5"/>
  <!-- divider -->
  <line x1="80" y1="220" x2="280" y2="220" stroke="${c.accent}" stroke-width="0.6" opacity="0.5"/>
  <circle cx="180" cy="220" r="3" fill="${c.accent}" opacity="0.6"/>
  <!-- text -->
  <text x="180" y="280" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="${c.text}" letter-spacing="3">${occasion.toUpperCase()}</text>
  <text x="180" y="318" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="6" opacity="0.7">${year}</text>
  <!-- bottom floral strip -->
  <circle cx="180" cy="390" r="6" fill="${c.accent}" opacity="0.2"/>
  <circle cx="140" cy="395" r="4" fill="${c.accent}" opacity="0.15"/>
  <circle cx="220" cy="395" r="4" fill="${c.accent}" opacity="0.15"/>
  <circle cx="100" cy="405" r="3" fill="${c.accent}" opacity="0.1"/>
  <circle cx="260" cy="405" r="3" fill="${c.accent}" opacity="0.1"/>
  <line x1="80" y1="420" x2="280" y2="420" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>
</svg>`;
    }
  },

  {
    id: 'geometric',
    name: 'Geometric',
    themes: [
      { id: 'gold', label: 'Gold', primary: '#080c14', secondary: '#101828', accent: '#c9a84c', text: '#e8c96a' },
      { id: 'silver', label: 'Silver', primary: '#080808', secondary: '#141414', accent: '#a0aab8', text: '#dde4ee' },
      { id: 'copper', label: 'Copper', primary: '#100808', secondary: '#1a1010', accent: '#c87850', text: '#e8b090' },
    ],
    render(c, occasion, year) {
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.secondary}"/>
      <stop offset="100%" stop-color="${c.primary}"/>
    </linearGradient>
  </defs>
  <rect width="360" height="480" fill="url(#gbg)"/>
  <!-- grid lines subtle -->
  <line x1="0" y1="160" x2="360" y2="160" stroke="${c.accent}" stroke-width="0.3" opacity="0.12"/>
  <line x1="0" y1="320" x2="360" y2="320" stroke="${c.accent}" stroke-width="0.3" opacity="0.12"/>
  <line x1="120" y1="0" x2="120" y2="480" stroke="${c.accent}" stroke-width="0.3" opacity="0.12"/>
  <line x1="240" y1="0" x2="240" y2="480" stroke="${c.accent}" stroke-width="0.3" opacity="0.12"/>
  <!-- main hexagon -->
  <polygon points="180,80 230,110 230,170 180,200 130,170 130,110" fill="none" stroke="${c.accent}" stroke-width="1.5" opacity="0.6"/>
  <polygon points="180,95 218,117 218,163 180,185 142,163 142,117" fill="${c.accent}" opacity="0.06"/>
  <polygon points="180,115 205,130 205,160 180,175 155,160 155,130" fill="none" stroke="${c.accent}" stroke-width="0.6" opacity="0.4"/>
  <circle cx="180" cy="140" r="8" fill="${c.accent}" opacity="0.5"/>
  <circle cx="180" cy="140" r="3.5" fill="${c.text}"/>
  <!-- diagonal lines from hexagon corners -->
  <line x1="130" y1="110" x2="30" y2="50" stroke="${c.accent}" stroke-width="0.5" opacity="0.2"/>
  <line x1="230" y1="110" x2="330" y2="50" stroke="${c.accent}" stroke-width="0.5" opacity="0.2"/>
  <line x1="130" y1="170" x2="30" y2="230" stroke="${c.accent}" stroke-width="0.5" opacity="0.2"/>
  <line x1="230" y1="170" x2="330" y2="230" stroke="${c.accent}" stroke-width="0.5" opacity="0.2"/>
  <!-- triangles -->
  <polygon points="30,50 60,50 45,75" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>
  <polygon points="300,50 330,50 315,75" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>
  <polygon points="30,430 60,430 45,405" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>
  <polygon points="300,430 330,430 315,405" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.35"/>
  <!-- border double -->
  <rect x="14" y="14" width="332" height="452" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
  <rect x="22" y="22" width="316" height="436" fill="none" stroke="${c.accent}" stroke-width="0.4" opacity="0.2"/>
  <!-- divider row of diamonds -->
  <polygon points="180,265 186,272 180,279 174,272" fill="${c.accent}" opacity="0.7"/>
  <polygon points="155,268 159,272 155,276 151,272" fill="${c.accent}" opacity="0.35"/>
  <polygon points="205,268 209,272 205,276 201,272" fill="${c.accent}" opacity="0.35"/>
  <line x1="80" y1="272" x2="145" y2="272" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>
  <line x1="215" y1="272" x2="280" y2="272" stroke="${c.accent}" stroke-width="0.6" opacity="0.35"/>
  <!-- text -->
  <text x="180" y="330" text-anchor="middle" font-family="Georgia,serif" font-size="21" fill="${c.text}" letter-spacing="4">${occasion.toUpperCase()}</text>
  <text x="180" y="368" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="7" opacity="0.65">${year}</text>
</svg>`;
    }
  },

  {
    id: 'minimal',
    name: 'Minimal Script',
    themes: [
      { id: 'onyx', label: 'Onyx', primary: '#050505', secondary: '#0c0c0c', accent: '#c9a84c', text: '#f0ece0' },
      { id: 'slate', label: 'Slate', primary: '#070a10', secondary: '#10141e', accent: '#8090b0', text: '#d8e0f0' },
      { id: 'crimson', label: 'Crimson', primary: '#080404', secondary: '#120808', accent: '#b04040', text: '#f0d0d0' },
    ],
    render(c, occasion, year) {
      return `<svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mbg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${c.secondary}"/>
      <stop offset="100%" stop-color="${c.primary}"/>
    </linearGradient>
  </defs>
  <rect width="360" height="480" fill="url(#mbg)"/>
  <!-- single elegant border -->
  <rect x="24" y="24" width="312" height="432" fill="none" stroke="${c.accent}" stroke-width="0.8" opacity="0.45"/>
  <!-- top rule -->
  <line x1="60" y1="70" x2="300" y2="70" stroke="${c.accent}" stroke-width="0.6" opacity="0.5"/>
  <line x1="60" y1="74" x2="300" y2="74" stroke="${c.accent}" stroke-width="0.2" opacity="0.3"/>
  <!-- ornamental corners inner -->
  <line x1="24" y1="44" x2="44" y2="44" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="44" y1="24" x2="44" y2="44" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="336" y1="44" x2="316" y2="44" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="316" y1="24" x2="316" y2="44" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="24" y1="436" x2="44" y2="436" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="44" y1="456" x2="44" y2="436" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="336" y1="436" x2="316" y2="436" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <line x1="316" y1="456" x2="316" y2="436" stroke="${c.accent}" stroke-width="0.8" opacity="0.5"/>
  <!-- large decorative initial / monogram area -->
  <text x="180" y="220" text-anchor="middle" font-family="Georgia,serif" font-size="120" fill="${c.accent}" opacity="0.06" letter-spacing="-4">D</text>
  <!-- center dot cluster -->
  <circle cx="180" cy="170" r="1.5" fill="${c.accent}" opacity="0.7"/>
  <circle cx="172" cy="178" r="1" fill="${c.accent}" opacity="0.4"/>
  <circle cx="188" cy="178" r="1" fill="${c.accent}" opacity="0.4"/>
  <!-- middle rule -->
  <line x1="80" y1="260" x2="280" y2="260" stroke="${c.accent}" stroke-width="0.5" opacity="0.4"/>
  <!-- occasion text — large, elegant -->
  <text x="180" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="${c.text}" letter-spacing="2" opacity="0.95">${occasion}</text>
  <!-- year small caps -->
  <text x="180" y="358" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${c.accent}" letter-spacing="8" opacity="0.6">${year}</text>
  <!-- bottom rule -->
  <line x1="60" y1="406" x2="300" y2="406" stroke="${c.accent}" stroke-width="0.6" opacity="0.5"/>
  <line x1="60" y1="410" x2="300" y2="410" stroke="${c.accent}" stroke-width="0.2" opacity="0.3"/>
</svg>`;
    }
  },
];
