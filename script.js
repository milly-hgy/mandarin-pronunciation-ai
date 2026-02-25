/* ═══════════════════════════════════════════
   script.js — SoundPath AI Pronunciation App
   Extracted from Test1.html · autoplay=0
═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════ */
/* Demo sentence: 下個星期六，我們學校有一個音樂會，希望你能來。
   Pinyin: Xià ge xīngqīliù, wǒmen xuéxiào yǒu yí ge yīnyuèhuì, xīwàng nǐ néng lái. */
const SYLLABLES = [
  {char:'下', pinyin:'xià',  type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'個', pinyin:'ge',   type:'correct',        tooltip:'✓ Correct — neutral tone'},
  {char:'星', pinyin:'xīng', type:'initial-error',  tooltip:'⚠ Initial Error: x — tongue blade too retracted (j/q/x group)',
    anatomyKey:'xsh',
    videoSrc:'https://www.youtube.com/embed/05BMKdxHjp8?start=33',
    videoLabel:'星 (xīng) — Initial x: tongue blade position (j/q/x group)'},
  {char:'期', pinyin:'qī',   type:'correct',        tooltip:'✓ Correct — 1st tone'},
  {char:'六', pinyin:'liù',  type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'我', pinyin:'wǒ',   type:'correct',        tooltip:'✓ Correct — 3rd tone'},
  {char:'們', pinyin:'men',  type:'correct',        tooltip:'✓ Correct — neutral tone'},
  {char:'學', pinyin:'xué',  type:'correct',        tooltip:'✓ Correct — 2nd tone'},
  {char:'校', pinyin:'xiào', type:'compound-error', tooltip:'⚠ Compound Final Error: -iao glide needs tighter lip rounding',
    anatomyKey:'iao',
    videoSrc:'https://www.youtube.com/embed/IwXyiWNv1Ts?start=260',
    videoLabel:'校 (xiào) — Compound Final: -iao vowel glide & lip shape'},
  {char:'有', pinyin:'yǒu',  type:'correct',        tooltip:'✓ Correct — 3rd tone'},
  {char:'一', pinyin:'yī',   type:'correct',        tooltip:'✓ Correct — 1st tone'},
  {char:'個', pinyin:'gè',   type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'音', pinyin:'yīn',  type:'correct',        tooltip:'✓ Correct — 1st tone'},
  {char:'樂', pinyin:'yuè',  type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'會', pinyin:'huì',  type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'希', pinyin:'xī',   type:'correct',        tooltip:'✓ Correct — 1st tone'},
  {char:'望', pinyin:'wàng', type:'correct',        tooltip:'✓ Correct — 4th tone'},
  {char:'你', pinyin:'nǐ',   type:'correct',        tooltip:'✓ Correct — 3rd tone'},
  {char:'能', pinyin:'néng', type:'tone-error',     tooltip:'✗ Tone Error: 2nd tone too flat — contour should rise sharply (35→55)',
    anatomyKey:'tone2',
    videoSrc:'https://www.youtube.com/embed/n_Cj3aOSI1w?start=433',
    videoLabel:'能 (néng) — Tone Error: 2nd tone (rising) pitch correction'},
  {char:'來', pinyin:'lái',  type:'correct',        tooltip:'✓ Correct — 2nd tone'},
];

/* Full-sentence pitch data for 下個星期六，我們學校有一個音樂會，希望你能來。 */
const SENTENCE_PITCH = [
  {char:'下', pinyin:'xià',  tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.90,.80,.66,.50,.38,.27,.17,.09]},
  {char:'個', pinyin:'ge',   tone:0, native:[.44,.43,.43,.42,.42,.42,.41,.41], user:[.43,.43,.42,.42,.41,.41,.40,.40]},
  {char:'星', pinyin:'xīng', tone:1, native:[.82,.82,.82,.82,.82,.82,.82,.82], user:[.77,.78,.78,.77,.77,.78,.77,.77], error:'initial-error'},
  {char:'期', pinyin:'qī',   tone:1, native:[.82,.82,.82,.82,.82,.82,.82,.82], user:[.81,.82,.81,.82,.81,.82,.81,.82]},
  {char:'六', pinyin:'liù',  tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.91,.81,.67,.51,.39,.27,.17,.10]},
  {char:'我', pinyin:'wǒ',   tone:3, native:[.55,.38,.18,.10,.08,.25,.52,.72], user:[.53,.36,.17,.09,.08,.24,.50,.70]},
  {char:'們', pinyin:'men',  tone:0, native:[.44,.43,.43,.42,.42,.42,.41,.41], user:[.44,.43,.43,.42,.41,.41,.41,.40]},
  {char:'學', pinyin:'xué',  tone:2, native:[.28,.38,.50,.62,.72,.82,.88,.93], user:[.29,.39,.51,.62,.72,.82,.88,.93]},
  {char:'校', pinyin:'xiào', tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.88,.78,.64,.50,.40,.32,.25,.20], error:'compound-error'},
  {char:'有', pinyin:'yǒu',  tone:3, native:[.55,.38,.18,.10,.08,.25,.52,.72], user:[.54,.37,.18,.10,.08,.24,.51,.71]},
  {char:'一', pinyin:'yī',   tone:1, native:[.82,.82,.82,.82,.82,.82,.82,.82], user:[.82,.82,.82,.82,.82,.82,.82,.82]},
  {char:'個', pinyin:'gè',   tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.91,.81,.67,.51,.39,.27,.18,.10]},
  {char:'音', pinyin:'yīn',  tone:1, native:[.82,.82,.82,.82,.82,.82,.82,.82], user:[.82,.82,.82,.82,.82,.82,.82,.82]},
  {char:'樂', pinyin:'yuè',  tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.91,.81,.67,.51,.39,.27,.18,.10]},
  {char:'會', pinyin:'huì',  tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.91,.81,.67,.51,.39,.27,.17,.09]},
  {char:'希', pinyin:'xī',   tone:1, native:[.82,.82,.82,.82,.82,.82,.82,.82], user:[.81,.82,.81,.82,.81,.82,.81,.82]},
  {char:'望', pinyin:'wàng', tone:4, native:[.92,.82,.68,.52,.40,.28,.18,.10], user:[.91,.81,.67,.51,.39,.27,.18,.10]},
  {char:'你', pinyin:'nǐ',   tone:3, native:[.55,.38,.18,.10,.08,.25,.52,.72], user:[.54,.37,.17,.09,.08,.24,.50,.71]},
  {char:'能', pinyin:'néng', tone:2, native:[.28,.38,.50,.62,.72,.82,.88,.93], user:[.28,.32,.36,.40,.44,.50,.56,.62], error:'tone-error'},
  {char:'來', pinyin:'lái',  tone:2, native:[.28,.38,.50,.62,.72,.82,.88,.93], user:[.29,.39,.51,.62,.72,.82,.88,.93]},
];

