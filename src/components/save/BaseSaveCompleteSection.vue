<template>
  <SuccessSection
    v-if="isSuccess"
    :model="model"
    :scope="scope"
    :success-collection-count="successCollectionCount"
  />

  <ErrorSection
    v-if="isError"
    :scope="scope"
    :error-collection="errorCollection"
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
    isSuccess () {
      return !!this.successCollectionCount
    },
    isError () {
      return !!this.errorCollection.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
