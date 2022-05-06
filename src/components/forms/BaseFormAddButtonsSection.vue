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

      <EmojiButton
        @select="handleEmojiSelect"
      />
    </div>
  </div>
</template>

<script>
import TracksButton from './BaseFormAddButtonsSection/TracksButton.vue'
import ImagesButton from './BaseFormAddButtonsSection/ImagesButton.vue'
import EmojiButton from './BaseFormAddButtonsSection/EmojiButton.vue'

export default {
  name: 'BaseFormAddButtonsSection',
  components: {
    TracksButton,
    ImagesButton,
    EmojiButton
  },
  props: {
    tracks: Array,
    images: Array
  },
  emits: [
    'tracksChange',
    'imagesChange',
    'emojiSelect'
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
    },
    handleEmojiSelect (
      value
    ) {
      this.$emit(
        'emojiSelect',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
