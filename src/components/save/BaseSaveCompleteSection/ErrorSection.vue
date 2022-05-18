<template>
  <div
    ref="section"
    class="main-modal-import-section"
  >
    <ErrorMessage
      :scope="scope"
      :error-collection-count="errorCollectionCount"
    />

    <Component
      :is="listComponent"
      :[scope]="errorCollection"
      @focus="handleFocus"
    />
  </div>

  <RetryButton
    class="fluid retry-button"
    icon="redo alternate"
    @click="handleRetryButtonClick"
  />
</template>

<script>
import ErrorMessage from './ErrorSection/ErrorMessage.vue'
import ArtistsList from './ErrorSection/ArtistsList.vue'
import AlbumsList from './ErrorSection/AlbumsList.vue'
import TracksList from './ErrorSection/TracksList.vue'
import RetryButton from './ErrorSection/RetryButton.vue'

export default {
  name: 'ErrorSection',
  components: {
    ErrorMessage,
    ArtistsList,
    AlbumsList,
    TracksList,
    RetryButton
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
  data () {
    return {
      listComponents: {
        artists: 'ArtistsList',
        albums: 'AlbumsList',
        tracks: 'TracksList'
      }
    }
  },
  computed: {
    errorCollectionCount () {
      return this.errorCollection.length
    },
    listComponent () {
      return this.listComponents[
        this.scope
      ]
    }
  },
  methods: {
    handleRetryButtonClick () {
      this.retry(
        this.errorCollection
      )
    },
    handleFocus () {
      this.focus()
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
