<template>
  <BaseSegmentContainer
    v-if="listenersCount"
    class="listeners-segment"
  >
    <BaseListenersCountSection
      :listeners-count="listenersCount"
      @click="handleListenersCountClick"
    />

    <BaseArtistListenersModal
      ref="modal"
      :artist-name="artistName"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseListenersCountSection
  from '@/components/sections/BaseListenersCountSection.vue'
import BaseArtistListenersModal
  from '@/components/modals/artist/BaseArtistListenersModal.vue'

export default {
  name: 'ListenersSegment',
  components: {
    BaseSegmentContainer,
    BaseListenersCountSection,
    BaseArtistListenersModal
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    listenersCount () {
      return this.artistData.profiles_count
    },
    artistName () {
      return this.artistData.name
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
.listeners-segment
  @extend .text-align-center
</style>
