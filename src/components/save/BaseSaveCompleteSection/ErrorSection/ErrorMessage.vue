<template>
  <div class="main-top-section">
    <BaseMessage
      class="error"
      icon="error"
      :header="errorText"
    />
  </div>
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'ErrorMessage',
  components: {
    BaseMessage
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    errorCollectionCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      count: null
    }
  },
  computed: {
    errorText () {
      return this.$t(
        'save.error',
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$tc(
        `counters.accusative.${this.scope}`,
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
    }
  },
  beforeMount () {
    this.count =
      this.errorCollectionCount
  }
}
</script>

<style lang="sass" scoped></style>
