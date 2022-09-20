<template>
  <template
    v-if="description"
  >
    <BaseDivider />

    <BaseDescription
      :description="description"
      :is-more="isMore"
      @more-click="handleMoreClick"
    />

    <BaseTrackDescriptionModal
      v-if="isMore"
      ref="modal"
      :request-track-data="requestTrackData"
    />
  </template>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseDescription from '@/components/BaseDescription.vue'
import BaseTrackDescriptionModal
  from '@/components/modals/track/BaseTrackDescriptionModal.vue'

export default {
  name: 'BaseTrackDescription',
  components: {
    BaseDivider,
    BaseDescription,
    BaseTrackDescriptionModal
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    requestTrackData: Object
  },
  computed: {
    description () {
      return this.trackData.description
    },
    isMore () {
      return this.trackData.with_more?.description
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
