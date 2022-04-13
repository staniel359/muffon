<template>
  <div
    ref="scrollable"
    class="main-modal-import-section"
  >
    <div class="main-library-modal-message-container">
      <BaseMessage
        class="error"
        :header="errorText"
      />
    </div>

    <AlbumsList
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
import BaseMessage from '*/components/messages/BaseMessage.vue'
import AlbumsList from '../../../lists/AlbumsList.vue'
import BaseRetryButton from '*/components/buttons/BaseRetryButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    AlbumsList,
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
    errorText () {
      return this.$t(
        'save.error.albums',
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
      return this.errorAlbums.length
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.$emit(
        'retry'
      )
    },
    handleFocus () {
      this.$refs
        .scrollable
        .scrollTo(
          0,
          0
        )
    },
    handleAlbumsChange (
      value
    ) {
      this.setErrorAlbums(
        [
          ...value
        ]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
