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

//Play-pause functionality
function playAudio() {
  audio.play();
  playPauseImg.src = "media/icons8-pause-64.png";
  //  document.querySelector(".sidebar-playing .li-before").innerHTML = sidebarPauseIconRed;
}

function pauseAudio() {
  audio.pause();
  playPauseImg.src = "media/icons8-play-64.png";
  //  document.querySelector(".sidebar-playing .li-before").innerHTML = sidebarPlayIconRed;
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
    document.querySelector(
      "#sidebar-content" + trackClicked + " .li-before"
    ).innerHTML = sidebarPauseIconRed;
    updatePlayingInfo();
    playAudio();
  } else if (audio.paused) {
    document.querySelector(
      "#sidebar-content" + trackClicked + " .li-before"
    ).innerHTML = sidebarPauseIconRed;
    playAudio();
  } else {
    document.querySelector(
      "#sidebar-content" + trackClicked + " .li-before"
    ).innerHTML = sidebarPlayIconRed;
    pauseAudio();
  }
}

// Make sure the sidebar is displaying which track is selected
function checkPlaying() {
  document
    .querySelector(".sidebar-playing")
    .classList.remove("sidebar-playing");
  document
    .getElementById("sidebar-content" + currentTrack)
    .classList.add("sidebar-playing");
}

function showSidebarIcon(trackHovered) {
  const trackHoveredLi = document.querySelector(
    "#sidebar-content" + trackHovered
  );
  const trackHoveredContent = document.querySelector(
    "#sidebar-content" + trackHovered + " .li-before"
  );
  if (trackHoveredLi.classList.contains("sidebar-playing")) {
    if (audio.paused === true) {
      trackHoveredContent.innerHTML = sidebarPlayIconRed;
    } else {
      trackHoveredContent.innerHTML = sidebarPauseIconRed;
    }
  } else {
    trackHoveredContent.innerHTML = sidebarPlayIconWhite;
  }
}

function hideSidebarIcon(trackHovered) {
  document.querySelector(
    "#sidebar-content" + trackHovered + " .li-before"
  ).textContent = trackHovered + 1;
}

//Set audio source & name
function setAudioSrcName() {
  const track = tracks[currentTrack];
  audio.src = track.src;
  document.querySelector("#track-name").textContent = track.name;
  document.querySelector("#remaining-duration").textContent =
    "-" + track.duration;
}

//Next-previous track controls & autoplay
function skipPrevious() {
  if (shuffle === true) {
    let queuePosition = queue.indexOf(currentTrack);
    console.log(queuePosition);
    if (queuePosition === 0) {
      currentTrack = queue[3];
    } else {
      currentTrack = queue[queuePosition - 1];
    }
    updatePlayingInfo();
    playAudio();
  } else {
    if (currentTrack === 0) {
      currentTrack = 3;
    } else {
      currentTrack--;
    }
    updatePlayingInfo();
    playAudio();
  }
}

function skipNext() {
  checkAuto = false;
  nextTrack();
}

function nextTrack() {
  if (shuffle === true) {
    let queuePosition = queue.indexOf(currentTrack);
    console.log(queuePosition);
    if (queuePosition === 3) {
      currentTrack = queue[0];
    } else {
      currentTrack = queue[queuePosition + 1];
    }
    updatePlayingInfo();
    //check if loop is on
    if (loop === false && checkAuto === true && queuePosition === 3) {
      pauseAudio();
      resetProgressBar();
    } else {
      playAudio();
    }
  } else {
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
  document.getElementById("current-duration").textContent = formatTime(
    audio.currentTime
  );
}

function updateRemainingDuration() {
  if (isNaN(audio.duration)) {
    document.getElementById("remaining-duration").textContent = "--:--";
  } else {
    let remainingTime = audio.duration - audio.currentTime;
    document.getElementById("remaining-duration").textContent =
      "-" + formatTime(remainingTime);
  }
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

//Icons under duration bar

function rewind() {
  audio.currentTime = audio.currentTime - 10;
}

function fastForward() {
  audio.currentTime = audio.currentTime + 10;
}

function toggleShuffle() {
  if (shuffle === false) {
    shuffle = true;
    shuffleQueue(queue);
    document.querySelector("#shuffle").style.stroke = "var(--colourful-accent)";
  } else {
    shuffle = false;
    document.querySelector("#shuffle").style.stroke = "white";
  }
}

function shuffleQueue(array) {
  //my attempt at making my own rng logic
  let order = [false, false, false, false];
  order[currentTrack] = true;
  queue[0] = currentTrack;
  for (let i = 0; i < array.length - 1; i++) {
    let randNum = Math.floor(Math.random() * array.length);
    while (order[randNum] == true) {
      randNum = Math.floor(Math.random() * array.length);
    }
    order[randNum] = true; //toggle this random number = used
    queue[i + 1] = randNum; //filling the next spot with the random number
  }
  console.log(queue);
}

function toggleLoop() {
  if (loop === true) {
    loop = false;
    document.querySelector("#loop").style.stroke = "white";
  } else {
    loop = true;
    document.querySelector("#loop").style.stroke = "var(--colourful-accent)";
  }
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

const sidebarPauseIconRed =
  "<svg class='sidebar-playpause' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='rgb(255, 110, 122)' stroke='#rgb(255, 110, 122)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='6' y='4' width='4' height='16'></rect><rect x='14' y='4' width='4' height='16'></rect></svg>";
const sidebarPlayIconRed =
  "<svg class='sidebar-playpause' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='rgb(255, 110, 122)' stroke='rgb(255, 110, 122)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='5 3 19 12 5 21 5 3'></polygon></svg>";
const sidebarPauseIconWhite =
  "<svg class='sidebar-playpause' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='6' y='4' width='4' height='16'></rect><rect x='14' y='4' width='4' height='16'></rect></svg>";
const sidebarPlayIconWhite =
  "<svg class='sidebar-playpause' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='white' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='5 3 19 12 5 21 5 3'></polygon></svg>";

let currentTrack = 0;
let shuffle = false;
let loop = false;
let checkAuto = true;
let currentHearted = false;
let queue = [0, 1, 2, 3];
let tracks = [
  {
    name: "Hes",
    src: "media/p-hase_Hes.mp3",
    hearted: false,
    duration: "1:51",
  },
  {
    name: "Dry Down (Ft. Ben Snaath)",
    src: "media/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
    hearted: false,
    duration: "1:50",
  },
  {
    name: "Leapt",
    src: "media/p-hase_Leapt.mp3",
    hearted: false,
    duration: "1:36",
  },
  {
    name: "Water Feature",
    src: "media/p-hase_Water-Feature.mp3",
    hearted: false,
    duration: "0:55",
  },
];
