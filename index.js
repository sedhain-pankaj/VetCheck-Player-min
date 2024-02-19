//show or hide different search options
$(document).ready(function () {
  fetchData();
  video_scaler();
  autoShuffle();
});

//function to scale down video to fit within video_container and pointer events to auto
function video_scaler() {
  $("video").css("width", $("#video_container").width());
  $("video").css("height", $("#video_container").height());
  $("video").attr("width", $("video").width());
  $("video").attr("height", $("video").height());
}

//run the shuffle function if no songs are playing
function autoShuffle() {
  var timeout = false;
  function checkActivity() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if ($("video").attr("src") == "") {
        shuffleAjaxCall();
      }
    }, 1);
  }
  document.addEventListener("mousedown", checkActivity);
  document.addEventListener("mousemove", checkActivity);
  document.addEventListener("click", checkActivity);
  checkActivity();
}

//mejs player
function mejs_media_Player(func_restarter) {
  $("video").mediaelementplayer({
    iconSprite: "/mejs.svg",
    clickToPlayPause: true,
    features: ["playpause", "progress", "current", "duration", "fullscreen"],
    enableKeyboard: true,
    useFakeFullscreen: true,
    enableAutosize: true,

    success: function (mediaElement, DOMObject, player) {
      mediaElement.addEventListener("ended", function (e) {
        func_restarter();
      });
    },

    error: function (e) {
      console.log("media element error:" + e);
      $("#video_container").empty();
      //create a new media element in the video container
      $("#video_container").html(
        "<video id='video' src='' autoplay preload='auto'></video>"
      );
      video_scaler();
      func_restarter();
    },
  });
}
