<template>
  <div class="content">
    <BaseHeader
      tag="h4"
      :text="headerFormatted"
    />

    <BaseToggle
      :isChecked="isChecked"
      @on="handleToggleOn"
      @off="handleToggleOff"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseToggle from '@/BaseToggle.vue'
import {
  getIsQueueAutoplay as getIsLocalQueueAutoplay
} from '#/actions/plugins/local'
import { setIsAutoplay as setIsQueueAutoplay } from '#/actions/queue'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'AutoplayOption',
  components: {
    BaseHeader,
    BaseToggle
  },
  computed: {
    headerFormatted () {
      return localize(
        'settings.queue.autoplay'
      )
    },
    isChecked () {
      return getIsLocalQueueAutoplay()
    }
  },
  methods: {
    handleToggleOn () {
      setIsQueueAutoplay(true)
    },
    handleToggleOff () {
      setIsQueueAutoplay(false)
    }
  }
}
</script>

<style lang="sass" scoped></style>
