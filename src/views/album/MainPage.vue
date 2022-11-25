<template>
  <BaseAlbumPageContainer
    ref="page"
    :source-params="sourceParams"
  >
    <template
      #default="pageSlotProps"
    >
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <BaseSearchButton
            scope="sources"
            :is-active="isShowSourceSelect"
            @click="handleSearchButtonClick"
          />

          <BaseAlbumSourceSelect
            v-if="isSourceSelectCalled"
            v-show="isShowSourceSelect"
            class="source-select"
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
  from '@/components/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseAlbumSourceSelect
  from '@/components/models/album/BaseAlbumSourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseSegmentContainer,
    BaseSearchButton,
    BaseAlbumSourceSelect,
    LeftColumn,
    RightColumn
  },
  props: {
    artistName: String,
    albumTitle: String
  },
  data () {
    return {
      scrollable: null,
      isSourceSelectCalled: false,
      isShowSourceSelect: false
    }
  },
  computed: {
    sourceParams () {
      return {
        source: this.sourceData,
        artistName: this.artistName,
        albumTitle: this.albumTitle
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
        album_type: query.album_type,
        model: query.model,
        owner_id: query.owner_id,
        access_key: query.access_key
      }
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
    },
    handleSearchButtonClick () {
      this.isSourceSelectCalled = true

      this.isShowSourceSelect =
        !this.isShowSourceSelect
    }
  }
}
</script>

<style lang="sass" scoped>
.album-segment
  @extend .flex-full, .d-flex

.source-select
  margin-top: 1em
</style>
