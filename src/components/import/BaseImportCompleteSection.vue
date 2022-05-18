<template>
  <ErrorSection
    v-if="isError"
    :collection="errorCollection"
    :scope="scope"
  />
  <SuccessSection
    v-else-if="isSuccess"
    :collection="successCollection"
    :scope="scope"
  />
</template>

<script>
import ErrorSection from './BaseImportCompleteSection/ErrorSection.vue'
import SuccessSection from './BaseImportCompleteSection/SuccessSection.vue'

export default {
  name: 'BaseImportCompleteSection',
  components: {
    ErrorSection,
    SuccessSection
  },
  props: {
    errorCollection: {
      type: Array,
      default () {
        return []
      }
    },
    successCollection: {
      type: Array,
      default () {
        return []
      }
    },
    scope: String
  },
  computed: {
    isError () {
      return !!this.errorCollection.length
    },
    isSuccess () {
      return !!this.successCollection.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
