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

  <BaseProfileLibraryRetryButton
    class="fluid retry-button"
    icon="redo alternate"
    :text="retryFormatted"
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/BaseMessage.vue'
import SearchTracksList from '../../../lists/SearchTracksList.vue'
import BaseProfileLibraryRetryButton
  from '@/models/profile/library/BaseProfileLibraryRetryButton.vue'
import { localize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    SearchTracksList,
    BaseProfileLibraryRetryButton
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
      return localize(
        'pages.library.add.save.error.tracks',
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
