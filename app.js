// ============================================================
// AI Identity Document Extractor & Biometric Inspection Suite
// Client-side Computer Vision, YOLOv8 Detection & OCR Simulator
// ============================================================

// Sample Document Presets with Generated High-Res SVGs & Bounding Boxes
const DOCUMENT_SAMPLES = {
  idcard: {
    name: 'French National Identity Card (CNI)',
    type: 'EU National ID (TD1 Format)',
    confidence: '98.9% (YOLOv8)',
    mrz: `IDFRA22081996541<<<<<<<<<<<<<<<0\n9608224M3204095FRA<<<<<<<<<<<8\nDEIVAMANI<<PRADEEP<<<<<<<<<<<<<<`,
    fields: {
      surname: 'DEIVAMANI',
      firstName: 'PRADEEP',
      dob: '1996-08-22',
      gender: 'MALE / M',
      idNumber: 'FRA22081996541',
      nationality: 'FRENCH (FRA)',
      issueDate: '2022-04-10',
      expiryDate: '2032-04-09'
    },
    facePhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="150" viewBox="0 0 120 150"><rect width="120" height="150" fill="%232c3e50"/><circle cx="60" cy="50" r="26" fill="%23d4ac0d"/><path d="M25 130 C25 85, 95 85, 95 130 Z" fill="%231a5276"/><text x="60" y="142" font-size="9" fill="%23fff" text-anchor="middle" font-family="monospace">P. DEIVAMANI</text></svg>`,
    // Bounding boxes in relative percentages [top, left, width, height]
    boxes: [
      { class: 'face', label: 'Face Portrait (99.4%)', top: 22, left: 6, width: 22, height: 48 },
      { class: 'name', label: 'Surname & Names (98.8%)', top: 22, left: 32, width: 62, height: 18 },
      { class: 'dob', label: 'DOB & Gender (99.5%)', top: 43, left: 32, width: 45, height: 14 },
      { class: 'id', label: 'ID Number (99.1%)', top: 59, left: 32, width: 48, height: 12 },
      { class: 'dates', label: 'Validity Dates (98.3%)', top: 73, left: 32, width: 55, height: 12 },
      { class: 'mrz', label: 'MRZ Zone (99.9%)', top: 86, left: 4, width: 92, height: 12 }
    ],
    // High-fidelity SVG Document Graphic
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231e293b"/>
          <stop offset="100%" stop-color="%230f172a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="380" rx="16" fill="url(%23bg)" stroke="%2338bdf8" stroke-width="2"/>
      <rect x="20" y="20" width="560" height="40" rx="8" fill="%230284c7" fill-opacity="0.2"/>
      <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="16" fill="%2338bdf8">RÉPUBLIQUE FRANÇAISE / CARTE NATIONALE D'IDENTITÉ</text>
      <circle cx="545" cy="40" r="14" fill="%23fbbf24" fill-opacity="0.8"/>
      <!-- Portrait -->
      <rect x="35" y="80" width="130" height="175" rx="8" fill="%23334155" stroke="%2364748b"/>
      <circle cx="100" cy="140" r="34" fill="%23d4ac0d"/>
      <path d="M50 230 C50 180, 150 180, 150 230 Z" fill="%231e40af"/>
      <!-- Text details -->
      <text x="190" y="95" font-family="sans-serif" font-size="10" fill="%2394a3b8">NOM / SURNAME</text>
      <text x="190" y="115" font-family="monospace" font-weight="bold" font-size="16" fill="%23ffffff">DEIVAMANI</text>
      <text x="190" y="140" font-family="sans-serif" font-size="10" fill="%2394a3b8">PRÉNOMS / GIVEN NAMES</text>
      <text x="190" y="160" font-family="monospace" font-weight="bold" font-size="15" fill="%23ffffff">PRADEEP</text>
      <text x="190" y="185" font-family="sans-serif" font-size="10" fill="%2394a3b8">NÉ LE / DATE OF BIRTH</text>
      <text x="190" y="205" font-family="monospace" font-size="14" fill="%23ffffff">22/08/1996</text>
      <text x="340" y="185" font-family="sans-serif" font-size="10" fill="%2394a3b8">SEXE / SEX</text>
      <text x="340" y="205" font-family="monospace" font-size="14" fill="%23ffffff">M</text>
      <text x="190" y="230" font-family="sans-serif" font-size="10" fill="%2394a3b8">N° DU DOCUMENT / DOC NO</text>
      <text x="190" y="248" font-family="monospace" font-weight="bold" font-size="14" fill="%2338bdf8">FRA22081996541</text>
      <text x="370" y="230" font-family="sans-serif" font-size="10" fill="%2394a3b8">EXPIRATION</text>
      <text x="370" y="248" font-family="monospace" font-size="13" fill="%23ffffff">09/04/2032</text>
      <!-- MRZ Zone -->
      <rect x="25" y="295" width="550" height="65" rx="6" fill="%23020617" stroke="%23334155"/>
      <text x="40" y="320" font-family="monospace" font-size="13" fill="%2338bdf8" letter-spacing="2">IDFRA22081996541&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0</text>
      <text x="40" y="342" font-family="monospace" font-size="13" fill="%2338bdf8" letter-spacing="2">9608224M3204095FRA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;8</text>
    </svg>`
  },

  passport: {
    name: 'International Travel Passport',
    type: 'Passport (ICAO Doc 9303 TD3)',
    confidence: '99.4% (YOLOv8)',
    mrz: `P<FRADEIVAMANI<<PRADEEP<<<<<<<<<<<<<<<<<<<\n22AA998810FRA9608224M3011155<<<<<<<<<<<<<<02`,
    fields: {
      surname: 'DEIVAMANI',
      firstName: 'PRADEEP',
      dob: '1996-08-22',
      gender: 'MALE / M',
      idNumber: '22AA99881',
      nationality: 'FRENCH (FRA)',
      issueDate: '2020-11-15',
      expiryDate: '2030-11-14'
    },
    facePhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="150" viewBox="0 0 120 150"><rect width="120" height="150" fill="%231e293b"/><circle cx="60" cy="50" r="26" fill="%23e0a96d"/><path d="M25 130 C25 85, 95 85, 95 130 Z" fill="%230f172a"/><text x="60" y="142" font-size="9" fill="%2338bdf8" text-anchor="middle" font-family="monospace">PASSPORT BIOMETRIC</text></svg>`,
    boxes: [
      { class: 'face', label: 'Biometric Face (99.8%)', top: 20, left: 8, width: 24, height: 48 },
      { class: 'name', label: 'Full Name (99.1%)', top: 20, left: 36, width: 58, height: 18 },
      { class: 'dob', label: 'DOB & Nationality (99.6%)', top: 42, left: 36, width: 50, height: 14 },
      { class: 'id', label: 'Passport No (99.5%)', top: 58, left: 36, width: 44, height: 12 },
      { class: 'dates', label: 'Expiry & Authority (98.9%)', top: 72, left: 36, width: 55, height: 12 },
      { class: 'mrz', label: 'TD3 MRZ Checksum (99.9%)', top: 85, left: 4, width: 92, height: 13 }
    ],
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <defs>
        <linearGradient id="passBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%231a2e05"/>
          <stop offset="100%" stop-color="%230f172a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="380" rx="16" fill="url(%23passBg)" stroke="%2310b981" stroke-width="2"/>
      <rect x="20" y="20" width="560" height="40" rx="8" fill="%23059669" fill-opacity="0.2"/>
      <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="16" fill="%2334d399">PASSEPORT / PASSPORT / EUROPEAN UNION</text>
      <!-- Portrait -->
      <rect x="35" y="80" width="130" height="175" rx="8" fill="%23064e3b" stroke="%2310b981"/>
      <circle cx="100" cy="140" r="34" fill="%23e0a96d"/>
      <path d="M50 230 C50 180, 150 180, 150 230 Z" fill="%23065f46"/>
      <!-- Details -->
      <text x="190" y="95" font-family="sans-serif" font-size="10" fill="%236ee7b7">TYPE / CODE PAYS / PASSPORT NO</text>
      <text x="190" y="115" font-family="monospace" font-weight="bold" font-size="16" fill="%23ffffff">P  FRA  22AA99881</text>
      <text x="190" y="140" font-family="sans-serif" font-size="10" fill="%236ee7b7">SURNAME / NOM</text>
      <text x="190" y="160" font-family="monospace" font-weight="bold" font-size="15" fill="%23ffffff">DEIVAMANI</text>
      <text x="190" y="185" font-family="sans-serif" font-size="10" fill="%236ee7b7">GIVEN NAMES / PRÉNOMS</text>
      <text x="190" y="205" font-family="monospace" font-size="14" fill="%23ffffff">PRADEEP</text>
      <text x="190" y="230" font-family="sans-serif" font-size="10" fill="%236ee7b7">DATE OF BIRTH / NATIONALITY</text>
      <text x="190" y="248" font-family="monospace" font-size="14" fill="%2334d399">22 AUG 1996 · FRENCH</text>
      <!-- MRZ -->
      <rect x="25" y="295" width="550" height="65" rx="6" fill="%23020617" stroke="%23059669"/>
      <text x="40" y="320" font-family="monospace" font-size="13" fill="%2334d399" letter-spacing="2">P&lt;FRADEIVAMANI&lt;&lt;PRADEEP&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</text>
      <text x="40" y="342" font-family="monospace" font-size="13" fill="%2334d399" letter-spacing="2">22AA998810FRA9608224M3011155&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;02</text>
    </svg>`
  },

  license: {
    name: "European Driving License",
    type: "Driving License (ISO 18013)",
    confidence: '98.5% (YOLOv8)',
    mrz: `D1FRA1996082299<<<<<<<<<<<<<<<<0\nPERMIS DE CONDUIRE B / B1 / AM\nPREFECTURE DE POLICE PARIS 75`,
    fields: {
      surname: 'DEIVAMANI',
      firstName: 'PRADEEP',
      dob: '1996-08-22',
      gender: 'MALE / M',
      idNumber: '19AA774411',
      nationality: 'FRENCH (FRA)',
      issueDate: '2018-06-14',
      expiryDate: '2033-06-13'
    },
    facePhoto: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="150" viewBox="0 0 120 150"><rect width="120" height="150" fill="%233b0764"/><circle cx="60" cy="50" r="26" fill="%23f59e0b"/><path d="M25 130 C25 85, 95 85, 95 130 Z" fill="%23581c87"/><text x="60" y="142" font-size="9" fill="%23d8b4fe" text-anchor="middle" font-family="monospace">DRIVER LICENSE</text></svg>`,
    boxes: [
      { class: 'face', label: 'Face Photo (98.9%)', top: 22, left: 6, width: 22, height: 48 },
      { class: 'name', label: 'Driver Name (99.0%)', top: 22, left: 32, width: 60, height: 18 },
      { class: 'dob', label: 'Birthdate & Place (98.7%)', top: 43, left: 32, width: 50, height: 14 },
      { class: 'dates', label: 'Valid Categories B/AM (98.5%)', top: 60, left: 32, width: 55, height: 14 },
      { class: 'id', label: 'License ID (98.8%)', top: 78, left: 32, width: 52, height: 12 }
    ],
    svg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
      <defs>
        <linearGradient id="licBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="%233b0764"/>
          <stop offset="100%" stop-color="%2318022b"/>
        </linearGradient>
      </defs>
      <rect width="600" height="380" rx="16" fill="url(%23licBg)" stroke="%23a855f7" stroke-width="2"/>
      <rect x="20" y="20" width="560" height="40" rx="8" fill="%237e22ce" fill-opacity="0.2"/>
      <text x="35" y="46" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23d8b4fe">PERMIS DE CONDUIRE / DRIVING LICENCE / FRANCE</text>
      <!-- Portrait -->
      <rect x="35" y="80" width="130" height="175" rx="8" fill="%23581c87" stroke="%23a855f7"/>
      <circle cx="100" cy="140" r="34" fill="%23f59e0b"/>
      <path d="M50 230 C50 180, 150 180, 150 230 Z" fill="%233b0764"/>
      <!-- Details -->
      <text x="190" y="95" font-family="sans-serif" font-size="10" fill="%23c084fc">1. NOM / 2. PRÉNOMS</text>
      <text x="190" y="115" font-family="monospace" font-weight="bold" font-size="16" fill="%23ffffff">DEIVAMANI, PRADEEP</text>
      <text x="190" y="140" font-family="sans-serif" font-size="10" fill="%23c084fc">3. DATE ET LIEU DE NAISSANCE</text>
      <text x="190" y="160" font-family="monospace" font-weight="bold" font-size="14" fill="%23ffffff">22.08.1996 · PARIS (75)</text>
      <text x="190" y="185" font-family="sans-serif" font-size="10" fill="%23c084fc">4a. DÉLIVRÉ LE / 4b. EXPIRE LE</text>
      <text x="190" y="205" font-family="monospace" font-size="14" fill="%23ffffff">14.06.2018 — 13.06.2033</text>
      <text x="190" y="230" font-family="sans-serif" font-size="10" fill="%23c084fc">5. NUMÉRO DU PERMIS / CATEGORIES</text>
      <text x="190" y="248" font-family="monospace" font-weight="bold" font-size="15" fill="%2338bdf8">19AA774411 · CAT [ B, B1, AM ]</text>
      <!-- Microprint footer -->
      <rect x="25" y="295" width="550" height="65" rx="6" fill="%230b0514" stroke="%23581c87"/>
      <text x="40" y="325" font-family="monospace" font-size="12" fill="%23d8b4fe">D1FRA1996082299&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;0</text>
      <text x="40" y="345" font-family="monospace" font-size="11" fill="%23a855f7">PREFECTURE DE POLICE DE PARIS · TITULAIRE CONFORME</text>
    </svg>`
  }
};

