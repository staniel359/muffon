<template>
  <div class="add-buttons">
    <TracksButton
      :tracks="tracks"
      @change="handleTracksChange"
    />

    <ImagesButton
      :images="images"
      @change="handleImagesChange"
    />
  </div>
</template>

<script>
import TracksButton from './BasePostAddButtonsSection/TracksButton.vue'
import ImagesButton from './BasePostAddButtonsSection/ImagesButton.vue'

export default {
  name: 'BasePostAddButtonsSection',
  components: {
    TracksButton,
    ImagesButton
  },
  props: {
    tracks: Array,
    images: Array
  },
  emits: [
    'tracksChange',
    'imagesChange'
  ],
  methods: {
    handleTracksChange (value) {
      this.$emit(
        'tracksChange',
        value
      )
    },
    handleImagesChange (value) {
      this.$emit(
        'imagesChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
