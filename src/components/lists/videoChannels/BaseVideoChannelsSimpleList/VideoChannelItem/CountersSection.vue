<template>
  <div class="counters-section">
    <div class="counter-section">
      <BaseListCounterSection
        v-if="videosCount"
        icon="video"
        :count="videosCount"
      />
    </div>

    <div class="counter-section">
      <BaseListCounterSection
        v-if="subscribersCount"
        icon="subscriber"
        :count="subscribersCount"
      />
    </div>
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

[dir="ltr"]
  .counter-section
    &:not(:first-child)
      margin-left: 0.75em
[dir="rtl"]
  .counter-section
    &:not(:first-child)
      margin-right: 0.75em
</style>
