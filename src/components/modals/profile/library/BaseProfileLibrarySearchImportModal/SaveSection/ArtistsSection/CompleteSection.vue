<template>
  <template v-if="isError">
    <RetrySection
      v-if="errorArtists.length"
      :error-artists="errorArtists"
      @retry="handleRetryButtonClick"
    />
  </template>

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
import RetrySection from './CompleteSection/RetrySection.vue'
import BaseMessage from '*/components/messages/BaseMessage.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'CompleteSection',
  components: {
    RetrySection,
    BaseMessage
  },
  props: {
    isError: Boolean,
    totalCount: Number,
    errorArtists: Array
  },
  emits: [
    'retry'
  ],
  computed: {
    successText () {
      return this.$t(
        'save.success.library.artists',
        {
          count: this.totalCountFormatted
        }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit(
        'retry'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
