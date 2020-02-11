/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function toggleButton(){
    const method = video.paused ? 'play': 'pause';
    video[method]();
}

function updateButton(){
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.innerHTML = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgess(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%` 
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

/* Hook up the event listeners */
toggle.addEventListener('click', toggleButton)

video.addEventListener('click', toggleButton)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgess)

skipButtons.forEach(button=> button.addEventListener('click', skip))

ranges.forEach(button=> button.addEventListener('click', handleRangeUpdate))
ranges.forEach(button=> button.addEventListener('mousemove', handleRangeUpdate))

progress.addEventListener('click', scrub);
let mouseDown = false;
progress.addEventListener('mousemove', (e)=> mouseDown && scrub(e));
progress.addEventListener('mousedown', ()=> mouseDown = true);
progress.addEventListener('mouseup', ()=> mouseDown = false);