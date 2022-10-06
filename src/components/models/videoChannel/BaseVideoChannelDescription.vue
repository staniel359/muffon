<template>
  <BaseDescriptionSection
    :description="description"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BaseVideoChannelDescriptionModal
    v-if="isMore"
    ref="modal"
    :channel-id="channelId"
  />
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseVideoChannelDescriptionModal
  from '@/components/modals/videoChannel/BaseVideoChannelDescriptionModal.vue'

export default {
  name: 'BaseVideoChannelDescription',
  components: {
    BaseDescriptionSection,
    BaseVideoChannelDescriptionModal
  },
  props: {
    channelData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.channelData.description
    },
    isMore () {
      return this.channelData.with_more?.description
    },
    channelId () {
      return this.channelData.source.id
    }
  },
  methods: {
    handleMoreClick () {
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

<style lang="sass" scoped></style>
