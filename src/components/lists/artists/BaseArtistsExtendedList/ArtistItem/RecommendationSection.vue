<template>
  <ProfileArtistsSection
    :recommendation-data="artistData"
    :profile-id="profileId"
  />

  <BaseRecommendationDeleteModal
    ref="deleteModal"
    :recommendation-data="artistData"
    @success="handleDeleted"
  />
</template>

<script>
import ProfileArtistsSection
  from './RecommendationSection/ProfileArtistsSection.vue'
import BaseRecommendationDeleteModal
  from '*/components/modals/recommendation/BaseRecommendationDeleteModal.vue'

export default {
  name: 'RecommendationSection',
  components: {
    ProfileArtistsSection,
    BaseRecommendationDeleteModal
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: String
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
