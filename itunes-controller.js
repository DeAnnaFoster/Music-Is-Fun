function ItunesController() {
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(drawSongs); //after get music by artist returns what are you doing with the objects?
  }

  //Start coding here



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

    console.log(songList);

  }


  this.toggle = function () {
    //debugger
    var audioPlayer = document.getElementById('test');

    if (audioPlayer.paused) {
      audioPlayer.play();
      document.getElementById('test1').innerText = 'Stop';
    } else {
      audioPlayer.pause();
      document.getElementById('test1').innerText = 'Play';
    }

  }




}