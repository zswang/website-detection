website-detection
--------
The detection website introduces third party components

## Usage

### Injection

```js
javascript:with(document)0[body.appendChild(createElement('script')).src='//raw.githubusercontent.com/zswang/website-detection/master/injection/injection.js?'+Math.random()]
```

### Inline

```js
javascript:void function(){var e=document.querySelector("#website_detection");if(e)return e.style.display="",void(e.onshow&&e.onshow());e=document.createElement("div"),e.id="website_detection",e.innerHTML='    <style>#website_detection{position:fixed;width:440px;border:gray solid 1px;border-radius:3px;background:#fff;left:100px;top:30px;z-index:2012122324}#website_detection a,#website_detection button,#website_detection h4,#website_detection input,#website_detection label,#website_detection li,#website_detection p,#website_detection select,#website_detection textarea,#website_detection ul{margin:0;padding:0;box-sizing:border-box;font:18px/1.125 Arial,Helvetica,sans-serif}#website_detection h4{padding:4px 0}#website_detection li,#website_detection ul{list-style:none;padding:0;margin:0}#website_detection .panel_header{height:24px;line-height:24px;position:relative;background:#24292e;color:#fff;padding:2px 5px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:move}#website_detection .panel_header .image_logo{float:left;cursor:pointer;color:#fff;text-decoration:none}#website_detection .panel_header .label_title{float:left;margin-left:5px}#website_detection .panel_header .btn_close{float:right;cursor:pointer}#website_detection .panel_content{background:#fff;padding:5px}#website_detection .panel_content .features li{float:left;width:200px;margin:6px;height:150px;text-align:center;border:gray solid 1px}#website_detection .panel_content .features li img{width:170px;height:70px}#website_detection .clear{clear:both}</style>\n    <div class="panel_header">\n      <a href="https://weibo.com/zswang" target="_blank" class="image_logo">z</a>\n      <span class="label_title">Website Detection</span>\n      <span class="btn_close">×</span>\n    </div>\n    <div class="panel_content">\n      <ul class="features"></ul>\n    </div>',document.body.appendChild(e);var t=[{pattern:/www\.google-analytics\.com\/analytics\.js|ssl\.google-analytics\.com\/ga\.js/,name:"google-analytics",title:"谷歌分析",global:"GoogleAnalyticsObject",home:"https://analytics.google.com/"},{pattern:/www\.googletagmanager\.com\/gtm\.js/,name:"google-tagmanager",title:"tag manager",global:"google_tag_manager",home:"https://www.google.com/analytics/tag-manager/"},{pattern:/hm\.baidu\.com\/hm\.js|hm\.baidu\.com\/h\.js|datax\.baidu\.com\/x\.js/,name:"baidutongji",title:"百度统计",global:"_hmt",home:"http://tongji.baidu.com/"},{pattern:/www\.sensorsdata\.cn\/sdk\/sensorsdata\.www\.js|sensorsdata\.min\.js/,name:"sensorsdata",title:"神策数据",global:"sensorsDataAnalytic201505",home:"http://sensorsdata.cn/"},{pattern:/js\.ptengine\.cn\/\w+\.js/,name:"ptengine",title:"铂金分析",global:"badgeSign",home:"http://www.ptengine.cn/"},{pattern:/dn-growing\.qbox\.me\/vds-gate\.js|dn-growing\.qbox\.me\/vds\.js/,name:"growingio",title:"GrowingIO",global:"grcs",home:"https://www.growingio.com/"},{pattern:/zhugeio\.com\/common\/js\/track[\w.]+\.js/,name:"zhugeio",title:"诸葛io",global:"zhuge",home:"https://zhugeio.com/"},{pattern:/w\.cnzz\.com\/c\.php\?id=\w+/,name:"cnzz",title:"CNZZ/友盟",global:"cnzz",home:"http://www.umeng.com/"},{pattern:/static\.t\.agrantsem\.com\/ag_track[\w-.]+\.js/,name:"agrantsem",title:"AnG",global:"_agtjs",home:"http://www.agrantsem.com/"},{pattern:/tajs\.qq\.com\/stats\?sId=\w+/,name:"tencent-analytics",title:"腾讯分析",global:"taClick",home:"http://v2.ta.qq.com/"},{pattern:/b\.scorecardresearch\.com\/beacon\.js/,name:"scorecard-research",title:"ScorecardResearch",global:"udm_",home:"http://www.scorecardresearch.com/"}],n=[];window.performance&&performance.getEntries&&performance.getEntries().forEach(function(e){t.forEach(function(t){t.pattern.test(e.name)&&n.indexOf(t)<0&&n.push(t)})}),t.forEach(function(e){e.global in window&&n.indexOf(e)<0&&n.push(e)});var o=e.querySelector(".panel_header");if(o){var a,i;o.addEventListener("mousedown",function(t){function n(t){e.style.left=Math.max(0,Math.min(document.documentElement.clientWidth-e.clientWidth,a[0]+(t.screenX-i[0])))+"px",e.style.top=Math.max(0,Math.min(document.documentElement.clientHeight-e.clientHeight,a[1]+(t.screenY-i[1])))+"px"}function o(e){document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",o)}var s=getComputedStyle(e,!0);a=[parseFloat(s.left),parseFloat(s.top)],i=[t.screenX,t.screenY],document.addEventListener("mousemove",n),document.addEventListener("mouseup",o)})}var s=e.querySelector(".panel_header .btn_close");s&&s.addEventListener("click",function(){e.style.display="none"});var c=e.querySelector(".features"),r="";n.forEach(function(e){r+="\n  <li>\n    <h4>"+e.title+'</h4>\n    <a href="'+e.home+'" target="_blank"><img src="https://raw.githubusercontent.com/zswang/website-detection/master/public/img/'+e.name+'.png" alt="'+e.name+'"></a>\n  </li>'}),c.innerHTML=r}();
```

## Install

```shell
npm install
```

## Environment dependence

### phantomjs

* [phantomjs](https://phantomjs.org)

```shell
mkdir ~/software
cd ~/software
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O phantomjs-2.1.1-linux-x86_64.tar.bz2
tar -xvf phantomjs-2.1.1-linux-x86_64.tar.bz2
mv phantomjs-2.1.1-linux-x86_64 /usr/local/phantomjs
ln -s /usr/local/phantomjs/bin/phantomjs /usr/bin/phantomjs
phantomjs -v
```

### phantomjs of centos

```shell
yum install libXext libXrender fontconfig libfontconfig.so.1
```

## Start

```shell
pm2 start pm2.json
```