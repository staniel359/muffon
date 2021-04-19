<template>
  <BasePaginatedPageContainer
    pageNameKey="images"
    scope="images"
    :clientPageLimit="40"
    :responsePageLimit="40"
  >
    <template #default="pageSlotProps">
      <ImagesList
        :images="pageSlotProps.images"
        :modal="modal"
        :mainSlider="mainSlider"
      />

      <BaseArtistImageModal
        :images="pageSlotProps.images"
        @init="handleModalInit"
        @mainSliderInit="handleMainSliderInit"
      />
    </template>
  </BasePaginatedPageContainer>
</template>

<script>
import BasePaginatedPageContainer
  from '@/containers/pages/artist/BasePaginatedPageContainer.vue'
import ImagesList from './ImagesPage/ImagesList.vue'
import BaseArtistImageModal from '@/models/artist/BaseArtistImageModal.vue'

export default {
  name: 'ImagesPage',
  components: {
    BasePaginatedPageContainer,
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
