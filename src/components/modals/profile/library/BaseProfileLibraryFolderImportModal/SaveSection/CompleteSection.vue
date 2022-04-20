<template>
  <BaseImportCompleteSectionContainer
    model="library"
    scope="tracks"
    :is-error="isError"
    :total-count="totalCount"
  >
    <ErrorSection
      :error-files="errorFiles"
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
    errorFiles: {
      type: Array,
      default () {
        return []
      }
    },
    totalCount: Number
  },
  computed: {
    isError () {
      return !!this.errorFiles.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