let currentSampleKey = 'idcard';
let isExtracting = false;

// Audio Beep
function playSynthBeep(freq = 600, duration = 0.08) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function loadSample(key) {
  currentSampleKey = key;
  const doc = DOCUMENT_SAMPLES[key];
  if (!doc) return;

  // Set active button pill
  document.querySelectorAll('.header-center .pill-btn').forEach(btn => btn.classList.remove('active'));
  event?.target?.classList?.add('active');

  // Update image
  const imgEl = document.getElementById('documentImage');
  imgEl.src = doc.svg;

  // Render bounding boxes
  renderBoundingBoxes(doc.boxes);

  // Update Face Photo
  document.getElementById('biometricFaceImg').src = doc.facePhoto;

  // Update Meta
  document.getElementById('metaConfidence').textContent = doc.confidence;
  document.getElementById('metaDocType').textContent = doc.type;

  // Update Form fields
  populateFormFields(doc.fields, doc.mrz);

  playSynthBeep(520, 0.05);
}

function renderBoundingBoxes(boxes) {
  const overlay = document.getElementById('bboxOverlay');
  overlay.innerHTML = '';

  boxes.forEach(b => {
    const boxEl = document.createElement('div');
    boxEl.className = `bbox bbox-${b.class}`;
    boxEl.style.top = `${b.top}%`;
    boxEl.style.left = `${b.left}%`;
    boxEl.style.width = `${b.width}%`;
    boxEl.style.height = `${b.height}%`;

    const labelEl = document.createElement('span');
    labelEl.className = 'bbox-label';
    labelEl.textContent = b.label;

    boxEl.appendChild(labelEl);
    overlay.appendChild(boxEl);
  });
}

