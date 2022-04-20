<template>
  <BaseImportErrorSection
    ref="section"
    scope="albums"
    :error-collection="errorAlbums"
  >
    <AlbumsList
      :albums="errorAlbums"
      @change="handleAlbumsChange"
      @focus="handleFocus"
    />
  </BaseImportErrorSection>
</template>

<script>
import BaseImportErrorSection
  from '*/components/sections/import/BaseImportErrorSection.vue'
import AlbumsList from '../../../lists/AlbumsList.vue'

export default {
  name: 'ErrorSection',
  components: {
    BaseImportErrorSection,
    AlbumsList
  },
  inject: [
    'setErrorAlbums'
  ],
  props: {
    errorAlbums: Array
  },
  methods: {
    handleFocus () {
      this.focus()
    },
    handleAlbumsChange (
      value
    ) {
      this.setErrorAlbums(
        [
          ...value
        ]
      )
    },
    focus () {
      this.$refs
        .section
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
