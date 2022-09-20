<template>
  <div class="option">
    <BaseHeader
      class="option-header"
      tag="h4"
      :text="autoplayText"
    />

    <BaseToggle
      store-key="video.isAutoplay"
      :is-checked="isVideoAutoplay"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'video',
      {
        isVideoAutoplay: 'isAutoplay'
      }
    ),
    autoplayText () {
      return this.$t(
        'settings.options.app.video.autoplay'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
