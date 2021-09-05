<template>
  <div class="main-library-modal-complete-section">
    <BaseMessage
      v-if="isError"
      class="error"
      :header="errorMessageHeaderFormatted"
      :listItems="errorFiles"
    />
    <SuccessSection
      v-else-if="successFiles.length"
      :files="successFiles"
    />
  </div>
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import SuccessSection from './CompleteSection/SuccessSection.vue'
import { localize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

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
    errorMessageHeaderFormatted () {
      return localize(
        'pages.library.add.import.error.files',
        { count: this.totalCountFormatted }
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
