const videoFile = document.querySelector("#video-file");
console.log(videoFile);

const playButton = document.querySelector("#play-button");
console.log(playButton);

function playVideo() {
  videoFile.play();
}

playButton.addEventListener("click", playVideo);

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

function pauseVideo() {
  videoFile.pause();
}

pauseButton.addEventListener("click", pauseVideo);
