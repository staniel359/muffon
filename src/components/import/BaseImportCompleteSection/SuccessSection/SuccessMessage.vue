<template>
  <div class="main-top-section">
    <BaseMessage
      class="success"
      icon="success"
      :header="successHeaderText"
      :content="successContentText"
    />
  </div>
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'SuccessMessage',
  components: {
    BaseMessage
  },
  props: {
    collectionCount: {
      type: Number,
      required: true
    },
    scope: {
      type: String,
      required: true
    }
  },
  computed: {
    successHeaderText () {
      return this.$tc(
        'import.success.header',
        this.count,
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$tc(
        `counters.nominative.${this.scope}`,
        this.count,
        {
          count: this.countFormatted
        }
      )
    },
    countFormatted () {
      return formatNumber(
        this.count
      )
    },
    successContentText () {
      return this.$t(
        'import.success.content'
      )
    }
  },
  beforeMount () {
    this.count = this.collectionCount
  }
}
</script>

<style lang="sass" scoped></style>
