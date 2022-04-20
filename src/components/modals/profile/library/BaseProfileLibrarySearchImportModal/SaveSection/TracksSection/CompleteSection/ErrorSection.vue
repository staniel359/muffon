<template>
  <BaseImportErrorSection
    ref="section"
    scope="tracks"
    :error-collection="errorTracks"
  >
    <TracksList
      :tracks="errorTracks"
      @change="handleTracksChange"
      @focus="handleFocus"
    />
  </BaseImportErrorSection>
</template>

<script>
import BaseImportErrorSection
  from '*/components/sections/import/BaseImportErrorSection.vue'
import TracksList from '../../../lists/TracksList.vue'

export default {
  name: 'ErrorSection',
  components: {
    BaseImportErrorSection,
    TracksList
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
