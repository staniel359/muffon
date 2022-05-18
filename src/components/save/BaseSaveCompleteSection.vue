<template>
  <ErrorSection
    v-if="isError"
    :scope="scope"
    :error-collection="errorCollection"
  />
  <SuccessSection
    v-else-if="isSuccess"
    :model="model"
    :scope="scope"
    :success-collection-count="successCollectionCount"
  />
</template>

<script>
import ErrorSection from './BaseSaveCompleteSection/ErrorSection.vue'
import SuccessSection from './BaseSaveCompleteSection/SuccessSection.vue'

export default {
  name: 'BaseSaveCompleteSection',
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
    model: String,
    scope: String,
    successCollectionCount: Number
  },
  computed: {
    isError () {
      return !!this.errorCollection.length
    },
    isSuccess () {
      return !!this.successCollectionCount
    }
  }
}
</script>

<style lang="sass" scoped></style>
