<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="autoplayText"
    />

    <BaseToggle
      :is-checked="isQueueAutoplay"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'queue',
      {
        isQueueAutoplay: 'isAutoplay'
      }
    ),
    autoplayText () {
      return this.$t(
        'settings.options.app.queue.autoplay'
      )
    }
  },
  methods: {
    handleToggleOn () {
      updateGlobalStore(
        {
          'queue.isAutoplay': true
        }
      )
    },
    handleToggleOff () {
      updateGlobalStore(
        {
          'queue.isAutoplay': false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
