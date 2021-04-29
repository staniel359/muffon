import store from '*/store'
import {
  setIsAutoplay as setIsAudioAutoplay,
  stop as stopAudio
} from '#/actions/audio'
import { reset as resetQueue } from '#/actions/queue'

export function setVariants (value) {
  store.dispatch(
    'player/setVariants',
    value
  )
}

export function getVariants () {
  return store.state.player.variants
}

export function setPlaying (value, { isAutoplay = true } = {}) {
  store.dispatch(
    'player/setPlaying',
    value
  )

  setIsAudioAutoplay(isAutoplay)
}

export function getPlaying () {
  return store.state.player.playing
}

export function setCurrentTrackId (value) {
  store.dispatch(
    'player/setCurrentTrackId',
    value
  )
}

export function setCurrentVariantIndex (value) {
  store.dispatch(
    'player/setCurrentVariantIndex',
    value
  )
}

export function setSourceId (value) {
  store.dispatch(
    'player/setSourceId',
    value
  )
}

export function getSourceId () {
  return store.state.player.sourceId
}

export function stopAndClose () {
  stopAudio()

  resetCurrentTrackId()
  resetCurrentVariantIndex()
  resetPlaying()
  resetVariants()
  resetQueue()
}

function resetCurrentTrackId () {
  store.dispatch(
    'player/setCurrentTrackId',
    null
  )
}

export function resetCurrentVariantIndex () {
  store.dispatch(
    'player/setCurrentVariantIndex',
    null
  )
}

function resetPlaying () {
  store.dispatch('player/setPlaying', null)
}

export function resetVariants () {
  store.dispatch('player/setVariants', [])
}

export function formatTitle () {
  const defaultTitle = 'muffon'
  const playerPlaying = store.state.player.playing
  const audioStatus = store.state.audio.status

  if (playerPlaying && audioStatus !== 'stop') {
    const audioStatusIcons = {
      play: '❚❚',
      pause: '▶'
    }
    const audioTitleIcon = audioStatusIcons[audioStatus]

    const artistName = playerPlaying.artist.name
    const trackTitle = playerPlaying.title
    const playerPlayingFullTitle =
      `${artistName} - ${trackTitle}`

    return `${audioTitleIcon} ${playerPlayingFullTitle}`
  } else {
    return defaultTitle
  }
}

export function getIsCurrentTrack ({ trackId }) {
  return (
    trackId ===
      store.state.player.currentTrackId
  )
}

export function getIsCurrentVariant ({ variantIndex }) {
  return (
    variantIndex ===
      store.state.player.currentVariantIndex
  )
}
