//Get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

//Build our functions

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    /*if(video.paused) {
        video.play();
    } else {
        video.pause();
    }*/
}

function updateButton() {
    console.log('updatebutton')
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset)
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.value);
    console.log(this.name)
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e)
}

function toggleFullscreen(e) {
    console.log('toggle')
    if (video.requestFullscreen) {
        video.requestFullscreen();  
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

//Hook up the event listeners

video.addEventListener('click', togglePlay, false);
video.addEventListener('play', updateButton, false);
video.addEventListener('pause', updateButton, false);
video.addEventListener('timeupdate', handleProgress, false);

toggle.addEventListener('click', togglePlay, false);
skipButtons.forEach(button => button.addEventListener('click', skip, false));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate, false));
fullScreen.addEventListener('click', toggleFullscreen, false);

let mousedown = false;
progress.addEventListener('click', scrub, false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