/* ═══════════════════════════════════════════
   VIDEO MAP — YouTube IDs + Start Times
═══════════════════════════════════════════ */
const VIDEO_MAP = {
  simpleFinals: {
    videoId: 'zgTmdJXNfNY',
    phonemes: { a:115, o:149, e:203, i:257, u:300, 'ü':347 }
  },
  initials: {
    bpmf:    { videoId: 'P73V1Qh9K10', phonemes: { b:114, p:167, m:239, f:257 } },
    dtnl:    { videoId: 'q-Wxb-hgCNc', phonemes: { d:340, t:358, n:395, l:423 } },
    gkh:     { videoId: 'ohDuo4bDqlI', phonemes: { g:73,  k:130, h:168 } },
    jqx:     { videoId: '05BMKdxHjp8', phonemes: { j:118, q:187, x:33 } },
    zcs:     { videoId: '-69O93VF404', phonemes: { z:119, c:182, s:32 } },
    zhchshr: { videoId: 'dpQ3IMd4AMg', phonemes: { zh:144, ch:227, sh:71, r:298 } }
  },
  compoundFinals: {
    videoId: 'IwXyiWNv1Ts',
    phonemes: { ai:167, ei:167, ao:167, ou:167, ie:211, 'üe':211, er:211, an:228, en:228, 'in':228 }
  },
  tones: {
    videoId: 'n_Cj3aOSI1w',
    phonemes: { tone1:134, tone2:433, tone3:189, tone4:501, neutral:571 }
  }
};

/* ═══════════════════════════════════════════
   PINYIN DICTIONARY (common characters)
═══════════════════════════════════════════ */
const PINYIN_DICT = {
  '我':'wǒ','你':'nǐ','他':'tā','她':'tā','它':'tā','们':'men','好':'hǎo','是':'shì',
  '的':'de','了':'le','在':'zài','有':'yǒu','这':'zhè','那':'nà','个':'gè','人':'rén',
  '大':'dà','小':'xiǎo','中':'zhōng','国':'guó','学':'xué','生':'shēng','老':'lǎo',
  '师':'shī','来':'lái','去':'qù','说':'shuō','话':'huà','听':'tīng','看':'kàn',
  '想':'xiǎng','普':'pǔ','通':'tōng','发':'fā','音':'yīn','汉':'hàn','语':'yǔ',
  '谢':'xiè','不':'bù','要':'yào','吃':'chī','喝':'hē','饭':'fàn','水':'shuǐ',
  '茶':'chá','很':'hěn','真':'zhēn','对':'duì','吗':'ma','呢':'ne','啊':'a',
  '上':'shàng','下':'xià','里':'lǐ','前':'qián','后':'hòu','左':'zuǒ','右':'yòu',
  '多':'duō','少':'shǎo','一':'yī','二':'èr','三':'sān','四':'sì','五':'wǔ',
  '年':'nián','月':'yuè','天':'tiān','今':'jīn','明':'míng','早':'zǎo','晚':'wǎn',
  '走':'zǒu','跑':'pǎo','坐':'zuò','站':'zhàn','开':'kāi','用':'yòng','做':'zuò',
  '爱':'ài','喜':'xǐ','欢':'huān','高':'gāo','兴':'xìng','快':'kuài','乐':'lè',
  '请':'qǐng','问':'wèn','答':'dá','读':'dú','写':'xiě','书':'shū','字':'zì',
  '名':'míng','叫':'jiào','住':'zhù','家':'jiā','朋':'péng','友':'yǒu','老':'lǎo'
};

/* ═══════════════════════════════════════════
   STT STATE
═══════════════════════════════════════════ */
let sttRecognized   = '';
let activeRecognition = null;
let isListening     = false;
let currentSyllables = SYLLABLES;

/* ═══════════════════════════════════════════
   SCORE → CEFR LEVEL
═══════════════════════════════════════════ */
function scoreToLevel(score) {
  if (score >= 96) return { level:'C2', label:'Mastery',            color:'#38d8d8' };
  if (score >= 86) return { level:'C1', label:'Proficient',         color:'#34d8a0' };
  if (score >= 71) return { level:'B2', label:'Upper-Intermediate', color:'#4f8ef7' };
  if (score >= 56) return { level:'B1', label:'Intermediate',       color:'#f0b429' };
  if (score >= 41) return { level:'A2', label:'Elementary',         color:'#f07848' };
  return              { level:'A1', label:'Beginner',           color:'#e8503a' };
}

/* ═══════════════════════════════════════════
   REAL-TIME STT (Web Speech API)
═══════════════════════════════════════════ */
function startSTT() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Speech recognition is not supported in this browser.\nPlease use Chrome or Edge.\n\nFalling back to demo mode.');
    runDemo();
    return;
  }

  // Toggle off if already listening
  if (isListening) {
    if (activeRecognition) activeRecognition.stop();
    return;
  }

  const recognition   = new SR();
  activeRecognition   = recognition;
  recognition.lang           = 'zh-CN';
  recognition.continuous     = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  isListening = true;
  const btn  = document.getElementById('recordMainBtn');
  const stat = document.getElementById('rpStatus');
  const res  = document.getElementById('rpResult');

  btn.classList.add('listening');
  stat.textContent = '● Listening… speak now';
  res.textContent  = '';
  sttRecognized    = '';

  recognition.onresult = (e) => {
    const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
    res.textContent = transcript;
    if (e.results[e.results.length - 1].isFinal) {
      sttRecognized = transcript;
    }
  };

  recognition.onend = () => {
    isListening = false;
    btn.classList.remove('listening');
    if (sttRecognized) {
      stat.textContent = '✓ Captured — running AI analysis…';
      // Immediately update Target Sentence display
      const tse = document.getElementById('targetSentenceText');
      if (tse) tse.textContent = sttRecognized;
      // Show captured text in upload zone
      const zone = document.getElementById('uploadZone');
      zone.innerHTML = `
        <div class="upload-icon" style="background:rgba(52,216,160,0.2)">
          <svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:var(--jade);fill:none;stroke-width:2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="upload-title" style="font-family:'Noto Serif SC',serif;font-size:24px;letter-spacing:3px">"${sttRecognized}"</div>
        <div class="upload-sub">Speech captured · Phonetic analysis in progress…</div>`;
      setFlowStep(2);
      setTimeout(runProcessing, 400);
    } else {
      stat.textContent = 'Tap to Record';
      res.textContent  = 'No speech detected — try again.';
    }
  };

  recognition.onerror = (e) => {
    isListening = false;
    btn.classList.remove('listening');
    if (e.error === 'not-allowed') {
      alert('Microphone access was denied.\nPlease allow microphone access in your browser settings and try again.');
    } else {
      const stat2 = document.getElementById('rpStatus');
      if (stat2) stat2.textContent = 'Error: ' + e.error + ' — tap to retry';
    }
  };

  recognition.start();
}

