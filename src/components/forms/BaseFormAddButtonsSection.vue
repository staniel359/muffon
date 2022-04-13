<template>
  <div class="add-buttons-container">
    <BaseButtonsContainer class="basic">
      <TracksButton
        :tracks="tracks"
        @change="handleTracksChange"
      />

      <ImagesButton
        :images="images"
        @change="handleImagesChange"
      />
    </BaseButtonsContainer>
  </div>
</template>

<script>
import BaseButtonsContainer
  from '*/components/containers/buttons/BaseButtonsContainer.vue'
import TracksButton from './BaseFormAddButtonsSection/TracksButton.vue'
import ImagesButton from './BaseFormAddButtonsSection/ImagesButton.vue'

export default {
  name: 'BaseFormAddButtonsSection',
  components: {
    BaseButtonsContainer,
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
