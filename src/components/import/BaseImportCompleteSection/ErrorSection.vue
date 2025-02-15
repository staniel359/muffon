<template>
  <div class="main-modal-import-section">
    <div>
      <BaseMessage
        :header="errorText"
        :list-items="collection"
        is-error
      />
    </div>
  </div>
</template>

<script>
import BaseMessage from '@/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '@/helpers/formatters'

export default {
  name: 'ErrorSection',
  components: {
    BaseMessage
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    collection: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    errorText () {
      return this.$t(
        `import.error.${this.scope}`,
        {
          counter: this.counterText
        }
      )
    },
    counterText () {
      return this.$t(
        `counters.nominative.${this.scope}`,
        this.collectionCount,
        {
          count: this.collectionCountFormatted
        }
      )
    },
    collectionCount () {
      return this.collection.length
    },
    collectionCountFormatted () {
      return formatNumber(
        this.collectionCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
