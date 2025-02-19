<template>
  <BaseDescriptionSection
    :description="description"
    :is-more="isMore"
    @more-click="handleMoreClick"
  />

  <BaseCommunityDescriptionModal
    v-if="isMore"
    ref="modal"
    :community-id="communityId"
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
    description () {
      return this.communityData.description
    },
    isMore () {
      return !!this.communityData.with_more?.description
    },
    communityId () {
      return this.communityData.id.toString()
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
