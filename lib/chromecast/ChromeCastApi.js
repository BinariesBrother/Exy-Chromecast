var chromecastApiSingleton;
class ChromeCastApi {
  constructor() {
    var self = this;
    this.context = cast.framework.CastReceiverContext.getInstance();
    var ns = 'urn:x-cast:com.exy.player';
    this.context.addCustomMessageListener(ns, function(e) {
      if (e && e.data && e.data.exec) {
        var classe = eval(e.data.exec.split("." [0]));
        var obj = classe;
        e.data.exec.split(".")
          .splice(1, e.data.exec.length)
          .forEach(attribute => obj = self.initAttribute(obj, attribute)
            .bind(
              self));
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
