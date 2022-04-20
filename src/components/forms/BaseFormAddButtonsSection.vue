<template>
  <div class="add-buttons-container">
    <div class="ui buttons">
      <TracksButton
        :tracks="tracks"
        @change="handleTracksChange"
      />

      <ImagesButton
        :images="images"
        @change="handleImagesChange"
      />
    </div>
  </div>
</template>

<script>
import TracksButton from './BaseFormAddButtonsSection/TracksButton.vue'
import ImagesButton from './BaseFormAddButtonsSection/ImagesButton.vue'

export default {
  name: 'BaseFormAddButtonsSection',
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
    handleTracksChange (
      value
    ) {
      this.$emit(
        'tracksChange',
        value
      )
    },
    handleImagesChange (
      value
    ) {
      this.$emit(
        'imagesChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