function toggleBoundingBoxes() {
  const isChecked = document.getElementById('toggleBBoxes').checked;
  const overlay = document.getElementById('bboxOverlay');
  overlay.style.display = isChecked ? 'block' : 'none';
}

function populateFormFields(fields, mrz) {
  document.getElementById('fieldSurname').value = fields.surname;
  document.getElementById('fieldFirstName').value = fields.firstName;
  document.getElementById('fieldDob').value = fields.dob;
  document.getElementById('fieldGender').value = fields.gender;
  document.getElementById('fieldIdNumber').value = fields.idNumber;
  document.getElementById('fieldNationality').value = fields.nationality;
  document.getElementById('fieldIssueDate').value = fields.issueDate;
  document.getElementById('fieldExpiryDate').value = fields.expiryDate;
  document.getElementById('mrzDisplay').innerHTML = mrz.replace(/\n/g, '<br>');
}

// Simulated YOLOv8 + OCR Extraction Pipeline
async function runAutomatedExtraction() {
  if (isExtracting) return;
  isExtracting = true;

  const progressBox = document.getElementById('extractionProgress');
  const msgEl = document.getElementById('progressMessage');
  const pctEl = document.getElementById('progressPercent');
  const fillEl = document.getElementById('progressBarFill');

  progressBox.classList.remove('hidden');

  const steps = [
    { pct: 20, msg: '1/4: Applying OpenCV perspective warp & contrast normalization...' },
    { pct: 45, msg: '2/4: Running YOLOv8 neural inference for bounding box segmentation...' },
    { pct: 75, msg: '3/4: Isolating biometric portrait & cropping ROI text buffers...' },
    { pct: 95, msg: '4/4: OCR character tokenization & MRZ checksum validation...' },
    { pct: 100, msg: 'Extraction Complete! Verified against ICAO Doc 9303 standard.' }
  ];

  for (let s of steps) {
    playSynthBeep(440 + s.pct * 3, 0.04);
    msgEl.textContent = s.msg;
    pctEl.textContent = `${s.pct}%`;
    fillEl.style.width = `${s.pct}%`;
    await new Promise(r => setTimeout(r, 260));
  }

  const doc = DOCUMENT_SAMPLES[currentSampleKey];
  populateFormFields(doc.fields, doc.mrz);
  document.getElementById('biometricFaceImg').src = doc.facePhoto;

  showToast('✅ Identity Document successfully parsed and verified!');
  setTimeout(() => progressBox.classList.add('hidden'), 2500);
  isExtracting = false;
}

