<template>
  <slot
    v-if="isError"
  />
  <BaseMessage
    v-else
    class="success"
    :icons="[
      'check'
    ]"
    :header="successText"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'BaseImportCompleteSectionContainer',
  components: {
    BaseMessage
  },
  props: {
    model: String,
    scope: String,
    isError: Boolean,
    totalCount: Number
  },
  computed: {
    successText () {
      return this.$t(
        this.successTextKey,
        {
          count: this.totalCountFormatted
        }
      )
    },
    successTextKey () {
      return [
        'save.success',
        this.model,
        this.scope
      ].filter(
        e => e
      ).join(
        '.'
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
