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

  get statut() {
    return {
      "currentTime": this.player.getCurrentTime(),
      "duration": this.player.getDuration(),
      "state": this._state,
      "quality": this.player.getPlaybackQuality(),
      "videoId": this.videoId
    };
  }

  get _state() {
    switch (player.getPlayerState()) {
      case -1:
        //unstarted
        return "UNSTARTED"
        break;
      case YT.PlayerState.ENDED:
        return "ENDED"
        break;
      case YT.PlayerState.PLAYING:
        return "PLAYING"
        break;
      case YT.PlayerState.PAUSED:
        return "PAUSED"
        break;
      case YT.PlayerState.BUFFERING:
        return "BUFFERING  "
        break;
      case YT.PlayerState.CUED:
        return "CUED"
        break;
      default:
        return "unknow"
    }
  }

  _eventState(state) {
    switch (state) {
      case -1:
        //unstarted
        break;
      case YT.PlayerState.ENDED:
        this.hide();
        break;
      case YT.PlayerState.PLAYING:
        this.show();
        break;
      case YT.PlayerState.PAUSED:
        break;
      case YT.PlayerState.BUFFERING:
        break;
      case YT.PlayerState.CUED:
        break;
      default:
        break;
    }
  }

  get element() {
    return document.getElementById(this.identifiant);
  }

  onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data) {
      this._eventState(event.data);
    }
  }

  onPlayerReady(event) {
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
