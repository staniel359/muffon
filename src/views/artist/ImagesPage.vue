<template>
  <BaseArtistPaginatedPageContainer
    pageNameKey="images"
    scope="images"
    :artistName="artistName"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
import BaseArtistImageModal from '@/modals/artist/BaseArtistImageModal.vue'

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
      limit: 40
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
