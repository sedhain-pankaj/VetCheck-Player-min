//variables to cache the song categories data
var cache = null;
//array to hold the shuffled songs
let shuffleArrays = { shuffle_category: [] };

// Fetches the data and stores it in the cache
function fetchData() {
  return $.getJSON("/category.json").then(function (data) {
    //json has a list of songs dictionary with fields: VideoID, Thumbnail and Title
    cache = { response: data };
  });
}

//logic for ajax call to get the shuffled songs from their JSON
function shuffleAjaxCall() {
  var dataPromise;

  if (!cache) {
    dataPromise = fetchData();
  } else {
    // If the cache is not empty, use a resolved promise
    dataPromise = $.Deferred().resolve().promise();
  }

  dataPromise.then(function () {
    shuffleArrays["shuffle_category"] = cache.response.map(
      (song) => `https://www.youtube.com/embed/${song.VideoID}`
    );

    shuffleArrays["shuffle_category"].sort(function () {
      return 0.5 - Math.random();
    });

    shuffler(shuffleArrays["shuffle_category"]);
  });
}

function shuffler(array) {
  if (array.length == 0) {
    // Refresh #video
    $("#video_container").empty();
    // Create a new media element in the video container
    $("#video_container").html(
      "<video id='video' src='' autoplay preload='auto'></video>"
    );

    // Video dimensions scale to fit the container
    video_scaler();

    //a random click on DOM element to trigger autoshuffle => checkActivity()
    //re-triggers shuffle when previous shuffle ends
    $("#queue_header").click();
    return;
  }

  //if queue_array is not empty, play_Queue()
  function relooper_shuffle() {
    shuffler(array);
  }

  //get the video element and set the source for mejs player
  var video = document.getElementById("video");
  video.src = array[0];
  mejs_media_Player(relooper_shuffle);

  //remove first element from array after playing
  array.shift();
}
