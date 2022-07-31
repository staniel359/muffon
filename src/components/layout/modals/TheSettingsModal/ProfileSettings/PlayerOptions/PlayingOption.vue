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
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'PlayingOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'profile',
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
