<template>
  <BaseImportErrorSection
    ref="section"
    scope="artists"
    :error-collection="errorArtists"
  >
    <ArtistsList
      :artists="errorArtists"
      @change="handleArtistsChange"
      @focus="handleFocus"
    />
  </BaseImportErrorSection>
</template>

<script>
import BaseImportErrorSection
  from '*/components/sections/import/BaseImportErrorSection.vue'
import ArtistsList from '../../../lists/ArtistsList.vue'

export default {
  name: 'ErrorSection',
  components: {
    BaseImportErrorSection,
    ArtistsList
  },
  inject: [
    'setErrorArtists'
  ],
  props: {
    errorArtists: Array
  },
  methods: {
    handleFocus () {
      this.focus()
    },
    handleArtistsChange (
      value
    ) {
      this.setErrorArtists(
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
