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

    <SearchArtistsList
      :artists="errorArtists"
      @change="handleArtistsChange"
      @focus="handleFocus"
    />
  </div>

  <BaseRetryButton
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/messages/BaseMessage.vue'
import SearchArtistsList from '../../../lists/SearchArtistsList.vue'
import BaseRetryButton from '@/buttons/BaseRetryButton.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    SearchArtistsList,
    BaseRetryButton
  },
  inject: [
    'setErrorArtists'
  ],
  props: {
    errorArtists: {
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
        'shared.add.save.error.artists',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    errorArtistsData () {
      return {
        page: 1,
        total_pages: 1,
        artists: this.errorArtists
      }
    },
    totalCount () {
      return this.errorArtists.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit('retry')
    },
    handleFocus () {
      this.$refs.scrollable.scrollTo(0, 0)
    },
    handleArtistsChange ({ scope }, value) {
      this.setErrorArtists(
        [...value]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
