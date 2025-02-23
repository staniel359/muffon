<template>
  <BaseDescriptionSection
    :description="descriptionTruncated"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BaseCommunityDescriptionModal
    v-if="isMore"
    ref="modal"
    :description="description"
  />
</template>

<script>
import BaseDescriptionSection
  from '@/components/sections/BaseDescriptionSection.vue'
import BaseCommunityDescriptionModal
  from '@/components/modals/community/BaseCommunityDescriptionModal.vue'

export default {
  name: 'BaseCommunityDescription',
  components: {
    BaseDescriptionSection,
    BaseCommunityDescriptionModal
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  computed: {
    descriptionTruncated () {
      return this.communityData.description_truncated
    },
    isMore () {
      return !!this.communityData.with_more?.description
    },
    description () {
      return this.communityData.description
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
