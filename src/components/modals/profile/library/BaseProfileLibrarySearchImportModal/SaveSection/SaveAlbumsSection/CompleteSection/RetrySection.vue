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

    <SearchAlbumsList
      :albums="errorAlbums"
      @change="handleAlbumsChange"
      @focus="handleFocus"
    />
  </div>

  <BaseRetryButton
    @click="handleRetryButtonClick"
  />
</template>

<script>
import BaseMessage from '@/messages/BaseMessage.vue'
import SearchAlbumsList from '../../../lists/SearchAlbumsList.vue'
import BaseRetryButton from '@/buttons/BaseRetryButton.vue'
import { number as formatNumber } from '#/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    SearchAlbumsList,
    BaseRetryButton
  },
  inject: [
    'setErrorAlbums'
  ],
  props: {
    errorAlbums: {
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
        'shared.add.save.error.albums',
        { count: this.totalCountFormatted }
      )
    },
    totalCountFormatted () {
      return formatNumber(
        this.totalCount
      )
    },
    errorAlbumsData () {
      return {
        page: 1,
        total_pages: 1,
        albums: this.errorAlbums
      }
    },
    totalCount () {
      return this.errorAlbums.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit('retry')
    },
    handleFocus () {
      this.$refs.scrollable.scrollTo(0, 0)
    },
    handleAlbumsChange ({ scope }, value) {
      this.setErrorAlbums(
        [...value]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
