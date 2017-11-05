var identifiant = 1;
class PlayerWrapper {
  constructor(videoId, container) {
    this.videoId = videoId;
    this.container = container;
    this.identifiant = 'video' + identifiant;
    identifiant = identifiant + 1;
    var element = document.createElement("div");
    element.setAttribute("id", this.identifiant);
    this.container.element.appendChild(element);
    this.player = this.initPlayer();
  }

  initPlayer() {
    var self = this;
    self.container.allPaused();
    return new YT.Player(this.identifiant, {
      height: '100%',
      width: '100%',
      videoId: self.videoId,
      events: {
        'onReady': self.onPlayerReady.bind(self),
        'onStateChange': self.onPlayerStateChange.bind(self)
      }
    });
  }

  get element() {
    return document.getElementById(this.identifiant);
  }

  onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data == YT.PlayerState.PLAYING) {
      this.show();
    } else if (event.data == YT.PlayerState.ENDED) {
      //this.hide();
    } else if (event.data == YT.PlayerState.PAUSED) {}
  }

  onPlayerReady(event) {
    //this.hide();
    this.play();
  }

  play(time) {
    this.container.allPaused(this.videoId);
    if (time) this.seekTo(time);
    this.player.playVideo();
  }

  seekTo(time) {
    this.player.seekTo(time);
  }

  stop() {
    this.player.stopVideo();
    this.hide();
  }

  pause() {
    this.player.pauseVideo();
  }

  hide() {
    this.element.style.display = 'none';
  }

  show() {
    this.element.style.display = 'block';
  }

  clean() {
    this.player.destroy();
  }
}
