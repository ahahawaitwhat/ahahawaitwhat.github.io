const audio = document.querySelector("#current-audio");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
const currentDuration = document.querySelector("#current-duration");
const remainingDuration = document.querySelector("#remaining-duration");
audio.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
audio.addEventListener("timeupdate", updateProgressBar);
audio.addEventListener("timeupdate", updateCurrentDuration);
function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "media/icons8-pause-64.png";
  } else {
    audio.pause();
    playPauseImg.src = "media/icons8-play-64.png";
  }
}
function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}
function updateCurrentDuration() {
  let integerTime = Math.floor(audio.currentTime);
  console.log(integerTime);
  if (integerTime < 10) {
    let formattedTime = "0:0" + integerTime;
    console.log(formattedTime);
    document.getElementById("current-duration").innerHTML = formattedTime;
  } else if (integerTime < 60) {
    let formattedTime = "0:" + integerTime;
    console.log(formattedTime);
    document.getElementById("current-duration").innerHTML = formattedTime;
  } else if (integerTime < 70) {
    let secondsOnly = integerTime - 60;
    console.log(secondsOnly);
    let formattedTime = "1:0" + secondsOnly;
    console.log(formattedTime);
    document.getElementById("current-duration").innerHTML = formattedTime;
  } else {
    let secondsOnly = integerTime - 60;
    console.log(secondsOnly);
    let formattedTime = "1:" + secondsOnly;
    console.log(formattedTime);
    document.getElementById("current-duration").innerHTML = formattedTime;
  }
}

let audiotrack = 1;

// Add other functionalities here
