<template>
  <BaseAlbumPageContainer
    ref="page"
    :source-params="sourceParams"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <SourceSelect
            :album-data="pageSlotProps.albumData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="album-segment"
          :is-loading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          @init="handleInit"
          @refresh="handleRefresh"
        >
          <LeftColumn
            v-if="scrollable"
            :album-data="pageSlotProps.albumData"
            :scrollable="scrollable"
          />

          <RightColumn
            :album-data="pageSlotProps.albumData"
            :request-album-data="pageSlotProps.requestAlbumData"
          />
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseAlbumPageContainer>
</template>

<script>
import BaseAlbumPageContainer
  from '*/components/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import SourceSelect from './MainPage/SourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseSegmentContainer,
    SourceSelect,
    LeftColumn,
    RightColumn
  },
  props: {
    artistName: String,
    albumTitle: String
  },
  data () {
    return {
      scrollable: null
    }
  },
  computed: {
    sourceParams () {
      return {
        source: this.source,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        albumId: this.albumId,
        artistId: this.artistId,
        album: this.album,
        artist: this.artist,
        model: this.model,
        albumType: this.albumType,
        paramsData: this.paramsData
      }
    },
    source () {
      return this.$route.query.source
    },
    albumId () {
      return this.$route.query.album_id
    },
    artistId () {
      return this.$route.query.artist_id
    },
    album () {
      return this.$route.query.album
    },
    artist () {
      return this.$route.query.artist
    },
    model () {
      return this.$route.query.model
    },
    albumType () {
      return this.$route.query.album_type
    },
    paramsData () {
      return JSON.parse(
        this.$route.query.params_data || '{}'
      )
    }
  },
  methods: {
    handleInit (
      element
    ) {
      this.scrollable = element
    },
    handleRefresh () {
      this.$refs
        .page
        .getData()
    }
  }
}
</script>

<style lang="sass" scoped>
.album-segment
  @extend .flex-full, .d-flex
</style>