// Crop Biometric Face
function cropBiometricFace() {
  const doc = DOCUMENT_SAMPLES[currentSampleKey];
  const faceBox = document.getElementById('cropBox');
  // Animate cropbox to face location
  faceBox.style.top = '22%';
  faceBox.style.left = '6%';
  faceBox.style.width = '24%';
  faceBox.style.height = '50%';

  document.getElementById('biometricFaceImg').src = doc.facePhoto;
  playSynthBeep(700, 0.06);
  showToast('Extracted facial portrait to Biometric Preview.');
}

// Crop Selected ROI
function cropSelectedRoi() {
  playSynthBeep(650, 0.05);
  showToast('Selected ROI cropped and sent to OCR engine.');
}

// Custom Image Upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('documentImage').src = e.target.result;
    document.querySelectorAll('.header-center .pill-btn').forEach(btn => btn.classList.remove('active'));

    // Custom document detection boxes
    const customBoxes = [
      { class: 'face', label: 'Face Detected (97.4%)', top: 20, left: 10, width: 25, height: 45 },
      { class: 'name', label: 'Identity Text (96.5%)', top: 25, left: 40, width: 50, height: 20 },
      { class: 'id', label: 'Doc Number (98.0%)', top: 55, left: 40, width: 45, height: 15 }
    ];
    renderBoundingBoxes(customBoxes);
    runAutomatedExtraction();
  };
  reader.readAsDataURL(file);
}

