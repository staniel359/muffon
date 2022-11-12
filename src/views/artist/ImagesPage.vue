<template>
  <BaseArtistPaginatedPageContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <ImagesList
        :images="slotProps[scope]"
        @image-click="handleImageClick"
      />

      <BaseArtistImageModal
        ref="modal"
        :images="slotProps[scope]"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import ImagesList from './ImagesPage/ImagesList.vue'
import BaseArtistImageModal
  from '@/components/modals/artist/BaseArtistImageModal.vue'

export default {
  name: 'ImagesPage',
  components: {
    BaseArtistPaginatedPageContainer,
    ImagesList,
    BaseArtistImageModal
  },
  props: {
    artistName: String
  },
  data () {
    return {
      limit: 40,
      scope: 'images'
    }
  },
  methods: {
    async handleImageClick (
      index
    ) {
      this.goToSlide(
        index
      )

      await this.$nextTick()

      this.showModal()
    },
    goToSlide (
      index
    ) {
      this.$refs
        .modal
        .goToSlide(
          index
        )
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
