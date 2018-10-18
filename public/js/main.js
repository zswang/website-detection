(function () {


  var STORAGE_KEY = 'website-detection-0.0'
  var mailStorage = {
    fetch: function () {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      } catch (ex) {
        return {}
      }
    },
    save: function (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    },
  }

  var socket = io.connect(window.ws.host, {
    path: window.ws.path,
    secure: /^https/i.test(location.protocol)
  })


  socket.on('message', function (reply) {
    pm.logs.push(reply.data)
    if (reply.data.type === 'resource') {
      features.forEach(function(feature) {
        if (feature.pattern.test(reply.data.message)) {
          if (pm.features.indexOf(feature) < 0) {
            pm.features.push(feature)
          }
        }
      })
    } else if (reply.data.type === 'global') {
      features.forEach(function(feature) {
        if (reply.data.message.indexOf(feature.global) >= 0) {
          if (pm.features.indexOf(feature) < 0) {
            pm.features.push(feature)
          }
        }
      })
    }
  })
  socket.on('close', function (reply) {
    pm.loading = false
  })

  var features = [
    {
      pattern: /www\.google-analytics\.com\/analytics\.js|ssl\.google-analytics\.com\/ga\.js/,
      name: 'google-analytics',
      title: '谷歌分析',
      global: 'GoogleAnalyticsObject',
      home: 'https://analytics.google.com/',
    },

    {
      pattern: /www\.googletagmanager\.com\/gtm\.js/,
      name: 'google-tagmanager',
      title: 'tag manager',
      global: 'google_tag_manager',
      home: 'https://www.google.com/analytics/tag-manager/',
    },

    {
      pattern: /hm\.baidu\.com\/hm\.js|hm\.baidu\.com\/h\.js|datax\.baidu\.com\/x\.js/,
      name: 'baidutongji',
      title: '百度统计',
      global: '_hmt',
      home: 'http://tongji.baidu.com/',
    },
    {
      pattern: /www\.sensorsdata\.cn\/sdk\/sensorsdata\.www\.js|sensorsdata\.min\.js|sa\.gif.*&project=/,
      name: 'sensorsdata',
      title: '神策数据',
      global: 'sensorsDataAnalytic201505',
      home: 'http://sensorsdata.cn/',
    },
    {
      pattern: /\blsd\.js\b|\b_lsd\.gif.*app=/,
      name: "lotuseed",
      title: "莲子手游运营分析",
      global: "Lsd",
      home: "http://game.lotuseed.com"
    },
    {
      pattern: /js\.ptengine\.cn\/\w+\.js/,
      name: 'ptengine',
      title: '铂金分析',
      global: 'badgeSign',
      home: 'http://www.ptengine.cn/',
    },
    {
      pattern: /dn-growing\.qbox\.me\/vds-gate\.js|dn-growing\.qbox\.me\/vds\.js/,
      name: 'growingio',
      title: 'GrowingIO',
      global: 'grcs',
      home: 'https://www.growingio.com/',
    },
    {
      pattern: /zhugeio\.com\/common\/js\/track[\w.]+\.js/,
      name: 'zhugeio',
      title: '诸葛io',
      global: 'zhuge',
      home: 'https://zhugeio.com/',
    },
    {
      pattern: /w\.cnzz\.com\/c\.php\?id=\w+/,
      name: 'cnzz',
      title: 'CNZZ/友盟',
      global: 'cnzz',
      home: 'http://www.umeng.com/',
    },
    {
      pattern: /static\.t\.agrantsem\.com\/ag_track[\w-.]+\.js/,
      name: 'agrantsem',
      title: 'AnG',
      global: '_agtjs',
      home: 'http://www.agrantsem.com/',
    },
    {
      pattern: /tajs\.qq\.com\/stats\?sId=\w+/,
      name: 'tencent-analytics',
      title: '腾讯分析',
      global: 'taClick',
      home: 'http://v2.ta.qq.com/',
    },

    {
      pattern: /b\.scorecardresearch\.com\/beacon\.js/,
      name: 'scorecard-research',
      title: 'ScorecardResearch',
      global: 'udm_',
      home: 'http://www.scorecardresearch.com/',
    },

  ]

  var pm = new penjs('.form', {
    data: {
      url: mailStorage.fetch().url,
      logs: [],
      features: [],
      loading: false,
    },
    methods: {
      detection: function (url) {
        if (!(/^https?:/.test(url))) {
          url = 'http://' + url.replace(/^.*:/, '')
        }
        pm.logs = []
        pm.features = []
        pm.loading = true
        pm.url = url
        mailStorage.save({
          url: url
        })
        socket.emit('detection', {
          url: url,
        })
      },
    }
  })


})()