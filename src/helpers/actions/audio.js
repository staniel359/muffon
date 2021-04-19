import store from '*/store'
import { paramCase } from 'param-case'
import sources from '#/data/audio/sources'

function audio () {
  return store.state.audio.element
}

export function load (value) {
  resetIsPlayable()

  audio().src = value
}

export function setIsPlayable (value) {
  store.dispatch(
    'audio/setIsPlayable',
    value
  )
}

export function setIsAutoplay (value = true) {
  store.dispatch(
    'audio/setIsAutoplay',
    value
  )
}

function resetIsPlayable () {
  setIsPlayable(false)
}

export function pause () {
  audio().pause()
}

export function setAction (value) {
  audio()[value]()
}

export function toggleAction () {
  const value = store.getters['audio/action']

  audio()[value]()
}

export function setCurrentTime (value) {
  audio().currentTime = value
}

export function resetCurrentTime () {
  audio().currentTime = 0
}

export function setVolume (value) {
  audio().volume = value
}

export function stop () {
  audio().src = null

  resetStatus()
  resetIsPlayable()
}

function resetStatus (value) {
  setStatus('stop')
}

function setStatus (value) {
  store.dispatch('audio/setStatus', value)
}

export function toggleIsMuted () {
  const value = !store.state.audio.isMuted

  audio().muted = value

  store.dispatch('audio/setIsMuted', value)
}

export function toggleIsLoop () {
  const value = !store.state.audio.isLoop

  setIsLoop(value)
}

function setIsLoop (value) {
  audio().loop = value

  store.dispatch('audio/setIsLoop', value)
}

export function resetIsLoop () {
  setIsLoop(false)
}

export function getSourceData (sourceId) {
  const sourceIdFormatted = paramCase(sourceId || '')

  return sources.find(source => {
    return source.id === sourceIdFormatted
  }) || {}
}
