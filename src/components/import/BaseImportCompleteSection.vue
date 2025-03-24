<template>
  <ErrorSection
    v-if="isError"
    :collection="errorCollection"
    :scope="textScope"
  />
  <SuccessSection
    v-else-if="isSuccess"
    :collection="successCollection"
    :scope="scope"
    :text-scope="textScope"
  />
  <BaseNoCollectionMessage
    v-else
    :scope="textScope"
  />
</template>

<script>
import ErrorSection from './BaseImportCompleteSection/ErrorSection.vue'
import SuccessSection from './BaseImportCompleteSection/SuccessSection.vue'
import BaseNoCollectionMessage
  from '@/components/messages/BaseNoCollectionMessage.vue'

export default {
  name: 'BaseImportCompleteSection',
  components: {
    ErrorSection,
    SuccessSection,
    BaseNoCollectionMessage
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
    scope: String,
    textScope: String
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
