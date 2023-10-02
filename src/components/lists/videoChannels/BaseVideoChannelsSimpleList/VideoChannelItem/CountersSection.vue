<template>
  <div
    v-if="isRender"
  >
    <div
      v-if="videosCount"
      class="main-list-right-small-section counter-section"
    >
      <BaseListCounterSection
        icon="video"
        :count="videosCount"
      />
    </div>

    <div
      v-if="subscribersCount"
      class="main-list-right-small-section counter-section"
    >
      <BaseListCounterSection
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
    isRender () {
      return (
        this.videosCount ||
          this.subscribersCount
      )
    },
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
@import '@/assets/styles/Shared.sass'

.counter-section
  @extend .d-inline-block
  margin-bottom: 0.25rem
</style>
