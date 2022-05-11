<template>
  <ArtistsSection
    :recommendation-data="artistData"
  />

  <BaseRecommendationDeleteModal
    ref="deleteModal"
    :recommendation-data="artistData"
    @success="handleDeleted"
  />
</template>

<script>
import ArtistsSection from './RecommendationSection/ArtistsSection.vue'
import BaseRecommendationDeleteModal
  from '*/components/modals/recommendation/BaseRecommendationDeleteModal.vue'

export default {
  name: 'RecommendationSection',
  components: {
    ArtistsSection,
    BaseRecommendationDeleteModal
  },
  inject: {
    findPaginationItem: {
      default: () => false
    }
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.artistData.uuid
    }
  },
  methods: {
    handleDeleted () {
      this.paginationItem
        .isDeleted = true
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
