<template>
  <div class="main-top-section">
    <BaseMessage
      :header="successText"
      is-success
    />
  </div>
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'SuccessSection',
  components: {
    BaseMessage
  },
  props: {
    model: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    successCollectionCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    successText () {
      return this.$t(
        `save.success.${this.model}.${this.scope}`,
        this.successCollectionCount,
        {
          named: {
            counter: this.counterText
          }
        }
      )
    },
    counterText () {
      return this.$t(
        `counters.nominative.${this.scope}`,
        this.successCollectionCount,
        {
          count: this.successCollectionCountFormatted
        }
      )
    },
    successCollectionCountFormatted () {
      return formatNumber(
        this.successCollectionCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
