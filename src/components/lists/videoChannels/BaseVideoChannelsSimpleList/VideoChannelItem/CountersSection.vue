<template>
  <div
    v-if="isRender"
  >
    <BaseListCounterSection
      v-if="videosCount"
      class="main-inline-counter-section"
      icon="video"
      :count="videosCount"
    />

    <BaseListCounterSection
      v-if="subscribersCount"
      class="main-inline-counter-section"
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

<style lang="sass" scoped></style>
