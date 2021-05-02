<template>
  <BasePopupContainer class="volume-popup">
    <div class="volume-header-container">
      <BaseHeader
        tag="h4"
        :text="headerFormatted"
      />
    </div>

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
import BaseHeader from '@/BaseHeader.vue'
import BaseSeeker from '@/BaseSeeker.vue'
import { mainVolumeSeekerOptions } from '#/data/plugins/semantic'
import { setVolume as setAudioVolume } from '#/actions/audio'

export default {
  name: 'VolumePopup',
  components: {
    BasePopupContainer,
    BaseHeader,
    BaseSeeker
  },
  computed: {
    ...mapState('audio', {
      audioVolume: 'volume'
    }),
    headerFormatted () {
      return Math.floor(
        this.audioVolume * 100
      ).toString()
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
.volume-popup
  @extend .text-align-center
  width: 60px

.volume-header-container
  margin-bottom: 5px

.volume-seeker
  @extend .w-100, .d-flex, .justify-content-center
  height: 110px !important
  padding: 5px 0 !important
</style>
