export const setPlayingNowTrack = track => ({
  type: 'SET_PLAYING_NOW_TRACK',
  payload: {
    playingNowTrack: track,
    audioStatus: 'play'
  }
})

export const pauseAudio = () => ({
  type: 'PAUSE_AUDIO',
  payload: {
    audioStatus: 'pause'
  }
})

export const unpauseAudio = () => ({
  type: 'UNPAUSE_AUDIO',
  payload: {
    audioStatus: 'play'
  }
})

export const stopAudio = () => ({
  type: 'STOP_AUDIO',
  payload: {
    playingNowTrack: null,
    audioStatus: 'stop'
  }
})
