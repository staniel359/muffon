<template>
  <LinkOption
    v-if="libraryId"
    :library-id="libraryId"
    @click="handleLinkClick"
  />
  <AddOption
    v-else
    :artist-data="artistData"
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
    libraryId: Number,
    artistData: Object
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
