import { toggleAction as toggleAudioAction } from '#/actions/audio'

export default {
  methods: {
    handleClick () {
      if (this.isCurrent) {
        toggleAudioAction()
      } else {
        !this.isLoading && this.fetchAudio()
      }
    }
  }
}
