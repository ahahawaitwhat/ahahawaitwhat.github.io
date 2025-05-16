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

//Grouping functions
function updatePlayingInfo() {
  setAudioSrcName();
  checkCurrentHearted();
  checkPlaying();
}

//Play-plause functionality
function playAudio() {
  audio.play();
  playPauseImg.src = "media/icons8-pause-64.png";
}

function pauseAudio() {
  audio.pause();
  playPauseImg.src = "media/icons8-play-64.png";
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
    togglePlayPause();
  }
});

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    playAudio();
  } else {
    pauseAudio();
  }
}

function toggleSpecificTrack(trackClicked) {
  if (currentTrack !== trackClicked) {
    currentTrack = trackClicked;
    updatePlayingInfo();
    playAudio();
  } else if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

//Set audio source & name
function setAudioSrcName() {
  const track = tracks[currentTrack];
  audio.src = track.src;
  document.getElementById("track-name").textContent = track.name;
}

//Next-previous track controls & autoplay
function skipPrevious() {
  if (currentTrack === 0) {
    currentTrack = 3;
  } else {
    currentTrack--;
  }
  updatePlayingInfo();
  playAudio();
}

function skipNext() {
  checkAuto = false;
  nextTrack();
}

function nextTrack() {
  if (currentTrack === 3) {
    currentTrack = 0;
  } else {
    currentTrack++;
  }
  updatePlayingInfo();
  //check if loop is on
  if (loop === false && checkAuto === true && currentTrack === 0) {
    pauseAudio();
    resetProgressBar();
  } else {
    playAudio();
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

//Heart system

function mainToggleHeart() {
  document.getElementById("heart-main").classList.toggle("hearted"); //visual
  tracks[currentTrack].hearted = !tracks[currentTrack].hearted; //hearted status
}

function toggleHeart(trackNumber, event) {
  if (event) event.stopPropagation();
  tracks[trackNumber].hearted = !tracks[trackNumber].hearted;
  document.getElementById("heart" + trackNumber).classList.toggle("hearted");
  checkCurrentHearted();
}

function checkCurrentHearted() {
  if (tracks[currentTrack].hearted == true) {
    document.getElementById("heart-main").classList.add("hearted");
  } else {
    document.getElementById("heart-main").classList.remove("hearted");
  }
}

function checkPlaying() {
  console.log(document.getElementById("sidebar-content" + currentTrack));
  Array.from(document.getElementsByClassName("sidebar-playing")).forEach(
    (el) => {
      el.classList.remove("sidebar-playing");
    }
  );
  document
    .getElementById("sidebar-content" + currentTrack)
    .classList.add("sidebar-playing");
}

function toggleMuted() {
  if (audio.muted === true) {
    audio.muted = false;
    document.querySelector("#volume").src = "media/volume-2.svg";
  } else {
    audio.muted = true;
    document.querySelector("#volume").src = "media/volume-x.svg";
  }
}

//Setting global variables

var currentTrack = 0;
var loop = false;
var checkAuto = true;
var currentHearted = false;
var tracks = [
  {
    name: "Hes",
    src: "media/p-hase_Hes.mp3",
    hearted: false,
  },
  {
    name: "Dry Down (Ft. Ben Snaath)",
    src: "media/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
    hearted: false,
  },
  {
    name: "Leapt",
    src: "media/p-hase_Leapt.mp3",
    hearted: false,
  },
  {
    name: "Water Feature",
    src: "media/p-hase_Water-Feature.mp3",
    hearted: false,
  },
];
