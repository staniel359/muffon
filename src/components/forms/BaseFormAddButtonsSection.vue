<template>
  <div class="add-buttons-container">
    <div class="ui buttons">
      <MusicButton
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
      />

      <ImagesButton />

      <EmojiButton />
    </div>
  </div>
</template>

<script>
import MusicButton from './BaseFormAddButtonsSection/MusicButton.vue'
import ImagesButton from './BaseFormAddButtonsSection/ImagesButton.vue'
import EmojiButton from './BaseFormAddButtonsSection/EmojiButton.vue'

export default {
  name: 'BaseFormAddButtonsSection',
  components: {
    MusicButton,
    ImagesButton,
    EmojiButton
  },
  props: {
    artists: Array,
    albums: Array,
    tracks: Array,
    images: Array
  }
}
</script>

<style lang="sass" scoped></style>
