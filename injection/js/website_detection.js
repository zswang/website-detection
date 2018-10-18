(function() {
  var website_detection = document.querySelector("#website_detection");
  if (!website_detection) {
    return;
  }

  /*<injection-js>*/
  var features = [
    {
      pattern: /www\.google-analytics\.com\/analytics\.js|ssl\.google-analytics\.com\/ga\.js/,
      name: "google-analytics",
      title: "谷歌分析",
      global: "GoogleAnalyticsObject",
      home: "https://analytics.google.com/"
    },

    {
      pattern: /www\.googletagmanager\.com\/gtm\.js/,
      name: "google-tagmanager",
      title: "tag manager",
      global: "google_tag_manager",
      home: "https://www.google.com/analytics/tag-manager/"
    },

    {
      pattern: /hm\.baidu\.com\/hm\.js|hm\.baidu\.com\/h\.js|datax\.baidu\.com\/x\.js/,
      name: "baidutongji",
      title: "百度统计",
      global: "_hmt",
      home: "http://tongji.baidu.com/"
    },
    {
      pattern: /www\.sensorsdata\.cn\/sdk\/sensorsdata\.www\.js|sensorsdata\.min\.js/,
      name: "sensorsdata",
      title: "神策数据",
      global: "sensorsDataAnalytic201505",
      home: "http://sensorsdata.cn/"
    },
    {
      pattern: null,
      name: "sensorsdata",
      title: "神策数据(App JS)",
      global: "sensorsdata_app_js_bridge_call_js",
      home: "http://sensorsdata.cn/"
    },
    {
      pattern: /js\.ptengine\.cn\/\w+\.js/,
      name: "ptengine",
      title: "铂金分析",
      global: "badgeSign",
      home: "http://www.ptengine.cn/"
    },
    {
      pattern: /dn-growing\.qbox\.me\/vds-gate\.js|dn-growing\.qbox\.me\/vds\.js/,
      name: "growingio",
      title: "GrowingIO",
      global: "grcs",
      home: "https://www.growingio.com/"
    },
    {
      pattern: /zhugeio\.com\/common\/js\/track[\w.]+\.js/,
      name: "zhugeio",
      title: "诸葛io",
      global: "zhuge",
      home: "https://zhugeio.com/"
    },
    {
      pattern: /w\.cnzz\.com\/c\.php\?id=\w+/,
      name: "cnzz",
      title: "CNZZ/友盟",
      global: "cnzz",
      home: "http://www.umeng.com/"
    },
    {
      pattern: /static\.t\.agrantsem\.com\/ag_track[\w-.]+\.js/,
      name: "agrantsem",
      title: "AnG",
      global: "_agtjs",
      home: "http://www.agrantsem.com/"
    },
    {
      pattern: /tajs\.qq\.com\/stats\?sId=\w+/,
      name: "tencent-analytics",
      title: "腾讯分析",
      global: "taClick",
      home: "http://v2.ta.qq.com/"
    },
    {
      pattern: /\blsd\.js\b/,
      name: "lotuseed",
      title: "莲子手游运营分析",
      global: "Lsd",
      home: "http://game.lotuseed.com"
    },
    {
      pattern: /b\.scorecardresearch\.com\/beacon\.js/,
      name: "scorecard-research",
      title: "ScorecardResearch",
      global: "udm_",
      home: "http://www.scorecardresearch.com/"
    }
  ];

  /*<remove>*/
  window._hmt = true;
  window.taClick = true;
  window.udm_ = true;
  /*</remove>*/

  var currentFeatures = [];

  if (window.performance && performance.getEntries) {
    performance.getEntries().forEach(function(entrie) {
      features.forEach(function(feature) {
        if (feature.pattern && feature.pattern.test(entrie.name)) {
          if (currentFeatures.indexOf(feature) < 0) {
            currentFeatures.push(feature);
          }
        }
      });
    });
  }

  features.forEach(function(feature) {
    if (feature.global in window) {
      if (currentFeatures.indexOf(feature) < 0) {
        currentFeatures.push(feature);
      }
    }
  });

  var detection_header = website_detection.querySelector(".panel_header");
  if (detection_header) {
    var origin;
    var startPos;

    detection_header.addEventListener("mousedown", function(e) {
      var style = getComputedStyle(website_detection, true);
      origin = [parseFloat(style.left), parseFloat(style.top)];
      startPos = [e.screenX, e.screenY];

      function handlerMouseMove(e) {
        website_detection.style.left =
          Math.max(
            0,
            Math.min(
              document.documentElement.clientWidth -
                website_detection.clientWidth,
              origin[0] + (e.screenX - startPos[0])
            )
          ) + "px";
        website_detection.style.top =
          Math.max(
            0,
            Math.min(
              document.documentElement.clientHeight -
                website_detection.clientHeight,
              origin[1] + (e.screenY - startPos[1])
            )
          ) + "px";
      }

      function handlerMouseUp(e) {
        document.removeEventListener("mousemove", handlerMouseMove);
        document.removeEventListener("mouseup", handlerMouseUp);
      }

      document.addEventListener("mousemove", handlerMouseMove);
      document.addEventListener("mouseup", handlerMouseUp);
    });
  }

  var detection_close = website_detection.querySelector(
    ".panel_header .btn_close"
  );

  if (detection_close) {
    detection_close.addEventListener("click", function() {
      website_detection.style.display = "none";
    });
  }

  var elementFeatures = website_detection.querySelector(".features");

  var html = "";
  currentFeatures.forEach(function(feature) {
    /*<jdists encoding="templatestrings">*/
    html += `
  <li>
    <h4>${feature.title}</h4>
    <a href="${
      feature.home
    }" target="_blank"><img src="${"https://raw.githubusercontent.com/zswang/website-detection/master/public/img/" +
      feature.name +
      ".png"}" alt="${feature.name}"></a>
  </li>`;
    /*</jdists>*/
  });

  elementFeatures.innerHTML = html;
  /*</injection-js>*/
})();
