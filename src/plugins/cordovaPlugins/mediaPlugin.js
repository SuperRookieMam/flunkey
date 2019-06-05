let myMedia = null
export default {
  getMedia (src, onsuccess, onerr) {
    if (myMedia === null) {
      myMedia = new Media(src, () => (onsuccess()), err => (onerr(err)))
    } else {
      myMedia.stop()
      myMedia = new Media(src, () => (onsuccess()), err => (onerr(err)))
    }
    return myMedia
  },
  destroyMedia () {
    if (myMedia !== null) {
      myMedia.stop()
      myMedia = null
    }
  }
}
