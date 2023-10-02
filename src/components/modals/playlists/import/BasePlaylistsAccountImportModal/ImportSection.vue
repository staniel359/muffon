<template>
  <div
    v-if="error"
    class="main-top-section"
  >
    <BaseErrorMessage
      :error="error"
      is-with-refresh-button
      @refresh="handleRefresh"
    />
  </div>

  <BaseProgress
    v-if="isShowProgress"
    ref="progress"
    status="import"
    :scope="scope"
    @complete="handleProgressComplete"
  />
  <BaseImportCompleteSection
    v-else
    scope="playlists"
    text-scope="playlists"
    :success-collection="successPlaylists"
  />
</template>

<script>
import BaseErrorMessage from '@/components/messages/BaseErrorMessage.vue'
import BaseProgress from '@/components/BaseProgress.vue'
import BaseImportCompleteSection
  from '@/components/import/BaseImportCompleteSection.vue'
import getUser from '@/helpers/actions/api/user/get'
import {
  collection as formatCollection
} from '@/helpers/formatters'
import collectionMixin from '@/mixins/collectionMixin'

export default {
  name: 'ImportSection',
  components: {
    BaseErrorMessage,
    BaseProgress,
    BaseImportCompleteSection
  },
  mixins: [
    collectionMixin
  ],
  props: {
    source: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      userData: null,
      error: null,
      page: 1,
      isProgress: true,
      isComplete: false,
      collection: [],
      successPlaylists: []
    }
  },
  computed: {
    isShowProgress () {
      return (
        this.isProgress ||
          !this.isComplete
      )
    },
    userArgs () {
      return {
        source: this.source,
        scope: this.scope,
        page: this.page,
        limit: this.limit,
        isWithTracks: true
      }
    },
    isGetNextPageData () {
      return (
        this.page <
          this.totalPagesCount
      )
    },
    totalPagesCount () {
      return this.userData?.total_pages
    }
  },
  watch: {
    userData: 'handleUserDataChange',
    collection: 'handleCollectionChange'
  },
  mounted () {
    this.processCollection()
  },
  methods: {
    getUser,
    handleUserDataChange (
      value
    ) {
      const newCollection =
        value[
          this.scope
        ]

      this.collection = [
        ...this.collection,
        ...newCollection
      ]
    },
    handleCollectionChange (
      value
    ) {
      this.setProgressValue(
        value.length
      )

      if (this.isGetNextPageData) {
        this.page += 1

        this.getData()
      } else {
        this.successPlaylists =
          formatCollection(
            this.collection
          )

        this.isComplete = true
      }
    },
    handleRefresh () {
      this.getData()
    },
    handleProgressComplete () {
      this.isProgress = false
    },
    processCollection () {
      this.setProgressTotalCount()

      this.getData()
    },
    getData () {
      this.getUser(
        this.userArgs
      )
    },
    setProgressTotalCount () {
      this.$refs
        .progress
        .setTotalCount(
          this.totalCount
        )
    },
    setProgressValue (
      value
    ) {
      this.$refs
        .progress
        .setValue(
          value
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>
