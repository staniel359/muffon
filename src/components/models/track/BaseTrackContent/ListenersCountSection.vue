<template>
  <div
    v-if="listenersCount"
    class="description middle-aligned"
  >
    <BaseCounterBar
      :count="listenersCount"
      :top-count="topTrackCount"
    />

    <BaseListCounterSection
      icon="listener"
      :count="listenersCount"
    />
  </div>
</template>

<script>
import BaseCounterBar from '@/components/BaseCounterBar.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'

export default {
  name: 'ListenersCountSection',
  components: {
    BaseCounterBar,
    BaseListCounterSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    topTrackCount: Number
  },
  computed: {
    listenersCount () {
      return this.trackData.listeners_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
