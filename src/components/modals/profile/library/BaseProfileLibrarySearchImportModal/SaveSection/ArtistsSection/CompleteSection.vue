<template>
  <BaseImportCompleteSectionContainer
    model="library"
    scope="artists"
    :is-error="isError"
    :total-count="totalCount"
  >
    <ErrorSection
      :error-artists="errorArtists"
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
    errorArtists: {
      type: Array,
      default () {
        return []
      }
    },
    totalCount: Number
  },
  computed: {
    isError () {
      return !!this.errorArtists.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
