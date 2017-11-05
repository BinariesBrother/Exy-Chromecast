var chromecastApiSingleton;
class ChromeCastApi {
  constructor() {

    this.context = cast.framework.CastReceiverContext.getInstance();
    var ns = 'urn:x-cast:com.exy.player';
    this.context.addCustomMessageListener(ns, function(e) {
      if (e && e.data) {
        var classe = eval(e.data.type.split("." [0]));
        var obj = classe;
        e.data.type.split(".")
          .splice(1, e.data.type.length)
          .forEach(attribute => obj = this.initAttribute(obj, attribute));
        //YoutubeContainer.instance.add(e.data.videoId);
      }
    });
    this.context.start({
      maxInactivity: 120000
    });
  }

  static get instance() {
    if (!chromecastApiSingleton) chromecastApiSingleton = new ChromeCastApi();
    return chromecastApiSingleton;
  }

  initAttribute(objet, attribute) {
    var result = objet;
    var re = /(?:[(]([^)]*)[)])/g;
    var attr;
    while (attr = re.exec(attribute)) {
      result = result(attr);
    }
    return result;
  }
}
