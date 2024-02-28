# Min-Player
This a full page video-player written in HTML, CSS and JS. It uses mediaElementJS to play youtube videos and skips into next video when current video ends. The video list are in category.json file. You'll will need atleast VideoID of JSON file for this player.

# Full Player
This is a minified version of `Vetcheck Player` from my other repository. The full-player has database_creator.js which can split the youtube_URL into VideoID, thumbnail and title which can be copied straight into category.json file. NOTE: this file will require a YouTube v3 API key. It looks something like this with video, search, video-list and queued video.
<img src="https://raw.githubusercontent.com/sedhain-pankaj/VetCheck-Player/main/demo.png">

# Start a PHP server (recommended)
To host an HTML file using PHP or Python 3:<br>
php -S localhost:8000 <br>
<b>OR</b> <br>
python3 -m http.server 8000

# Browser URL
Open your browser and navigate to http://localhost:8000
