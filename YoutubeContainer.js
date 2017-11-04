var youtubeContainerSingleton;
var containerGlobal = "container";
class YoutubeContainer {
  constructor() {
    this.videos = {};
    this.id = "youtube-container";
    this.active;
    var div = document.createElement("div");
    div.attr
  }

  static get instance() {
    if (!youtubeContainerSingleton) {
      youtubeContainerSingleton = new YoutubeContainer();
    }
    return youtubeContainerSingleton;
  }

  get element() {
    return document.getElementById(this.id);
  }

  add(videoId) {
    this.allPaused();
    this.videos[videoId] = new PlayerWrapper(videoId, this);
  }

  remove(videoId) {
    this.videos[videoId].clean();
    delete this.videos[videoId];
  }

  allPaused(videoIdToKeep) {
    Object.keys(this.videos)
      .filter(v => v && v !== videoIdToKeep)
      .forEach(v => this.videos[v].pause());
    this.allHide(videoIdToKeep);
  }

  allStop(videoIdToKeep) {
    Object.keys(this.videos)
      .filter(v => v && v !== videoIdToKeep)
      .forEach(v => this.videos[v].stop());
  }

  allHide(videoIdToKeep) {
    Object.keys(this.videos)
      .filter(v => v && v !== videoIdToKeep)
      .forEach(v => this.videos[v].hide());
  }
}