/* ═══════════════════════════════════════════
   PINYIN → COLORED HTML
═══════════════════════════════════════════ */
function renderPinyinColored(pinyin) {
  const TONE_CHARS = new Set('āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ'.split(''));
  const PLAIN_VOWELS = new Set('aoeiu'.split(''));
  const INITIALS = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','z','c','s','r','y','w'];
  const toneBase  = {ā:'a',á:'a',ǎ:'a',à:'a',ō:'o',ó:'o',ǒ:'o',ò:'o',ē:'e',é:'e',ě:'e',è:'e',ī:'i',í:'i',ǐ:'i',ì:'i',ū:'u',ú:'u',ǔ:'u',ù:'u',ǖ:'ü',ǘ:'ü',ǚ:'ü',ǜ:'ü'};

  let str = pinyin;
  let html = '';

  // 1. Extract initial
  let iniStr = '';
  for (const ini of INITIALS) {
    if (str.toLowerCase().startsWith(ini)) {
      iniStr = str.slice(0, ini.length);
      str    = str.slice(ini.length);
      break;
    }
  }
  if (iniStr) html += `<span class="ph-initial">${iniStr}</span>`;

  // 2. Classify the final (compound if > 1 base char)
  const baseStr   = str.split('').map(c => toneBase[c] || c).join('');
  const isCompound = baseStr.length > 1;

  // 3. Render each character of the final
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (TONE_CHARS.has(ch)) {
      html += `<span class="ph-tone">${ch}</span>`;
    } else if (PLAIN_VOWELS.has(ch) || ch === 'ü') {
      html += isCompound
        ? `<span class="ph-compound">${ch}</span>`
        : `<span class="ph-simple">${ch}</span>`;
    } else {
      // Coda consonant (n, ng, r …)
      html += `<span class="ph-compound">${ch}</span>`;
    }
  }

  return html || `<span>${pinyin}</span>`;
}

/* ═══════════════════════════════════════════
   BUILD SYLLABLES FROM STT TEXT
═══════════════════════════════════════════ */
function buildSyllablesFromSTT(text) {
  const chars = [...text].filter(c => /[\u4e00-\u9fff]/.test(c));
  if (chars.length === 0) return SYLLABLES;

  // Weighted error distribution (realistic simulation)
  const errorPool = [
    'correct','correct','correct','correct',
    'tone-error','tone-error',
    'initial-error',
    'vowel-error'
  ];
  const tooltipMap = {
    'correct':       '✓ Correct',
    'tone-error':    '✗ Tone Error: pitch contour deviated from target',
    'initial-error': '⚠ Initial Error: consonant articulation needs adjustment',
    'vowel-error':   '⚠ Vowel Error: vowel shape or lip position incorrect'
  };

  return chars.slice(0, 10).map((char, i) => {
    let pinyin;
    if (window.pinyinPro) {
      // Dynamic conversion via pinyin-pro — works for any Chinese character
      const result = window.pinyinPro.pinyin(char, { toneType: 'symbol', type: 'array' });
      pinyin = (result && result[0]) || PINYIN_DICT[char] || '?';
    } else {
      // Static dictionary fallback (used if CDN is unavailable)
      pinyin = PINYIN_DICT[char] || '?';
    }
    const type = errorPool[i % errorPool.length];
    return { char, pinyin, type, tooltip: tooltipMap[type] };
  });
}

/* ═══════════════════════════════════════════
   ERROR SUMMARY BUILDER
═══════════════════════════════════════════ */
function buildErrorSummary(syllables) {
  const container = document.getElementById('errorSummaryContent');
  if (!container) return;

  const toneErrs    = syllables.filter(s => s.type === 'tone-error');
  const initialErrs = syllables.filter(s => s.type === 'initial-error');
  const vowelErrs   = syllables.filter(s => s.type === 'vowel-error');
  const items       = [];

  if (toneErrs.length)
    items.push({
      color:'#e8503a', icon:'🔴',
      label:`Tone Errors — <span style="font-family:'Noto Serif SC',serif;font-size:14px">${toneErrs.map(s=>s.char).join(' ')}</span>`,
      tip:'Your pitch contour deviates from the target tone. Practise the 214 dip for 3rd tone and hold the level for 1st tone.'
    });
  if (initialErrs.length)
    items.push({
      color:'#c4a8ff', icon:'🟣',
      label:`Initial Consonant Errors — <span style="font-family:'Noto Serif SC',serif;font-size:14px">${initialErrs.map(s=>s.char).join(' ')}</span>`,
      tip:'Tongue and lip positioning for these initials needs attention. Contrast pairs like x/sh and z/zh slowly in a mirror.'
    });
  if (vowelErrs.length)
    items.push({
      color:'#f0b429', icon:'🟠',
      label:`Vowel / Final Errors — <span style="font-family:'Noto Serif SC',serif;font-size:14px">${vowelErrs.map(s=>s.char).join(' ')}</span>`,
      tip:'Mouth opening shape or lip rounding needs adjustment. For ü: hold "ee" tongue position while rounding lips tightly.'
    });

  if (items.length === 0) {
    container.innerHTML = `
      <div class="es-item" style="border-left-color:var(--jade)">
        <div class="es-icon">✅</div>
        <div>
          <div class="es-label" style="color:var(--jade)">Excellent Pronunciation!</div>
          <div class="es-tip">No major errors detected in this recording. Keep practising for native-level refinement.</div>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = items.map(it => `
    <div class="es-item" style="border-left-color:${it.color}">
      <div class="es-icon">${it.icon}</div>
      <div>
        <div class="es-label" style="color:${it.color}">${it.label}</div>
        <div class="es-tip">${it.tip}</div>
      </div>
    </div>`).join('');
}

/* ═══════════════════════════════════════════
   VIDEO INTERVENTION
═══════════════════════════════════════════ */
function updateVideoIntervention(errorType, phoneme) {
  let videoId = null, startTime = 0, displayLabel = String(phoneme);

  if (errorType === 'tone') {
    const key  = (typeof phoneme === 'number') ? 'tone' + phoneme : phoneme;
    videoId    = VIDEO_MAP.tones.videoId;
    startTime  = VIDEO_MAP.tones.phonemes[key] || VIDEO_MAP.tones.phonemes.tone3;
    displayLabel = 'Tone ' + phoneme;
  } else if (errorType === 'simpleFinal') {
    videoId    = VIDEO_MAP.simpleFinals.videoId;
    startTime  = VIDEO_MAP.simpleFinals.phonemes[phoneme] || 115;
  } else if (errorType === 'compoundFinal') {
    videoId    = VIDEO_MAP.compoundFinals.videoId;
    startTime  = VIDEO_MAP.compoundFinals.phonemes[phoneme] || 167;
  } else if (errorType === 'initial') {
    for (const group of Object.values(VIDEO_MAP.initials)) {
      if (phoneme in group.phonemes) {
        videoId   = group.videoId;
        startTime = group.phonemes[phoneme];
        break;
      }
    }
  }

  if (!videoId) return;

  const iframe  = document.getElementById('ytPlayer');
  const caption = document.getElementById('videoCaption');
  const ph      = document.getElementById('ytPlaceholder');

  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=0`;
  }
  if (caption) {
    caption.textContent = `Recommended for you: Practice your "${displayLabel}" technique.`;
  }
  if (ph) ph.style.display = 'none';
}

