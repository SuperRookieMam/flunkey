document.addEventListener('deviceReady', function () {
  alert('111111111111')
  let myMedia = new Media('../assets/voice/daji.mp3', onaccess, onError)
  alert('222222222222')
  function onSuccess() {
    alert('333333333333333')
  }

  function onError(error) {
    alert('44444444444444444444')
  }
  alert('55555555555555555')
  myMedia.setVolume(1)
  alert('6666666666666666')
  myMedia.play()
  alert('77777777777777777')
  return myMedia
})
