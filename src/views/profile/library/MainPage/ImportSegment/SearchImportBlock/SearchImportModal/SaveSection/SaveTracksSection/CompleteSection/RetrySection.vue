<template>
  <div
    class="main-library-modal-retry-section"
    ref="scrollable"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="messageHeaderFormatted"
      />
    </div>

    <SearchTracksList
      :tracks="errorTracks"
      @change="handleTracksChange"
      @focus="handleFocus"
    />
  </div>

  <BaseRetryButton
    class="fluid retry-button"
    icon="redo alternate"
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import SearchTracksList from '../../../lists/SearchTracksList.vue'
import BaseRetryButton from '@/BaseRetryButton.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    SearchTracksList,
    BaseRetryButton
  },
  inject: [
    'setErrorTracks'
  ],
  props: {
    errorTracks: {
      type: Array,
      required: true
    }
  },
  emits: [
    'retry'
  ],
  computed: {
    messageHeaderFormatted () {
      return this.$t(
        'shared.add.save.error.tracks',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    errorTracksData () {
      return {
        page: 1,
        total_pages: 1,
        tracks: this.errorTracks
      }
    },
    totalCount () {
      return this.errorTracks.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit('retry')
    },
    handleFocus () {
      this.$refs.scrollable.scrollTo(0, 0)
    },
    handleTracksChange ({ scope }, value) {
      this.setErrorTracks(
        [...value]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
