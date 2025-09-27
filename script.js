const state = { h: 0, m: 0, revealed: false, minuteStep: 1, is24h: false };

function randomInt(maxExclusive) {
  return Math.floor(Math.random() * maxExclusive);
}

function drawRandomTime() {
  state.h = randomInt(12); // 0..11
  // Oblicz możliwe wartości minut wg wybranego kroku
  const possibleMinutes = Math.floor(60 / state.minuteStep); // np. 12 dla kroku 5
  state.m = randomInt(possibleMinutes) * state.minuteStep;
  state.revealed = false;
  updateClockHands();
  hideDigital();
}

function updateClockHands() {
  const hourDeg = (state.h % 12) * 30 + state.m * 0.5; // 0.5 deg per minute
  const minuteDeg = state.m * 6; // 360 / 60
  document.getElementById(
    'hourHand'
  ).style.transform = `translate(-50%, -100%) rotate(${hourDeg}deg)`;
  document.getElementById(
    'minuteHand'
  ).style.transform = `translate(-50%, -100%) rotate(${minuteDeg}deg)`;
  if (state.revealed) updateDigital();
}

function updateDigital() {
  const displayHour = state.h === 0 ? 12 : state.h; // 0 -> 12 dla wyświetlania
  const hh = String(displayHour).padStart(2, '0');
  const mm = String(state.m).padStart(2, '0');
  const el = document.getElementById('digitalTime');
  el.textContent = `${hh}:${mm}`;
}

function revealDigital() {
  if (state.revealed) return; // nothing to do
  state.revealed = true;
  updateDigital();
  const el = document.getElementById('digitalTime');
  el.classList.remove('hidden');
  el.setAttribute('aria-hidden', 'false');
}

function hideDigital() {
  const el = document.getElementById('digitalTime');
  el.classList.add('hidden');
  el.setAttribute('aria-hidden', 'true');
  el.textContent = '';
}

function toggle24hMode() {
  state.is24h = !state.is24h;
  buildTicksAndNumbers();
  // Zaktualizuj przycisk
  const btn = document.getElementById('toggle24hBtn');
  btn.textContent = state.is24h ? '12h' : '24h';
}

function buildTicksAndNumbers() {
  const clock = document.querySelector('.clock');
  // Avoid duplicates if called again
  clock.querySelectorAll('.num, .tick').forEach((n) => n.remove());
  for (let i = 0; i < 12; i++) {
    const num = document.createElement('div');
    num.className = 'num';
    const hourNumber = i === 0 ? 12 : i; // 0 -> 12
    const angleRad = ((i * 30 - 90) * Math.PI) / 180; // co 30°; -90 aby start u góry
    const radiusPercent = 44; // lekko dalej skoro brak kresek
    const x = 50 + radiusPercent * Math.cos(angleRad);
    const y = 50 + radiusPercent * Math.sin(angleRad);
    num.style.left = x + '%';
    num.style.top = y + '%';
    num.style.transform = 'translate(-50%, -50%)';
    num.textContent = hourNumber;
    clock.appendChild(num);
  }

  // Dodaj wewnętrzne liczby dla trybu 24h
  if (state.is24h) {
    for (let i = 0; i < 12; i++) {
      const num = document.createElement('div');
      num.className = 'num inner';
      const hourNumber = i === 0 ? 24 : i + 12; // 0 -> 24, 1->13, ..., 11->23
      const angleRad = ((i * 30 - 90) * Math.PI) / 180; // co 30°; -90 aby start u góry
      const radiusPercent = 36; // przesunięty o dodatkowe ~5px na zewnątrz
      const x = 50 + radiusPercent * Math.cos(angleRad);
      const y = 50 + radiusPercent * Math.sin(angleRad);
      num.style.left = x + '%';
      num.style.top = y + '%';
      num.style.transform = 'translate(-50%, -50%)';
      num.textContent = hourNumber;
      clock.appendChild(num);
    }

    // Dodaj oznaczenia minut co 1 minutę po zewnętrznej stronie
    for (let i = 0; i < 60; i++) {
      const minuteNum = document.createElement('div');
      minuteNum.className = 'num minute';
      const minuteValue = i; // 0, 1, 2, ..., 59
      const angleRad = ((i * 6 - 90) * Math.PI) / 180; // co 6°; -90 aby start u góry
      const radiusPercent = 52; // jeszcze bardziej zewnętrzny promień dla minut
      const x = 50 + radiusPercent * Math.cos(angleRad);
      const y = 50 + radiusPercent * Math.sin(angleRad);
      minuteNum.style.left = x + '%';
      minuteNum.style.top = y + '%';
      minuteNum.style.transform = 'translate(-50%, -50%)';
      if (i % 5 === 0) {
        minuteNum.textContent = String(minuteValue).padStart(2, '0');
        minuteNum.classList.add('major');
      } else {
        minuteNum.textContent = '•';
        minuteNum.classList.add('minor');
      }
      clock.appendChild(minuteNum);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  buildTicksAndNumbers();
  document
    .getElementById('randomBtn')
    .addEventListener('click', drawRandomTime);
  document.getElementById('revealBtn').addEventListener('click', revealDigital);
  document.getElementById('toggle24hBtn').addEventListener('click', toggle24hMode);
  const select = document.getElementById('minuteStep');
  select.addEventListener('change', (e) => {
    state.minuteStep = parseInt(e.target.value, 10) || 1;
    drawRandomTime();
  });
  drawRandomTime();
});