/* ═══════════════════════════════════════════
   HELPER: extract initial from pinyin
═══════════════════════════════════════════ */
function extractInitial(pinyin) {
  const INITIALS = ['zh','ch','sh','b','p','m','f','d','t','n','l','g','k','h','j','q','x','z','c','s','r'];
  for (const ini of INITIALS) {
    if (pinyin.toLowerCase().startsWith(ini)) return ini;
  }
  return null;
}

const ANATOMY = {
  /* ── 2nd Tone (Rising) — 能 néng ── */
  tone2:{
    tag:'Tone Error · 2nd Tone',title:'Rising 陽平 (35)',
    sub:'Start low at 3, rise steadily to 5. Your contour was too flat.',
    videoTitle:'2nd Tone Rising Contour — n_Cj3aOSI1w (7:13)',
    videoSrc:'https://www.youtube.com/embed/n_Cj3aOSI1w?start=433',
    steps:[
      {title:'Start Low — Pitch Level 3',text:'Begin from a mid-low pitch (about 35% of your range). Resist the urge to start flat. The low starting point is what distinguishes this from the 1st tone.'},
      {title:'Rise Continuously to Level 5',text:'Keep pushing your pitch upward without any dip or plateau. Think of it as a question in English: "Really?". The rise should be energetic and sustained for the full duration of the syllable.'},
      {title:'Practise with Contrast',text:'Alternate "māo (1st) — máo (2nd) — mǎo (3rd) — mào (4th)". Feel the difference in the starting pitch and trajectory. Record yourself and compare your F0 curve to the native standard above.'},
    ],
    svg:(s)=>{
      const tp=document.getElementById('tonguePath'),hl=document.getElementById('highlightCircle');
      hl.setAttribute('opacity','0.7');
      if(s===0){hl.setAttribute('cx',120);hl.setAttribute('cy',180);tp.setAttribute('d','M80 170 Q102 155 132 155 Q156 155 162 167 L162 177 Q155 182 132 182 Q102 182 80 177 Z');}
      else if(s===1){hl.setAttribute('cx',120);hl.setAttribute('cy',90);tp.setAttribute('d','M80 168 Q102 152 132 152 Q156 152 162 165 L162 175 Q155 180 132 180 Q102 180 80 175 Z');}
      else{hl.setAttribute('cx',120);hl.setAttribute('cy',130);tp.setAttribute('d','M80 169 Q102 153 132 153 Q156 153 162 166 L162 176 Q155 181 132 181 Q102 181 80 176 Z');}
    }
  },
  /* ── -iao Compound Final — 校 xiào ── */
  iao:{
    tag:'Compound Final Error · -iao',title:'-iao Glide: Lip & Tongue Shape',
    sub:'Open wide on -a, then glide smoothly to rounded -o.',
    videoTitle:'-iao Compound Final — IwXyiWNv1Ts (4:20)',
    videoSrc:'https://www.youtube.com/embed/IwXyiWNv1Ts?start=260',
    steps:[
      {title:'Start with a High Tongue — "ee" (i)',text:'Begin with the tongue high and front, mouth slightly open, as if saying "ee" (yī). This is the on-glide. Many learners skip this and start too open.'},
      {title:'Drop Wide Open on "ah" (a)',text:'From the high-front position, immediately open the jaw wide and lower the tongue to the central-low "ah" position. This should be the most prominent, loudest part of the syllable.'},
      {title:'Glide to Rounded "oh" (o)',text:'Without pausing, round the lips into a small circle and raise the back of the tongue for the off-glide "o". The movement should be fluid. Practise: "i-ah-oh" merging into one smooth glide.'},
    ],
    svg:(s)=>{
      const ul=document.getElementById('upperLip'),ll=document.getElementById('lowerLip'),tp=document.getElementById('tonguePath'),hl=document.getElementById('highlightCircle');
      if(s===0){
        tp.setAttribute('d','M80 160 Q106 143 134 143 Q157 146 163 160 L163 170 Q155 176 134 176 Q106 176 80 170 Z');
        ul.setAttribute('d','M90 196 Q120 190 150 196 Q120 202 90 196');
        ll.setAttribute('d','M90 204 Q120 200 150 204 Q150 215 120 218 Q90 215 90 204');
        hl.setAttribute('cx',120);hl.setAttribute('cy',160);
      } else if(s===1){
        tp.setAttribute('d','M80 178 Q102 172 132 172 Q155 172 162 180 L162 190 Q154 195 132 195 Q102 195 80 190 Z');
        ul.setAttribute('d','M86 196 Q120 184 154 196 Q120 206 86 196');
        ll.setAttribute('d','M86 206 Q120 198 154 206 Q154 222 120 226 Q86 222 86 206');
        hl.setAttribute('cx',120);hl.setAttribute('cy',206);
      } else {
        tp.setAttribute('d','M80 168 Q102 152 130 153 Q154 154 162 167 L162 177 Q154 183 130 183 Q102 183 80 177 Z');
        ul.setAttribute('d','M104 197 Q120 192 136 197 Q120 203 104 197');
        ll.setAttribute('d','M104 205 Q120 201 136 205 Q136 213 120 216 Q104 213 104 205');
        hl.setAttribute('cx',120);hl.setAttribute('cy',205);
      }
      hl.setAttribute('opacity','0.8');
    }
  },
  tone3:{
    tag:'Tone Error · 3rd Tone',title:'Dip-Rise 上聲 (214)',
    sub:'Start mid (2), dip to low (1), then rise to high (4).',
    videoTitle:'3rd Tone Dip-Rise — Tone Tutorial',
    videoSrc:'https://www.youtube.com/embed/n_Cj3aOSI1w?start=189',
    steps:[
      {title:'Start Mid — Pitch Level 2',text:'Begin at a relaxed mid-low pitch. Many learners start too high. The 3rd tone starts low-mid, not high.'},
      {title:'Dip Deeply to Level 1',text:'Drop your pitch to the lowest comfortable point. Feel the larynx descend. This deep dip is the defining feature of the 3rd tone. Most learner errors skip this dip entirely.'},
      {title:'Rise to Level 4 (High)',text:'After the dip, push pitch upward energetically. In natural speech the rise may be abbreviated — but the dip must always be present. Practise slowly then speed up.'},
    ],
    svg:(s)=>{
      const tp=document.getElementById('tonguePath'),hl=document.getElementById('highlightCircle');
      if(s===0){tp.setAttribute('d','M80 166 Q102 149 132 149 Q156 149 162 163 L162 173 Q155 178 132 178 Q102 178 80 173 Z');hl.setAttribute('cx',120);hl.setAttribute('cy',90);}
      else if(s===1){tp.setAttribute('d','M80 172 Q102 160 132 160 Q156 160 162 170 L162 180 Q155 184 132 184 Q102 184 80 180 Z');hl.setAttribute('cx',120);hl.setAttribute('cy',210);}
      else{tp.setAttribute('d','M80 162 Q102 144 132 144 Q156 144 162 158 L162 168 Q155 174 132 174 Q102 174 80 168 Z');hl.setAttribute('cx',120);hl.setAttribute('cy',88);}
    }
  },
  xsh:{
    tag:'Initial Error · x vs. sh',title:'x (palatal) vs. sh (retroflex)',
    sub:'Tongue blade position determines everything',
    videoTitle:'x vs. sh: Tongue Position (5:47)',
    steps:[
      {title:'For "x" — Blade Forward',text:'Place the tongue BLADE (not the tip) just behind the upper front teeth. The tongue tip must rest against lower teeth. Hissing friction from the front of the mouth.'},
      {title:'For "sh" — Tip Curled Back',text:'Curl the tongue TIP upward and slightly backward toward the hard palate. Do not touch — just approach. Friction from mid-mouth, not the front.'},
      {title:'Practice the Contrast',text:'Alternate slowly: "xi — shi — xi — shi." Feel the tongue tip moving: flat-forward for x, curled-back for sh. Use a mirror to confirm the position difference.'},
    ],
    svg:(s)=>{
      const tp=document.getElementById('tonguePath'),tt=document.getElementById('tongueTip'),af=document.getElementById('airFlow'),hl=document.getElementById('highlightCircle');
      af.setAttribute('opacity','1');
      if(s===0){tp.setAttribute('d','M80 168 Q106 146 136 148 Q158 148 163 163 L163 173 Q157 178 136 178 Q106 178 80 175 Z');tt.setAttribute('cx',87);tt.setAttribute('cy',170);hl.setAttribute('cx',100);hl.setAttribute('cy',148);}
      else if(s===1){tp.setAttribute('d','M80 174 Q98 168 118 146 Q138 136 152 146 Q162 156 163 166 L163 178 Q155 182 132 182 Q100 182 80 178 Z');tt.setAttribute('cx',118);tt.setAttribute('cy',146);hl.setAttribute('cx',126);hl.setAttribute('cy',138);}
      else{tp.setAttribute('d','M80 170 Q102 153 130 151 Q155 151 163 164 L163 174 Q155 180 130 180 Q102 180 80 175 Z');tt.setAttribute('cx',85);tt.setAttribute('cy',170);hl.setAttribute('cx',104);hl.setAttribute('cy',152);}
    }
  },
  uuml:{
    tag:'Vowel Error · üe',title:'The üe Vowel: Lip Rounding Control',
    sub:'Say “ee” (i), then round your lips without moving your tongue.',
    videoTitle:'The üe Vowel: Perfect Roundness (6:15)',
    steps:[
      {title:'Step 1 — Set Tongue for "ee"',text:'Position tongue high and forward, as if saying "ee" (yī). The tongue body is raised toward the hard palate. This is the correct tongue position for ü.'},
      {title:'Step 2 — Round Your Lips Tightly',text:'While holding the "ee" tongue position without moving it, round your lips into a small tight circle — like puckering to whistle. Aperture should be roughly 8–10mm wide.'},
      {title:'Step 3 — Mirror Check',text:'Look in a mirror. If you can see your upper front teeth, your lips are not rounded enough. The correct ü has lips fully pursed — only a tiny oval opening visible.'},
    ],
    svg:(s)=>{
      const ul=document.getElementById('upperLip'),ll=document.getElementById('lowerLip'),tp=document.getElementById('tonguePath'),hl=document.getElementById('highlightCircle');
      hl.setAttribute('cx',120);hl.setAttribute('cy',204);
      if(s===0){ul.setAttribute('d','M90 196 Q120 190 150 196 Q120 202 90 196');ll.setAttribute('d','M90 204 Q120 200 150 204 Q150 215 120 218 Q90 215 90 204');tp.setAttribute('d','M80 160 Q106 143 134 143 Q157 146 163 160 L163 170 Q155 176 134 176 Q106 176 80 170 Z');}
      else if(s===1){ul.setAttribute('d','M103 197 Q120 191 137 197 Q120 203 103 197');ll.setAttribute('d','M103 205 Q120 201 137 205 Q137 213 120 215 Q103 213 103 205');tp.setAttribute('d','M80 160 Q106 143 134 143 Q157 146 163 160 L163 170 Q155 176 134 176 Q106 176 80 170 Z');}
      else{ul.setAttribute('d','M108 197 Q120 192 132 197 Q120 202 108 197');ll.setAttribute('d','M108 205 Q120 202 132 205 Q132 211 120 213 Q108 211 108 205');tp.setAttribute('d','M80 160 Q106 143 134 143 Q157 146 163 160 L163 170 Q155 176 134 176 Q106 176 80 170 Z');}
    }
  }
};

