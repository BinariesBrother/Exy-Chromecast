var chromecastApiSingleton;
class ChromeCastApi {
  constructor() {
    var self = this;
    var context = cast.framework.CastReceiverContext.getInstance();
    var ns = 'urn:x-cast:com.exy.player';
    context.addCustomMessageListener(ns, function(e) {
      if (e && e.data && e.data.exec) {
        var responseContext = cast.framework.CastReceiverContext.getInstance();
        var senderId = e.senderId;
        var classe = eval(e.data.exec.split(".")[0]);
        var obj = classe;
        e.data.exec.split(".")
          .splice(1, e.data.exec.length)
          .forEach(attribute => obj = self.initAttribute(obj, attribute));
        responseContext.send(senderId, { type: "response", data: obj });
      }
    });
    context.start({
      maxInactivity: 120000
    });
  }

  static get instance() {
    if (!chromecastApiSingleton) chromecastApiSingleton = new ChromeCastApi();
    return chromecastApiSingleton;
  }

  initAttribute(objet, attribute) {
    var result = objet[attribute.split("(")[0]];
    var re = /(?:[(]([^)]*)[)])/g;
    var attr;
    while (attr = re.exec(attribute)) {
      result = result.bind(objet);
      result = result(attr[1]);
    }
    return result;
  }
}
