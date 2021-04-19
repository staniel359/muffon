<template>
  <div
    class="ui tiny basic compact icon button"
    ref="popup"
    @click="handleClick"
  >
    <i
      class="volume icon"
      :class="volumeIcon"
    />
  </div>

  <VolumePopup />
</template>

<script>
import { mapState } from 'vuex'
import VolumePopup from './VolumeButton/VolumePopup.vue'
import { setPopup } from '#/actions/plugins/semantic'
import { mainPopupOptions } from '#/data/plugins/semantic'
import { toggleIsMuted as toggleIsAudioMuted } from '#/actions/audio'

export default {
  name: 'VolumeButton',
  components: {
    VolumePopup
  },
  computed: {
    ...mapState('audio', {
      isAudioMuted: 'isMuted',
      audioVolume: 'volume'
    }),
    volumeIcon () {
      if (this.isAudioMuted) {
        return 'mute'
      } else {
        if (this.isVolumeOff) {
          return 'off'
        } else if (this.isVolumeLow) {
          return 'down'
        } else {
          return 'up'
        }
      }
    },
    isVolumeOff () {
      return this.audioVolume === 0
    },
    isVolumeLow () {
      return this.audioVolume <= 0.5
    }
  },
  mounted () {
    setPopup(
      this.$refs.popup,
      mainPopupOptions()
    )
  },
  methods: {
    handleClick () {
      toggleIsAudioMuted()
    }
  }
}
</script>

<style lang="sass" scoped></style>