/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
let currentAnat = null, anatStep = 0;

/* ═══════════════════════════════════════════
   FLOW STEPS
═══════════════════════════════════════════ */
function setFlowStep(n) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('fstep' + i);
    if (!el) continue;
    el.classList.remove('active','done');
    if (i < n)      el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }
}

function handleUpload(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const zone = document.getElementById('uploadZone');
  zone.innerHTML = `
    <div class="upload-icon" style="background:rgba(79,142,247,0.2)">
      <svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:var(--accent2);fill:none;stroke-width:1.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    <div class="upload-title">${file.name}</div>
    <div class="upload-sub">${(file.size/1024/1024).toFixed(2)} MB · Queued for AI analysis</div>`;
  setFlowStep(2);
  setTimeout(runProcessing, 400);
}

function runDemo() {
  setFlowStep(2);
  document.getElementById('upload-section').scrollIntoView({behavior:'smooth'});
  const zone = document.getElementById('uploadZone');
  zone.innerHTML = `
    <div class="upload-icon" style="background:rgba(79,142,247,0.2)">
      <svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:var(--accent2);fill:none;stroke-width:1.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    <div class="upload-title">demo_pronunciation.wav</div>
    <div class="upload-sub">3.2 MB · Running demo analysis</div>`;
  setTimeout(runProcessing, 600);
}

function runProcessing() {
  const ov = document.getElementById('processingOverlay');
  ov.classList.add('visible');
  const ids    = ['ps1','ps2','ps3','ps4','ps5','ps6'];
  const delays = [0, 750, 1500, 2250, 3000, 3750];
  ids.forEach((id, i) => {
    setTimeout(() => {
      document.getElementById(id).classList.add('visible','active');
      if (i > 0) {
        document.getElementById(ids[i-1]).classList.remove('active');
        document.getElementById(ids[i-1]).classList.add('done');
      }
    }, delays[i]);
  });
  setTimeout(() => {
    document.getElementById(ids[ids.length-1]).classList.remove('active');
    document.getElementById(ids[ids.length-1]).classList.add('done');
    setTimeout(() => { ov.classList.remove('visible'); showResults(); }, 500);
  }, 4600);
}

