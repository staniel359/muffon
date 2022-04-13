<template>
  <BaseMessage
    v-if="isError"
    class="error"
    :header="errorText"
    :list-items="errorFiles"
  />
  <SuccessSection
    v-else-if="successFiles.length"
    :files="successFiles"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'
import SuccessSection from './CompleteSection/SuccessSection.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'CompleteSection',
  components: {
    BaseMessage,
    SuccessSection
  },
  props: {
    isError: Boolean,
    errorFiles: Array,
    successFiles: Array
  },
  computed: {
    errorText () {
      return this.$t(
        'import.error.files',
        {
          count: this.totalCountFormatted
        }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    totalCount () {
      return this.errorFiles.length
    }
  }
}
</script>

<style lang="sass" scoped></style>
