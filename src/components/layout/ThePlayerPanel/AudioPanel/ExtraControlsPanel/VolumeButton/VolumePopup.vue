<template>
  <div class="ui popup main-popup">
    <div class="popup-content">
      <h4 class="ui header main-header">
        {{ volumeFormatted }}
      </h4>

      <BaseSeeker
        class="vertical reversed volume-seeker"
        :options="seekerOptions"
        @move="handleMove"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseSeeker from '@/BaseSeeker.vue'
import { mainVolumeSeekerOptions } from '#/data/plugins/semantic'
import { setVolume as setAudioVolume } from '#/actions/audio'

export default {
  name: 'VolumePopup',
  components: {
    BaseSeeker
  },
  computed: {
    ...mapState('audio', {
      audioVolume: 'volume'
    }),
    volumeFormatted () {
      return Math.floor(
        this.audioVolume * 100
      )
    },
    seekerOptions () {
      return mainVolumeSeekerOptions({
        start: this.audioVolume
      })
    }
  },
  methods: {
    handleMove (value) {
      setAudioVolume(value)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-popup
  height: 150px
  width: 55px

.popup-content
  @extend .h-100, .d-flex, .flex-column, .align-items-center
  .main-header
    margin-bottom: 5px !important

.volume-seeker
  width: 14px !important
  margin: 5px 0
</style>
