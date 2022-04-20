<template>
  <BaseImportErrorSection
    ref="section"
    scope="tracks"
    :error-collection="errorTracks"
  >
    <SearchList
      :tracks="errorTracks"
      @change="handleTracksChange"
      @focus="handleFocus"
    />
  </BaseImportErrorSection>
</template>

<script>
import BaseImportErrorSection
  from '*/components/sections/import/BaseImportErrorSection.vue'
import SearchList from '../../SearchList.vue'

export default {
  name: 'ErrorSection',
  components: {
    BaseImportErrorSection,
    SearchList
  },
  inject: [
    'setErrorTracks'
  ],
  props: {
    errorTracks: Array
  },
  methods: {
    handleFocus () {
      this.focus()
    },
    handleTracksChange (
      value
    ) {
      this.setErrorTracks(
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
