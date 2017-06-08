var system = require('system');
var args = system.args;
var url = args[1];
var webPage = require('webpage');
var page = webPage.create();

(function () {

  var timer;
  function runTimeout() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = 0;
      phantom.exit(1);
    }, 30 * 1000);
  }

  if (!url) {
    console.log(JSON.stringify({
      error: 'url not exists.'
    }));
    phantom.exit(1);
    return;
  }

  page.onResourceRequested = function(requestData, networkRequest) {
    runTimeout();
    console.log('resource:' + JSON.stringify(requestData.url));
  };

  page.onError = function(msg, trace) {
    console.log('error:' + JSON.stringify(msg));
  };

  page.open(url, function(status) {
    var fields = page.evaluate(function () {
      // @see: https://stackoverflow.com/questions/17246309/get-all-user-defined-window-properties

      // make sure it doesn't count my own properties
      var results;
      var currentWindow;
      // create an iframe and append to body to load a clean window object
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      // get the current list of properties on window
      currentWindow = Object.getOwnPropertyNames(window);
      // filter the list against the properties that exist in the clean window
      results = currentWindow.filter(function(prop) {
          return !iframe.contentWindow.hasOwnProperty(prop);
      });
      // log an array of properties that are different
      document.body.removeChild(iframe);

      return results;
    });

    console.log('global:' + JSON.stringify(fields));

    setTimeout(function () {
      if (timer) {
        clearTimeout(timer);
      }
      phantom.exit(0);
    }, 5000);
  });

})();
