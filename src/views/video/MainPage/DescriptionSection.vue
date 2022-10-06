<template>
  <template v-if="description">
    <BaseDivider />

    <BaseDescriptionSection
      :description="description"
      :is-more="isMore"
      @more-click="handleMoreClick"
    />

    <BaseVideoDescriptionModal
      v-if="isMore"
      ref="modal"
      :video-id="videoId"
    />
  </template>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseVideoDescriptionModal
  from '@/components/modals/video/BaseVideoDescriptionModal.vue'

export default {
  name: 'DescriptionSection',
  components: {
    BaseDivider,
    BaseDescriptionSection,
    BaseVideoDescriptionModal
  },
  props: {
    videoData: {
      type: Object,
      required: true
    }
  },
  computed: {
    description () {
      return this.videoData.description
    },
    isMore () {
      return this.videoData.with_more?.description
    },
    videoId () {
      return this.videoData.source.id
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
