import local from '#/plugins/local'

export function setCurrentTrackId (value) {
  local.set('player.currentTrackId', value)
}

export function getCurrentTrackId () {
  return local.get('player.currentTrackId')
}

export function setPlaying (value) {
  local.set('player.playing', value)
}

export function getPlaying () {
  return local.get('player.playing')
}

export function setSourceId (value) {
  local.set('player.sourceId', value)
}

export function getSourceId () {
  return local.get('player.sourceId')
}

export function setVariants (value) {
  local.set('player.variants', value)
}

export function getVariants () {
  return local.get('player.variants')
}
