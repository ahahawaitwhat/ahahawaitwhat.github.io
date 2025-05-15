const audio = document.querySelector("#current-audio");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
audio.removeAttribute("controls");
audio.addEventListener("ended", autoNextTrack);
audio.addEventListener("timeupdate", handleTimeUpdate);

//All time update functions
function handleTimeUpdate() {
  updateProgressBar();
  updateCurrentDuration();
  updateRemainingDuration();
}

//Play-plause functionality
document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    togglePlayPause();
  }
});

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "media/icons8-pause-64.png";
  } else {
    audio.pause();
    playPauseImg.src = "media/icons8-play-64.png";
  }
}

//Set audio source & name
function setAudioSrcName() {
  if (audiotrack === 1) {
    audio.src = "media/p-hase_Hes.mp3";
    document.getElementById("track-name").innerHTML = "Hes";
  } else if (audiotrack === 2) {
    audio.src = "media/p-hase_Dry-Down-feat-Ben-Snaath.mp3";
    document.getElementById("track-name").innerHTML =
      "Dry Down (Ft. Ben Snaath)";
  } else if (audiotrack === 3) {
    audio.src = "media/p-hase_Leapt.mp3";
    document.getElementById("track-name").innerHTML = "Leapt";
  } else if (audiotrack === 4) {
    audio.src = "media/p-hase_Water-Feature.mp3";
    document.getElementById("track-name").innerHTML = "Water Feature";
  }
}

//Next-previous track controls & autoplay
function skipPrevious() {
  if (audiotrack === 1) {
    audiotrack = 4;
  } else {
    audiotrack--;
  }
  setAudioSrcName();
  audio.play();
  playPauseImg.src = "media/icons8-pause-64.png";
}

function skipNext() {
  checkAuto = false;
  nextTrack();
}

function nextTrack() {
  if (audiotrack === 4) {
    audiotrack = 1;
  } else {
    audiotrack++;
  }
  setAudioSrcName();
  //check if loop is on
  if (loop === false && checkAuto === true && audiotrack === 1) {
    audio.pause();
    playPauseImg.src = "media/icons8-play-64.png";
    resetProgressBar();
  } else {
    audio.play();
    playPauseImg.src = "media/icons8-pause-64.png";
  }
}

function autoNextTrack() {
  if (audio.ended === true) {
    checkAuto = true;
    nextTrack();
  }
}

//Progress bar
function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

function resetProgressBar() {
  progressBar.style.width = "0%";
}

//Display current & remaining durations
function updateCurrentDuration() {
  document.getElementById("current-duration").innerHTML = formatTime(
    audio.currentTime
  );
}

function updateRemainingDuration() {
  let remainingTime = audio.duration - audio.currentTime;
  document.getElementById("remaining-duration").innerHTML =
    "-" + formatTime(remainingTime);
}

function formatTime(timeToFormat) {
  let integerTime = Math.floor(timeToFormat);
  if (integerTime < 10) {
    formattedTime = "0:0" + integerTime;
  } else if (integerTime < 60) {
    formattedTime = "0:" + integerTime;
  } else if (integerTime < 70) {
    let secondsOnly = integerTime - 60;
    formattedTime = "1:0" + secondsOnly;
  } else {
    let secondsOnly = integerTime - 60;
    formattedTime = "1:" + secondsOnly;
  }
  return formattedTime;
}

function heart() {}

var audiotrack = 1;
var loop = false;
var checkAuto = true;
console.log(audiotrack);
