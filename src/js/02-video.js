import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
import debounce from 'lodash.debounce';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const KEY_STORAGE = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));
player.on('ended', debounce(reset, 1300));

updataTime();
reset();

function onPlay(data) {
  const currentTime = data.seconds;

  localStorage.setItem(KEY_STORAGE, currentTime);
}

function updataTime() {
  const saveStorage = localStorage.getItem(KEY_STORAGE);

  if (saveStorage) {
    player.setCurrentTime(saveStorage);
  }
}

function reset(ended) {
  if (ended) {
    localStorage.setItem(KEY_STORAGE, 0);
  }
}
