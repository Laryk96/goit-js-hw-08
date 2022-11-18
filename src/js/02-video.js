import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const KEY_STORAGE = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

updataTime();

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
