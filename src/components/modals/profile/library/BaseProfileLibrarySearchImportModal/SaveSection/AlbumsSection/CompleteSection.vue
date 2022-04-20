<template>
  <BaseImportCompleteSectionContainer
    model="library"
    scope="albums"
    :is-error="isError"
    :total-count="totalCount"
  >
    <ErrorSection
      :error-albums="errorAlbums"
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
    errorAlbums: {
      type: Array,
      default () {
        return []
      }
    },
    totalCount: Number
  },
  computed: {
    isError () {
      return !!this.errorAlbums.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
