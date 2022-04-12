<template>
  <template v-if="isError">
    <RetrySection
      v-if="errorTracks.length"
      :errorTracks="errorTracks"
      @retry="handleRetryButtonClick"
    />
  </template>

  <BaseMessage
    v-else
    class="success"
    :icons="['check']"
    :header="successText"
  />
</template>

<script>
import RetrySection from './CompleteSection/RetrySection.vue'
import BaseMessage from '*/components/messages/BaseMessage.vue'
import { number as formatNumber } from '*/helpers/formatters'

export default {
  name: 'CompleteSection',
  components: {
    RetrySection,
    BaseMessage
  },
  props: {
    isError: Boolean,
    totalCount: Number,
    errorTracks: Array
  },
  emits: [
    'retry'
  ],
  computed: {
    successText () {
      return this.$t(
        'save.success.playlist.tracks',
        { count: this.totalCountFormatted }
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
      this.$emit('retry')
    }
  }
}
</script>

<style lang="sass" scoped></style>
