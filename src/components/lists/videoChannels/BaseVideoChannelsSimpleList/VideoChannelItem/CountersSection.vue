<template>
  <div class="counters-section">
    <BaseListCounterSection
      v-if="videosCount >= 0"
      class="counter-section"
      icon="video"
      :count="videosCount"
    />

    <BaseListCounterSection
      v-if="subscribersCount >= 0"
      class="counter-section"
      icon="subscriber"
      :count="subscribersCount"
    />
  </div>
</template>

<script>
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'

export default {
  name: 'CountersSection',
  components: {
    BaseListCounterSection
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    videosCount () {
      return this.channelData.videos_count
    },
    subscribersCount () {
      return this.channelData.subscribers_count
    }
  }
}
</script>

<style lang="sass" scoped>
.counters-section
  @extend .d-flex

.counter-section
  &:not(:first-child)
    margin-left: 0.75em
</style>
