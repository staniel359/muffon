<template>
  <BaseImportCompleteSectionContainer
    model="playlist"
    scope="tracks"
    :is-error="isError"
    :total-count="totalCount"
  >
    <ErrorSection
      :error-tracks="errorTracks"
    />
  </BaseImportCompleteSectionContainer>
</template>

<script>
import BaseImportCompleteSectionContainer
  from '*/components/containers/sections/import/BaseImportCompleteSectionContainer.vue'
import ErrorSection from './CompleteSection/ErrorSection.vue'

export default {
  name: 'CompleteSection',
  components: {
    BaseImportCompleteSectionContainer,
    ErrorSection
  },
  props: {
    errorTracks: {
      type: Array,
      default () {
        return []
      }
    },
    totalCount: Number
  },
  computed: {
    isError () {
      return !!this.errorTracks.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
