<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="images"
    scope="images"
    :clientPageLimit="40"
    :responsePageLimit="40"
  >
    <template #default="slotProps">
      <ImagesList
        :images="slotProps.images"
        :modal="modal"
        :mainSlider="mainSlider"
      />

      <BaseArtistImageModal
        :images="slotProps.images"
        @init="handleModalInit"
        @mainSliderInit="handleMainSliderInit"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import ImagesList from './ImagesPage/ImagesList.vue'
import BaseArtistImageModal from '@/models/artist/BaseArtistImageModal.vue'

export default {
  name: 'ImagesPage',
  components: {
    BaseArtistPaginatedPageContainer,
    ImagesList,
    BaseArtistImageModal
  },
  data () {
    return {
      modal: null,
      mainSlider: null
    }
  },
  methods: {
    handleModalInit (el) {
      this.modal = el
    },
    handleMainSliderInit (el) {
      this.mainSlider = el
    }
  }
}
</script>

<style lang="sass" scoped></style>
