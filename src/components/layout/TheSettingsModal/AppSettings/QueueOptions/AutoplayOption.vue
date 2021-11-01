<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
    />

    <BaseToggle
      :isChecked="isQueueAutoplay"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import { setGlobalData } from '#/actions'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState('queue', {
      isQueueAutoplay: 'isAutoplay'
    }),
    headerFormatted () {
      return this.$t(
        'layout.settings.options.app.queue.autoplay'
      )
    }
  },
  methods: {
    handleToggleOn () {
      setGlobalData({
        'queue.isAutoplay': true
      })
    },
    handleToggleOff () {
      setGlobalData({
        'queue.isAutoplay': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
