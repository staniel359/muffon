<template>
  <BaseArtistPaginatedPageContainer
    :artistName="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <ImagesList
        :images="slotProps[scope]"
        :modal="modal"
        :mainSlider="mainSlider"
      />

      <BaseArtistImageModal
        :images="slotProps[scope]"
        @init="handleModalInit"
        @mainSliderInit="handleMainSliderInit"
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
