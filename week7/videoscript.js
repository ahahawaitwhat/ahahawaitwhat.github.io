const videoFile = document.querySelector("#video-file");
console.log(videoFile);

const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playVideo);

function playVideo() {
  videoFile.play();
}

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseVideo);

function pauseVideo() {
  videoFile.pause();
}
