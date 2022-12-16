<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="playingText"
    />

    <BaseToggle
      store-key="profile.isShowPlaying"
      :is-checked="isShowProfilePlaying"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'PlayingOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      profileStore,
      {
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    playingText () {
      return this.$t(
        'settings.options.profile.player.playing'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
