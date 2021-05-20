import local from '#/plugins/local'

export function setCurrentTrackId (value) {
  local.set('queue.currentTrackId', value)
}

export function getCurrentTrackId () {
  return local.get('queue.currentTrackId')
}

export function setIsAutoplay (value) {
  local.set('queue.isAutoplay', value)
}

export function getIsAutoplay () {
  return local.get('queue.isAutoplay')
}

export function setTracks (value) {
  local.set('queue.tracks', value)
}

export function getTracks () {
  return local.get('queue.tracks')
}
