var error = function error(options) {
  window.onerror = function (event, source, lineno, colno, error) {
    console.log('onerror>>>', event, source, lineno, colno, error);
  };
  var processStackMsg = function processStackMsg(error) {
    var stack = error.stack.replace(/\n/gi, '').split(/\bat\b/).slice(0, 9).join('@').replace(/\?[^:]+/gi, '');
    var msg = error.toString();
    if (stack.indexOf(msg) < 0) {
      stack = msg + '@' + stack;
    }
    return stack;
  };
  // js和资源异常捕获
  window.addEventListener('error', function (event) {
    if (event.target && event.target.href) {
      console.log('css报错>>>', event);
    } else if (event.target && event.target.src) {
      if (event.target.tagName === 'SCRIPT') {
        console.log('script报错>>>', event);
      } else if (event.target.tagName === 'IMG') {
        console.log('img报错>>>', event);
      }
    } else {
      console.log('js报错>>>>', event, processStackMsg(event.error));
    }
    navigator.sendBeacon(options.url, JSON.stringify({
      a: '资源报错'
    }));
  }, true);
  // promise异常捕获
  window.addEventListener('unhandledrejection', function (event) {
    console.log('promise报错>>>>', event);
    new Image().src = options.url + '?a=1';
    // navigator.sendBeacon('/report', JSON.stringify({a: 123}))
  });
  // vue异常捕获
  var vueError = options.vue;
  if (vueError) {
    vueError.config.errorHandler = function (err, instance, info) {
      console.log('>>>> vue2 errorHandler >>>>>>>', err, instance, info);
      navigator.sendBeacon(options.url, JSON.stringify({
        a: JSON.stringify(err)
      }));
    };
  }
};

var index = {
  init: function init(options) {
    console.log('--->>', options);
    error(options);
  }
};

export { index as default };
