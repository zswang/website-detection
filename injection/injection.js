(function() {
  var website_detection = document.querySelector('#website_detection')
  if (website_detection) {
    website_detection.style.display = ''
    if (website_detection.onshow) {
      website_detection.onshow()
    }
    return
  }
  website_detection = document.createElement('div')
  website_detection.id = 'website_detection'
  website_detection.innerHTML = "    <style>#website_detection{position:fixed;width:440px;border:gray solid 1px;border-radius:3px;background:#fff;left:100px;top:30px;z-index:2012122324}#website_detection a,#website_detection button,#website_detection h4,#website_detection input,#website_detection label,#website_detection li,#website_detection p,#website_detection select,#website_detection textarea,#website_detection ul{margin:0;padding:0;box-sizing:border-box;font:18px/1.125 Arial,Helvetica,sans-serif}#website_detection h4{padding:4px 0}#website_detection li,#website_detection ul{list-style:none;padding:0;margin:0}#website_detection .panel_header{height:24px;line-height:24px;position:relative;background:#24292e;color:#fff;padding:2px 5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:move}#website_detection .panel_header .image_logo{float:left;cursor:pointer;color:#fff;text-decoration:none}#website_detection .panel_header .label_title{float:left;margin-left:5px}#website_detection .panel_header .btn_close{float:right;cursor:pointer}#website_detection .panel_content{background:#fff;padding:5px}#website_detection .panel_content .features li{float:left;width:200px;margin:6px;height:150px;text-align:center;border:gray solid 1px}#website_detection .panel_content .features li img{width:170px;height:70px}#website_detection .clear{clear:both}</style>\n    <div class=\"panel_header\">\n      <a href=\"https://weibo.com/zswang\" target=\"_blank\" class=\"image_logo\">z</a>\n      <span class=\"label_title\">Website Detection</span>\n      <span class=\"btn_close\">×</span>\n    </div>\n    <div class=\"panel_content\">\n      <ul class=\"features\"></ul>\n    </div>"
  document.body.appendChild(website_detection)
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
      title: "神策数据(App)",
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
    html += "\n  <li>\n    <h4>" + (feature.title) + "</h4>\n    <a href=\"" + (
      feature.home
    ) + "\" target=\"_blank\"><img src=\"" + ("https://raw.githubusercontent.com/zswang/website-detection/master/public/img/" +
      feature.name +
      ".png") + "\" alt=\"" + (feature.name) + "\"></a>\n  </li>";
  });
  elementFeatures.innerHTML = html;
})()