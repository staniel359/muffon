<template>
  <BaseArtistPaginatedPageContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <ImagesList
        :images="slotProps[scope]"
        :modal="modal"
        :main-slider="mainSlider"
      />

      <BaseArtistImageModal
        :images="slotProps[scope]"
        @init="handleModalInit"
        @main-slider-init="handleMainSliderInit"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '*/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import ImagesList from './ImagesPage/ImagesList.vue'
import BaseArtistImageModal
  from '*/components/modals/artist/BaseArtistImageModal.vue'

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
      modal: null,
      mainSlider: null,
      limit: 40,
      scope: 'images'
    }
  },
  methods: {
    handleModalInit (
      element
    ) {
      this.modal = element
    },
    handleMainSliderInit (
      element
    ) {
      this.mainSlider = element
    }
  }
}
</script>

<style lang="sass" scoped></style>
