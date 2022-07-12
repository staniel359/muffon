<template>
  <LinkOption
    v-if="libraryId"
    :library-id="libraryId"
    @click="handleLinkClick"
  />
  <AddOption
    v-else
    :artist-name="artistName"
    :track-title="trackTitle"
    :album-title="albumTitle"
    :image-url="imageUrl"
  />
</template>

<script>
import LinkOption from './LibraryOption/LinkOption.vue'
import AddOption from './LibraryOption/AddOption.vue'

export default {
  name: 'LibraryOption',
  components: {
    LinkOption,
    AddOption
  },
  props: {
    libraryId: String,
    artistName: String,
    trackTitle: String,
    albumTitle: String,
    imageUrl: String
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
