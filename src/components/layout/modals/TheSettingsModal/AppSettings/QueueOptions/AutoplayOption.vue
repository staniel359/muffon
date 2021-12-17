<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="autoplayText"
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
import { updateStore } from '#/actions'

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
    autoplayText () {
      return this.$t(
        'settings.options.app.queue.autoplay'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateStore({
        'queue.isAutoplay': true
      })
    },
    handleToggleOff () {
      updateStore({
        'queue.isAutoplay': false
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