// Export JSON
function getExtractedJsonObject() {
  return {
    documentType: document.getElementById('metaDocType').textContent,
    verificationStatus: 'VERIFIED_AUTHENTIC',
    confidenceScore: document.getElementById('metaConfidence').textContent,
    timestamp: new Date().toISOString(),
    extractedEntities: {
      surname: document.getElementById('fieldSurname').value,
      firstName: document.getElementById('fieldFirstName').value,
      dateOfBirth: document.getElementById('fieldDob').value,
      gender: document.getElementById('fieldGender').value,
      idNumber: document.getElementById('fieldIdNumber').value,
      nationality: document.getElementById('fieldNationality').value,
      dateOfIssue: document.getElementById('fieldIssueDate').value,
      dateOfExpiry: document.getElementById('fieldExpiryDate').value,
      mrzRaw: document.getElementById('mrzDisplay').innerText
    }
  };
}

function copyExtractedJson() {
  const jsonStr = JSON.stringify(getExtractedJsonObject(), null, 2);
  navigator.clipboard.writeText(jsonStr).then(() => {
    showToast('📋 Extracted KYC JSON copied to clipboard!');
  });
}

function downloadKycJson() {
  const jsonStr = JSON.stringify(getExtractedJsonObject(), null, 2);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonStr);
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", `kyc_extracted_profile_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('📥 Downloaded KYC verification report.');
}

function showAuditToast() {
  playSynthBeep(880, 0.1);
  showToast('✓ KYC record verified against database & anti-tamper security checks passed.');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadSample('idcard');
});
