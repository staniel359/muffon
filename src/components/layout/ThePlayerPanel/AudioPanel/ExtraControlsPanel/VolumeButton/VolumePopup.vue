<template>
  <BasePopupContainer>
    <h4 class="ui header main-header">
      {{ volumeFormatted }}
    </h4>

    <BaseSeeker
      class="vertical reversed volume-seeker"
      :options="seekerOptions"
      @move="handleMove"
    />
  </BasePopupContainer>
</template>

<script>
import { mapState } from 'vuex'
import BasePopupContainer from '@/containers/BasePopupContainer.vue'
import BaseSeeker from '@/BaseSeeker.vue'
import { mainVolumeSeekerOptions } from '#/data/plugins/semantic'
import { setVolume as setAudioVolume } from '#/actions/audio'

export default {
  name: 'VolumePopup',
  components: {
    BasePopupContainer,
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
  height: 155px
  width: 60px

.main-header
  margin-bottom: 5px !important

.volume-seeker
  width: 14px !important
  padding: 5px 0 !important
</style>
