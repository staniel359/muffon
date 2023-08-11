<template>
  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="save"
    :scope="scope"
    @complete="handleProgressComplete"
  />
  <BaseSaveCompleteSection
    v-else
    model="favorites"
    :scope="scope"
    :error-collection="errorCollection"
    :success-collection-count="successCollectionCount"
  />
</template>

<script>
import BaseProgress from '@/components/BaseProgress.vue'
import BaseSaveCompleteSection
  from '@/components/save/BaseSaveCompleteSection.vue'
import createFavoriteTrack from '@/helpers/actions/api/favorite/track/create'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'SaveSection',
  components: {
    BaseProgress,
    BaseSaveCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    collection: {
      type: Array,
      default () {
        return []
      }
    },
    scope: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isMounted: false,
      isProgress: true,
      isComplete: false,
      successCollection: [],
      errorCollection: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    collectionCount () {
      return this.collection.length
    },
    successCollectionCount () {
      return this.successCollection.length
    },
    isTracksScope () {
      return (
        this.scope === 'tracks'
      )
    }
  },
  watch: {
    collection: 'handleCollectionChange'
  },
  mounted () {
    this.isMounted = true

    this.processCollection()
  },
  unmounted () {
    this.isMounted = false
  },
  methods: {
    createFavoriteTrack,
    async handleCollectionChange () {
      this.isProgress = true
      this.isComplete = false

      this.errorCollection = []

      await this.$nextTick()

      this.processCollection()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    async processCollection () {
      this.setProgressTotalCount()

      await this.saveCollection()

      this.isComplete = true
    },
    async saveCollection () {
      for (
        const collectionItem of this.collection
      ) {
        if (this.isMounted) {
          await this.saveCollectionItem(
            collectionItem
          )
        }
      }
    },
    async saveCollectionItem (
      collectionItem
    ) {
      const collectionItemFormatted =
        this.formatCollectionItem(
          collectionItem
        )

      const handleSuccess = () => {
        this.addCollectionItem(
          {
            collection: 'successCollection',
            item: collectionItem
          }
        )
      }

      const handleError = () => {
        this.addCollectionItem(
          {
            collection: 'errorCollection',
            item: collectionItem
          }
        )
      }

      const handleFinish = () => {
        this.incrementProgress()
      }

      await this.createFavorite(
        collectionItemFormatted
      ).then(
        handleSuccess
      ).catch(
        handleError
      ).finally(
        handleFinish
      )
    },
    formatCollectionItem (
      collectionItem
    ) {
      if (this.isTracksScope) {
        return this.formatTrack(
          collectionItem
        )
      }
    },
    formatTrack (
      trackData
    ) {
      const {
        title,
        artist,
        album,
        image,
        created,
        source,
        audio
      } = trackData

      const audioData = (
        audio && {
          present: audio.present
        }
      )

      return {
        trackTitle: title,
        artistName: artist.name,
        albumTitle: album?.title,
        imageUrl: image?.original,
        created,
        sourceData: source,
        audioData,
        albumSourceData: album?.source
      }
    },
    createFavorite (
      collectionItem
    ) {
      if (this.isTracksScope) {
        return this.createFavoriteTrack(
          collectionItem
        )
      }
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.collectionCount
        )
    },
    incrementProgress () {
      this.$refs
        .progress
        ?.increment()
    }
  }
}
</script>

<style lang="sass" scoped></style>
