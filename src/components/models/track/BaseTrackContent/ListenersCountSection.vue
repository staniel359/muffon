<template>
  <div class="main-counter-bar-container">
    <BaseCounterBar
      :count="listenersCount"
      :top-count="topTrackCount"
    />

    <div class="description">
      <small>
        <BaseIcon
          icon="listener"
        />

        <span
          v-text="listenersCountFormatted"
        />
      </small>
    </div>
  </div>
</template>

<script>
import BaseCounterBar from '@/components/BaseCounterBar.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'ListenersCountSection',
  components: {
    BaseCounterBar,
    BaseIcon
  },
  props: {
    listenersCount: {
      type: Number,
      required: true
    },
    topTrackCount: Number
  },
  computed: {
    listenersCountFormatted () {
      return formatNumber(
        this.listenersCount
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.description
  @extend .d-flex, .align-items-center
</style>
