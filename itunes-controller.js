function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function much
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    storeArtist(artist);
    itunesService.getMusicByArtist(artist).then(drawSongs); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here
  var searchArtist = '';
  var songs = {};

  storeArtist = function (artist) {
    searchArtist = artist;
  }

  getsearchArtist = function () {
    return searchArtist;
  }

  drawSongs = function (songList) {
  // #region notes
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
  // #endregion

    //noticed videos have the term 'video' in preview and music has either 'music' or 'audio' in preview
    let artst = getsearchArtist();
    var mainTemplate = `
        <h2>Summary of ${songList.length} Results for: ${artst}</h2>
      `
    document.getElementById('mainTitle').innerHTML = mainTemplate;

    var template = '';

    var counter = 0;
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
      if (tempPreview.indexOf('video') == -1) {

        songs[counter] = songList[i].preview;
        counter++;

        template += `
      <div class="card card-outline-primary">
        <img class="card-img-top" src="${song.albumArt}" alt="song image">
          <div class="card-block">
            <p class="card-title" onclick="app.controllers.itunesCtrl.toggle('btn${i}')">${song.title} from ${song.collection} (${song.price})</p>
            <p>By: ${by}</p>     
            <div>
              <button type="button" id="btn${i}" class="btn btn-default" onclick="app.controllers.itunesCtrl.toggle('btn${i}')"><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
            </div>
          </div>
      </div>
      `
      }
    }

    document.getElementById('templateInsert').innerHTML = template;
  }

  this.toggle = function (btnId) {
    var player = document.getElementById('theOne'); //grabs audioplayer
    let index = btnId.substring(3);   //strips characters from button to get number
    player.src = songs[index];    //sets the source track of the player - index
    player.load();                //and loads it
    player.play();
  }
}