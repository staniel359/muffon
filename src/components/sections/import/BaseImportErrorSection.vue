<template>
  <div
    ref="section"
    class="main-modal-import-section"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="errorText"
      />
    </div>

    <slot />
  </div>

  <BaseRetryButton
    class="fluid retry-button"
    icon="redo alternate"
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '*/components/messages/BaseMessage.vue'
import BaseRetryButton from '*/components/buttons/BaseRetryButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'BaseImportErrorSection',
  components: {
    BaseMessage,
    BaseRetryButton
  },
  inject: [
    'retry'
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    errorCollection: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    errorText () {
      return this.$t(
        `save.error.${this.scope}`,
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
      return this.errorCollection.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.retry()
    },
    focus () {
      this.$refs
        .section
        .scrollTo(
          0,
          0
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
