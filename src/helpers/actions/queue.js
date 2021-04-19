import store from '*/store'
import { shuffleArray } from '#/utils'

export function setTracks (value) {
  store.dispatch('queue/setTracks', value)
}

function resetTracks () {
  store.dispatch('queue/setTracks', [])
}

export function setTracksShuffled () {
  const tracksShuffled = shuffleArray(
    [...store.state.queue.tracks]
  )

  store.dispatch(
    'queue/setTracksShuffled',
    tracksShuffled
  )
}

export function resetTracksShuffled () {
  store.dispatch('queue/setTracksShuffled', [])
}

export function setIsShuffle (value) {
  store.dispatch('queue/setIsShuffle', value)
}

export function toggleIsShuffle () {
  const value = !store.state.queue.isShuffle

  setIsShuffle(value)
}

export function resetIsShuffle () {
  setIsShuffle(false)
}

export function setCurrentTrackId (value) {
  store.dispatch(
    'queue/setCurrentTrackId',
    value
  )
}

export function reset () {
  resetTracks()
  resetTracksShuffled()
}

export function getIsFetching ({ position }) {
  if (position === 'prev') {
    return store.state.queue.isFetchingPrev
  } else if (position === 'next') {
    return store.state.queue.isFetchingNext
  }
}

export function setIsFetching ({ position }, value) {
  if (position === 'prev') {
    store.dispatch(
      'queue/setIsFetchingPrev',
      value
    )
  } else if (position === 'next') {
    store.dispatch(
      'queue/setIsFetchingNext',
      value
    )
  }
}

export function getIsEdge ({ position }) {
  if (position === 'prev') {
    return store.getters['queue/isStart']
  } else if (position === 'next') {
    return store.getters['queue/isEnd']
  }
}

export function getFollowingTrack ({ position }) {
  if (position === 'prev') {
    return store.getters['queue/prevTrack']
  } else if (position === 'next') {
    return store.getters['queue/nextTrack']
  }
}
