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

    <ArtistsList
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
import BaseMessage from '*/components/messages/BaseMessage.vue'
import ArtistsList from '../../../lists/ArtistsList.vue'
import BaseRetryButton from '*/components/buttons/BaseRetryButton.vue'
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'RetrySection',
  components: {
    BaseMessage,
    ArtistsList,
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
    errorText () {
      return this.$t(
        'save.error.artists',
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
      return this.errorArtists.length
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
    handleArtistsChange (
      value
    ) {
      this.setErrorArtists(
        [
          ...value
        ]
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
