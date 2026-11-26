const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

function setMenu(open) {
  mainNav.classList.toggle('header__nav--open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

menuToggle.addEventListener('click', () => {
  setMenu(!mainNav.classList.contains('header__nav--open'));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

mainNav.addEventListener('click', (event) => {
  if (event.target.classList.contains('header__nav-link')) setMenu(false);
});

const tracks = [
  { title: 'Luces de Neón', artist: 'Aurora Vega', duration: 204, cover: 1 },
  { title: 'Medianoche', artist: 'Los Faroles', duration: 178, cover: 2 },
  { title: 'Marea Violeta', artist: 'Lunaria', duration: 221, cover: 3 },
  { title: 'Ciudad Dormida', artist: 'Eco Sur', duration: 245, cover: 4 },
  { title: 'Cielo Magenta', artist: 'Aurora Vega', duration: 192, cover: 5 },
  { title: 'Última Estación', artist: 'Nube 9', duration: 230, cover: 6 }
];

const playerCover = document.getElementById('player-cover');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const progress = document.getElementById('progress');
const timeCurrent = document.getElementById('time-current');
const timeTotal = document.getElementById('time-total');

let current = 0;
let seconds = 0;
let playing = false;
let timer = null;

function formatTime(total) {
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, '0');
  return m + ':' + s;
}

function showProgress() {
  progress.value = seconds;
  timeCurrent.textContent = formatTime(seconds);
}

function loadTrack(index) {
  const track = tracks[index];
  current = index;
  seconds = 0;
  playerTitle.textContent = track.title;
  playerArtist.textContent = track.artist;
  playerCover.className = 'cover cover--' + track.cover + ' player__cover';
  progress.max = track.duration;
  timeTotal.textContent = formatTime(track.duration);
  showProgress();
  document.querySelectorAll('.song-list__btn').forEach((btn) => {
    btn.classList.toggle('song-list__btn--active', Number(btn.dataset.track) === index);
  });
}

function setPlaying(state) {
  playing = state;
  btnPlay.setAttribute('aria-pressed', String(state));
  btnPlay.setAttribute('aria-label', state ? 'Pausar' : 'Reproducir');
  clearInterval(timer);
  if (state) timer = setInterval(tick, 1000);
}

function tick() {
  seconds += 1;
  if (seconds >= tracks[current].duration) {
    changeTrack(current + 1);
    return;
  }
  showProgress();
}

function changeTrack(index) {
  const next = (index + tracks.length) % tracks.length;
  loadTrack(next);
  if (playing) setPlaying(true);
}

document.querySelectorAll('[data-track]').forEach((el) => {
  el.addEventListener('click', () => {
    loadTrack(Number(el.dataset.track));
    setPlaying(true);
  });
});

btnPlay.addEventListener('click', () => setPlaying(!playing));
btnPrev.addEventListener('click', () => changeTrack(current - 1));
btnNext.addEventListener('click', () => changeTrack(current + 1));

progress.addEventListener('input', () => {
  seconds = Number(progress.value);
  timeCurrent.textContent = formatTime(seconds);
});

loadTrack(0);
