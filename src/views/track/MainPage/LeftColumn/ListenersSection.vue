<template>
  <div
    v-if="listenersCount"
    class="listeners-section"
  >
    <BaseDivider />

    <BaseListenersCountSection
      :listeners-count="listenersCount"
      @click="handleListenersCountClick"
    />

    <BaseTrackListenersModal
      ref="modal"
      :request-track-data="requestTrackData"
    />
  </div>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseListenersCountSection
  from '@/components/BaseListenersCountSection.vue'
import BaseTrackListenersModal
  from '@/components/modals/track/BaseTrackListenersModal.vue'

export default {
  name: 'ListenersSection',
  components: {
    BaseDivider,
    BaseListenersCountSection,
    BaseTrackListenersModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  computed: {
    listenersCount () {
      return this.trackData.profiles_count
    },
    requestTrackData () {
      return {
        artistName: this.artistName,
        trackTitle: this.trackTitle
      }
    },
    artistName () {
      return this.trackData.artist.name
    },
    trackTitle () {
      return this.trackData.title
    }
  },
  methods: {
    handleListenersCountClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.listeners-section
  @extend .text-align-center
</style>
