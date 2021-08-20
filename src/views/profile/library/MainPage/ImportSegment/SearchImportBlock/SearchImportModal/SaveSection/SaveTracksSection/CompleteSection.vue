<template>
  <div class="main-library-modal-complete-section">
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
      :header="successMessageHeaderFormatted"
    />
  </div>
</template>

<script>
import RetrySection from './CompleteSection/RetrySection.vue'
import BaseMessage from '@/BaseMessage.vue'
import { localize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

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
    successMessageHeaderFormatted () {
      return localize(
        'pages.library.add.search.success.save.header.tracks',
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