function showResults() {
  /* — Dynamic score (60-95) + CEFR — */
  const dynamicScore = Math.floor(Math.random() * 36) + 60;
  const cefr         = scoreToLevel(dynamicScore);

  // Update ring score text
  const ringText = document.getElementById('ringScoreText');
  if (ringText) ringText.textContent = dynamicScore;

  // Update CEFR badge
  const cefrEl = document.getElementById('cefrBadge');
  if (cefrEl) {
    cefrEl.textContent   = cefr.level + ' — ' + cefr.label;
    cefrEl.style.background   = cefr.color + '22';
    cefrEl.style.color        = cefr.color;
    cefrEl.style.borderColor  = cefr.color + '55';
  }

  // Target sentence
  const tse = document.getElementById('targetSentenceText');
  if (tse && sttRecognized) tse.textContent = sttRecognized;

  // Build syllables from STT or fallback
  currentSyllables = sttRecognized ? buildSyllablesFromSTT(sttRecognized) : SYLLABLES;

  /* — Pitch contour section — */
  setFlowStep(3);
  const pitchData = sttRecognized ? buildPitchDataFromSyllables(currentSyllables) : SENTENCE_PITCH;
  buildContourCards(pitchData);
  const cs = document.getElementById('contourSection');
  cs.classList.add('visible');
  cs.scrollIntoView({behavior:'smooth', block:'start'});

  /* — Score breakdown section — */
  setTimeout(() => {
    setFlowStep(4);
    document.getElementById('scoreBreakdownSection').classList.add('visible');
    setTimeout(() => animateScoreRing(dynamicScore), 200);

    // Randomised sub-scores (plausible range)
    const sfPct  = Math.floor(Math.random() * 20) + 72;
    const iniPct = Math.floor(Math.random() * 20) + 58;
    const cfPct  = Math.floor(Math.random() * 22) + 60;
    const tPct   = Math.floor(Math.random() * 24) + 48;
    setTimeout(() => {
      [['bar-sf', sfPct+'%'],['bar-ini', iniPct+'%'],['bar-cf', cfPct+'%'],['bar-t', tPct+'%']].forEach(([id,w]) => {
        const el = document.getElementById(id);
        if (el) { el.style.width = '0'; setTimeout(() => { el.style.width = w; }, 100); }
      });
    }, 300);
  }, 800);

  /* — Results / Breakdown section — */
  setTimeout(() => {
    setFlowStep(5);
    buildErrorSummary(currentSyllables);
    buildUtterance(currentSyllables);
    document.getElementById('resultsSection').classList.add('visible');
    document.querySelectorAll('.tone-bar-fill').forEach(b => {
      const w = b.dataset.w; b.style.width = '0';
      setTimeout(() => { b.style.width = w; }, 350);
    });
  }, 1800);

  /* — Video intervention — */
  setTimeout(() => {
    const vs = document.getElementById('videoSection');
    if (vs) vs.classList.add('visible');

    const toneErr    = currentSyllables.find(s => s.type === 'tone-error');
    const initialErr = currentSyllables.find(s => s.type === 'initial-error');
    const vowelErr   = currentSyllables.find(s => s.type === 'vowel-error');

    if (toneErr) {
      updateVideoIntervention('tone', 3);
    } else if (initialErr) {
      const ini = extractInitial(initialErr.pinyin) || 'x';
      updateVideoIntervention('initial', ini);
    } else if (vowelErr) {
      updateVideoIntervention('simpleFinal', 'ü');
    } else {
      // Perfect pronunciation — show encouraging tone overview
      const iframe  = document.getElementById('ytPlayer');
      const caption = document.getElementById('videoCaption');
      const ph      = document.getElementById('ytPlaceholder');
      if (iframe)  iframe.src = `https://www.youtube.com/embed/n_Cj3aOSI1w?start=0&autoplay=0`;
      if (caption) caption.textContent = 'Outstanding! Review all tones to maintain your excellent level.';
      if (ph)      ph.style.display = 'none';
    }
  }, 2600);
}

/* ═══════════════════════════════════════════
   SCORE RING ANIMATION
═══════════════════════════════════════════ */
function animateScoreRing(score) {
  const ring         = document.getElementById('ringFill');
  const circumference = 251.2;
  ring.style.strokeDashoffset = circumference - (score / 100) * circumference;
}

/* ═══════════════════════════════════════════
   GENERATE PITCH DATA FROM SYLLABLES
═══════════════════════════════════════════ */
function buildPitchDataFromSyllables(syllables) {
  const NATIVE_CURVES = {
    0: [.44,.43,.43,.42,.42,.42,.41,.41],
    1: [.82,.82,.82,.82,.82,.82,.82,.82],
    2: [.28,.38,.50,.62,.72,.82,.88,.93],
    3: [.55,.38,.18,.10,.08,.25,.52,.72],
    4: [.92,.82,.68,.52,.40,.28,.18,.10],
  };
  function toneFromPinyin(p) {
    if (/[āōēīūǖ]/.test(p)) return 1;
    if (/[áóéíúǘ]/.test(p)) return 2;
    if (/[ǎǒěǐǔǚ]/.test(p)) return 3;
    if (/[àòèìùǜ]/.test(p)) return 4;
    return 0;
  }
  function clamp(v) { return Math.min(1, Math.max(0.05, v)); }
  function buildUserCurve(native, type) {
    if (type === 'tone-error')
      return native.map(v => clamp(v * 0.35 + 0.42 + (Math.random() - 0.5) * 0.06));
    if (type === 'initial-error' || type === 'vowel-error')
      return native.map(v => clamp(v + (Math.random() - 0.5) * 0.10));
    return native.map(v => clamp(v + (Math.random() - 0.5) * 0.04));
  }
  return syllables.map(s => {
    const tone   = toneFromPinyin(s.pinyin);
    const native = (NATIVE_CURVES[tone] || NATIVE_CURVES[0]).slice();
    const user   = buildUserCurve(native, s.type);
    const error  = s.type !== 'correct' ? s.type : undefined;
    return { char: s.char, pinyin: s.pinyin, tone, native, user, error };
  });
}

