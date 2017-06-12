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
  website_detection.innerHTML = <!--jdists encoding='quoted' import='dev.html?injection-html' /-->

  document.body.appendChild(website_detection)

  <!--jdists import='js/website_detection.js?injection-js' /-->

})()