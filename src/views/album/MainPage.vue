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
            :request-album-data="pageSlotProps.requestAlbumData"
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
  from '@/components/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
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
        source: this.sourceData,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        paramsData: this.paramsData
      }
    },
    sourceData () {
      const {
        query
      } = this.$route

      return {
        name: query.source,
        id: query.album_id,
        artist_id: query.artist_id,
        slug: query.slug,
        artist_slug: query.artist_slug,
        model: query.model,
        album_type: query.album_type
      }
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