/* ═══ FULL-SENTENCE PITCH CONTOUR CANVAS ═══ */
function buildContourCards(pitchData) {
  var data = pitchData || SENTENCE_PITCH;
  var grid = document.getElementById('contourGrid');
  if (!grid) return;
  var W=900, H=160;
  var PT=20, PB=36, PL=32, PR=16;
  var iW=W-PL-PR, iH=H-PT-PB;
  var N=data.length;
  var STEP=iW/N;

  function px(i, si) { return (PL + (i + si/7) * STEP).toFixed(2); }
  function py(v)     { return (PT + iH - v * iH).toFixed(2); }

  function buildPts(key) {
    return data.map(function(d,i) {
      return [0,3,7].map(function(si){ return px(i,si)+','+py(d[key][si]); }).join(' ');
    }).join(' ');
  }

  var zones = data.map(function(d,i) {
    if (!d.error) return '';
    var x0   = (PL + i*STEP).toFixed(2);
    var sw   = STEP.toFixed(2);
    var fill = d.error==='initial-error'  ? 'rgba(245,158,11,0.12)'  :
               d.error==='compound-error' ? 'rgba(59,130,246,0.12)'  : 'rgba(239,68,68,0.12)';
    var bdr  = d.error==='initial-error'  ? '#f59e0b' :
               d.error==='compound-error' ? '#3b82f6' : '#ef4444';
    return '<rect x="'+x0+'" y="'+PT+'" width="'+sw+'" height="'+iH+'" fill="'+fill+'" stroke="'+bdr+'" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="0.4"/>';
  }).join('');

  var gridLines = [5,4,3,2,1].map(function(lbl,i) {
    var y = (PT + (iH/4)*i).toFixed(2);
    return '<line x1="'+PL+'" y1="'+y+'" x2="'+(W-PR)+'" y2="'+y+'" stroke="rgba(30,41,59,0.07)" stroke-width="1"/>'+
           '<text x="'+(PL-5)+'" y="'+(parseFloat(y)+3.5).toFixed(1)+'" text-anchor="end" font-size="9" font-family="Inter,sans-serif" fill="rgba(30,41,59,0.30)">'+lbl+'</text>';
  }).join('');

  var colLabels = data.map(function(d,i) {
    var cx   = (PL + i*STEP + STEP/2).toFixed(2);
    var sepX = (PL + i*STEP).toFixed(2);
    var yB   = PT+iH;
    var charColor = d.error ? (
      d.error==='initial-error'  ? '#f59e0b' :
      d.error==='compound-error' ? '#3b82f6' : '#ef4444'
    ) : 'rgba(30,41,59,0.6)';
    return '<line x1="'+sepX+'" y1="'+PT+'" x2="'+sepX+'" y2="'+yB+'" stroke="rgba(30,41,59,0.06)" stroke-width="1" stroke-dasharray="2 4"/>'+
           '<text x="'+cx+'" y="'+(yB+16)+'" text-anchor="middle" font-size="14" font-family=\'Noto Serif SC\',serif" fill="'+charColor+'">'+d.char+'</text>'+
           '<text x="'+cx+'" y="'+(yB+26)+'" text-anchor="middle" font-size="8" font-family="Inter,sans-serif" fill="rgba(30,41,59,0.35)">'+d.tone+'</text>';
  }).join('');

  function midPt(arr) { return (arr[3]+arr[4])/2; }
  var errLines = data.map(function(d,i) {
    if (!d.error) return '';
    var cx  = (PL + (i+0.5)*STEP).toFixed(2);
    var ny  = (PT + iH - midPt(d.native)*iH).toFixed(2);
    var uy  = (PT + iH - midPt(d.user)*iH).toFixed(2);
    var top = (Math.min(parseFloat(ny), parseFloat(uy)) - 4).toFixed(1);
    return '<line x1="'+cx+'" y1="'+ny+'" x2="'+cx+'" y2="'+uy+'" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="3 3"/>'+
           '<text x="'+cx+'" y="'+top+'" text-anchor="middle" font-size="9" font-weight="bold" font-family="Inter,sans-serif" fill="#ef4444">!</text>';
  }).join('');

  var nPts    = buildPts('native');
  var uPts    = buildPts('user');
  var fillPts = nPts + ' ' + (W-PR).toFixed(2)+','+(PT+iH) + ' ' + PL+','+(PT+iH);

  var svg = '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:160px;display:block;overflow:visible">'+
    '<g>'+zones+'</g>'+
    '<g>'+gridLines+'</g>'+
    '<g>'+colLabels+'</g>'+
    '<polygon points="'+fillPts+'" fill="rgba(34,197,94,0.08)" stroke="none"/>'+
    '<polyline points="'+nPts+'" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'+
    '<polyline points="'+uPts+'" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" stroke-linejoin="round" stroke-linecap="round"/>'+
    '<g>'+errLines+'</g>'+
    '</svg>';

  grid.innerHTML =
    '<div class="contour-card" style="grid-column:1/-1">'+
      '<div class="contour-header">'+
        '<div style="font-family:\'Noto Serif SC\',serif;font-size:20px;font-weight:700;color:var(--text);letter-spacing:3px">'+
          data.map(function(d) { return d.char; }).join('')+
        '</div>'+
        '<div class="contour-meta">'+
          '<div class="contour-pinyin">Full Sentence — F0 Pitch Contour</div>'+
        '</div>'+
      '</div>'+
      '<div class="contour-canvas-wrap" style="padding:20px 24px 8px">'+svg+'</div>'+
      '<div class="contour-legend" style="padding:0 24px 18px;gap:24px">'+
        '<div class="legend-item"><div class="legend-line" style="background:#22c55e;height:2.5px;width:24px;border-radius:2px"></div><span style="font-size:11px;color:var(--text2)">Native target</span></div>'+
        '<div class="legend-item"><div class="legend-line" style="background:none;border-top:2px dashed #ef4444;height:0;width:24px"></div><span style="font-size:11px;color:var(--text2)">Your recording</span></div>'+
        '<div class="legend-item" style="margin-left:auto;font-size:11px;color:var(--text3)">'+
          '<span style="display:inline-block;width:10px;height:10px;background:rgba(245,158,11,0.25);border:1px solid #f59e0b;border-radius:2px;margin-right:4px"></span>Initial error &nbsp;'+
          '<span style="display:inline-block;width:10px;height:10px;background:rgba(59,130,246,0.20);border:1px solid #3b82f6;border-radius:2px;margin-right:4px"></span>Compound error &nbsp;'+
          '<span style="display:inline-block;width:10px;height:10px;background:rgba(239,68,68,0.20);border:1px solid #ef4444;border-radius:2px;margin-right:4px"></span>Tone error'+
        '</div>'+
      '</div>'+
    '</div>';
}

/* ═══════════════════════════════════════════
   UTTERANCE DISPLAY (with coloured Pinyin)
═══════════════════════════════════════════ */
function buildUtterance(syllables) {
  syllables = syllables || currentSyllables;
  const container = document.getElementById('utteranceDisplay');
  container.innerHTML = '';

  syllables.forEach((s, idx) => {
    const el = document.createElement('div');
    el.className = `syllable-unit ${s.type}`;

    // Coloured pinyin — structural highlighting
    const coloredPinyin = renderPinyinColored(s.pinyin);

    el.innerHTML = `
      <div class="syl-char">${s.char}</div>
      <div class="syl-pinyin">${coloredPinyin}</div>
      <div class="syl-tooltip">${s.tooltip}</div>`;

    // Click: open anatomy guide + load targeted video (NO autoplay)
    if (s.videoSrc) {
      el.style.cursor = 'pointer';
      el.onclick = () => {
        // Load video without autoplay
        const iframe  = document.getElementById('ytPlayer');
        const caption = document.getElementById('videoCaption');
        const ph      = document.getElementById('ytPlaceholder');
        if (iframe)  { iframe.src = s.videoSrc; iframe.style.opacity = '1'; }
        if (ph)      ph.style.display = 'none';
        if (caption) caption.textContent = s.videoLabel || 'Targeted tutorial loaded.';
        // Open anatomy guide + update inline card
        if (s.anatomyKey && ANATOMY[s.anatomyKey]) { openAnatomy(s.anatomyKey); updateAicCard(s.anatomyKey); }
        // Show video section and scroll
        const vs = document.getElementById('videoSection');
        if (vs) { vs.classList.add('visible'); setTimeout(()=>vs.scrollIntoView({behavior:'smooth'}), 50); }
      };
    }

    el.style.cssText = 'opacity:0;transform:translateY(10px);transition:opacity .35s ease,transform .35s ease;';
    container.appendChild(el);
    setTimeout(() => { el.style.opacity='1'; el.style.transform='translateY(0)'; }, idx * 70);
  });
}

