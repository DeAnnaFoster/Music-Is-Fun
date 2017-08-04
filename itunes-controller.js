function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    storeArtist(artist);
    itunesService.getMusicByArtist(artist).then(drawSongs); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here
  var searchArtist = '';

  storeArtist = function (artist) {
    searchArtist = artist;
  }

  getsearchArtist = function () {
    return searchArtist;
  }

  drawSongs = function (songList) {
    //adding the correct information to the screen
    //need to accept a parameter of songs maybe call it called `(songList)`
    //The `songList` is an `array` of `objects` where each `object` is a song as illustrated below

    // ```javascript
    // songList = [{
    //   title: 'string - song title',
    //   albumArt: 'string - url for song album cover art',
    //   artist: 'string - artistName',
    //   collection: 'string - album title',
    //   price: 'number - price of song',
    //   preview: 'string - url will play the song'
    // }]
    // ```

    //noticed videos have the term 'video' in preview and music has either 'music' or 'audio' in preview

    let artst = getsearchArtist();
    var mainTemplate = `
        <h2>Summary of ${songList.length} Results for: ${artst}</h2>
      `
    document.getElementById('mainTitle').innerHTML = mainTemplate;

    var template = '';

    for (var i = 0; i < songList.length; i++) {
      var song = songList[i];

      //truncate the 'By' Field
      var by = ''
      if (song.artist.length > 35) {
        by = song.artist.substring(0, 35);
      } else {
        by = song.artist;
      }

      //filter here for vid vs. audio
      let tempPreview = songList[i].preview.toLowerCase();
      // if(tempPreview.indexOf('video')!= -1){
      //   console.log(tempPreview);
      // }

      if (tempPreview.indexOf('video') == -1) {

        template += `
      <div class="card card-outline-primary">
        <img class="card-img-top" src="${song.albumArt}" alt="song image">
          <div class="card-block">
            <p class="card-title">${song.title} from ${song.collection} (${song.price})</p>
            <p>By: ${by}</p>
            <audio class= "allAudios" id="ap${i}" src="${song.preview}" type="audio/wav"></audio>
            <div>
              <button type="button" id="btn${i}" class="btn btn-default" onclick="app.controllers.itunesCtrl.toggle(ap${i},btn${i})"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
            </div>
          </div>
      </div>
      `
      }
    }

    document.getElementById('templateInsert').innerHTML = template;
    //songList = '';
  }

  this.toggle = function (audioId, btn) {
    var audioPlayer = document.getElementsByClassName('allAudios');

    for (var i = 0; i < audioPlayer.length; i++) {
      let ap = audioPlayer[i];

      //maybe see if I can improve this a bit more...maybe loop through all to pause first, then play the one

      if (ap.id != audioId.id) {
        if (!ap.paused) {   //if its playing
          ap.pause();       //pause it

          document.getElementById(btn.id).innerHTML = '<span class="glyphicon glyphicon-play"></span>';

        }
      } else {
        if (ap.paused) {      //if its paused
          ap.play();        //play it

          document.getElementById(btn.id).innerHTML = '<span class="glyphicon glyphicon-pause"></span>';

        } else {
          ap.pause();

          document.getElementById(btn.id).innerHTML = '<span class="glyphicon glyphicon-play"></span>';

        }
      }
    }
  }
}