/* ═══ ANATOMY MODAL ═══ */
function openAnatomy(key){
  if (!ANATOMY[key]) return;
  currentAnat=ANATOMY[key]; anatStep=0;
  document.getElementById('modalTag').textContent=currentAnat.tag;
  document.getElementById('modalTitle').textContent=currentAnat.title;
  document.getElementById('modalSub').textContent=currentAnat.sub;
  document.getElementById('modalVideoTitle').textContent=currentAnat.videoTitle;
  // Wire up modal video link
  const mvl = document.querySelector('.modal-video-link');
  if (mvl && currentAnat.videoSrc) {
    mvl.onclick = (e) => {
      e.preventDefault();
      const iframe  = document.getElementById('ytPlayer');
      const caption = document.getElementById('videoCaption');
      const ph      = document.getElementById('ytPlaceholder');
      const vs      = document.getElementById('videoSection');
      if (iframe)  { iframe.src = currentAnat.videoSrc; iframe.style.opacity='1'; }
      if (ph)      ph.style.display = 'none';
      if (caption) caption.textContent = currentAnat.videoTitle;
      if (vs)      vs.classList.add('visible');
      closeAnatomy();
      setTimeout(()=>vs.scrollIntoView({behavior:'smooth'}), 100);
    };
  }
  renderAnatSteps();
  document.getElementById('anatomyModal').classList.add('visible');
  document.body.style.overflow='hidden';
}
function closeAnatomy(){
  document.getElementById('anatomyModal').classList.remove('visible');
  document.body.style.overflow='';
  document.getElementById('airFlow').setAttribute('opacity','0');
  document.getElementById('highlightCircle').setAttribute('opacity','0');
}
function renderAnatSteps(){
  const container=document.getElementById('anatomySteps');
  container.innerHTML='';
  currentAnat.steps.forEach((s,i)=>{
    const el=document.createElement('div');
    el.className=`anat-step ${i===anatStep?'active':''}`;
    el.innerHTML=`<div class="anat-num">${i+1}</div><div class="anat-text"><div class="anat-title">${s.title}</div>${s.text}</div>`;
    el.onclick=()=>{anatStep=i;renderAnatSteps();};
    container.appendChild(el);
  });
  document.getElementById('stepIndicator').textContent=`${anatStep+1} / ${currentAnat.steps.length}`;
  document.getElementById('highlightCircle').setAttribute('opacity','0.8');
  if(currentAnat.svg) currentAnat.svg(anatStep);
}
function nextAnatStep(){if(!currentAnat) return; anatStep=Math.min(anatStep+1,currentAnat.steps.length-1); renderAnatSteps();}
function prevAnatStep(){if(!currentAnat) return; anatStep=Math.max(anatStep-1,0); renderAnatSteps();}
function loadTargetedVideo(src, label) {
  const iframe  = document.getElementById('ytPlayer');
  const ph      = document.getElementById('ytPlaceholder');
  const caption = document.getElementById('videoCaption');
  const vs      = document.getElementById('videoSection');
  if (iframe)  { iframe.src = src; iframe.style.opacity = '1'; }
  if (ph)      ph.style.display = 'none';
  if (caption) caption.textContent = label;
  if (vs)      { vs.classList.add('visible'); setTimeout(()=>vs.scrollIntoView({behavior:'smooth'}), 50); }
}
/* Cards: video + anatomy key mapping */
var CARD_MAP = [
  {fb:'fbNeng', ab:'abNeng', vb:'btnNeng', akey:'tone2', src:'https://www.youtube.com/embed/n_Cj3aOSI1w?start=433', label:'2nd Tone Rising — neng (n\u00e9ng)'},
  {fb:'fbXing', ab:'abXing', vb:'btnXing', akey:'xsh',   src:'https://www.youtube.com/embed/05BMKdxHjp8?start=33',  label:'Initial x Position — xing (x\u012bng)'},
  {fb:'fbXiao', ab:'abXiao', vb:'btnXiao', akey:'iao',   src:'https://www.youtube.com/embed/IwXyiWNv1Ts?start=260', label:'-iao Compound Final — xiao (xi\u00e0o)'},
];
function initIvpCards() {
  CARD_MAP.forEach(function(c) {
    var fb = document.getElementById(c.fb);
    var ab = document.getElementById(c.ab);
    var vb = document.getElementById(c.vb);
    if (fb) fb.addEventListener('click', function() { updateAicCard(c.akey); });
    if (ab) ab.addEventListener('click', function(e) { e.stopPropagation(); openAnatomy(c.akey); updateAicCard(c.akey); });
    if (vb) vb.addEventListener('click', function(e) { e.stopPropagation(); loadTargetedVideo(c.src, c.label); });
  });
}
function updateAicCard(key) {
  var anat = ANATOMY[key];
  if (!anat) return;
  var tag   = document.getElementById('aicTag');
  var title = document.getElementById('aicTitle');
  var desc  = document.getElementById('aicDesc');
  var hl    = document.getElementById('aicHighlight');
  var af    = document.getElementById('aicAirFlow');
  if (tag)   tag.textContent   = anat.tag;
  if (title) title.textContent = anat.title;
  if (desc && anat.steps.length) {
    var s0 = anat.steps[0];
    desc.innerHTML = '<div class="aic-step-num">Step 1 of ' + anat.steps.length + '</div>'
      + '<div class="aic-step-title">' + s0.title + '</div>'
      + '<div class="aic-step-text">' + s0.text.substring(0, 130) + (s0.text.length > 130 ? '\u2026' : '') + '</div>';
  }
  if (hl) {
    hl.setAttribute('opacity', '0.8');
    var cx = 80, cy = 118;
    if (key === 'xsh')  { cx = 48; cy = 118; if (af) af.setAttribute('opacity','1'); }
    else if (key === 'iao') { cx = 80; cy = 148; }
    else if (key === 'tone2' || key === 'tone3') { cx = 80; cy = 64; }
    hl.setAttribute('cx', cx);
    hl.setAttribute('cy', cy);
  }
  if (af && key !== 'xsh') af.setAttribute('opacity', '0');
}

/* ═══════════════════════════════════════════
   INIT — runs after DOM is ready
═══════════════════════════════════════════ */
function init() {
document.getElementById('anatomyModal').addEventListener('click',e=>{if(e.target===document.getElementById('anatomyModal')) closeAnatomy();});
initIvpCards();

/* ═══════════════════════════════════════════
   DRAG & DROP on upload zone
═══════════════════════════════════════════ */
const uZone = document.getElementById('uploadZone');
if (uZone) {
  uZone.addEventListener('dragover', e => { e.preventDefault(); uZone.style.borderColor = 'var(--accent)'; });
  uZone.addEventListener('dragleave', () => { uZone.style.borderColor = ''; });
  uZone.addEventListener('drop', e => {                                                                                                                                   
    e.preventDefault();
    uZone.style.borderColor = '';
    const dt = e.dataTransfer;
    if (dt.files[0]) handleUpload({ files: dt.files });
  });
}
}
window.addEventListener('DOMContentLoaded', init);
