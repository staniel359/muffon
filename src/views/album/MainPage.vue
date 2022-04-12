<template>
  <BaseAlbumPageContainer
    :artistName="artistName"
    :albumTitle="albumTitle"
    :sourceParams="sourceParams"
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
          <AlbumSourceSelect
            :albumData="pageSlotProps.albumData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="album-segment"
          :isLoading="pageSlotProps.isLoading"
          :error="pageSlotProps.error"
          @init="handleInit"
          @refresh="pageSlotProps.refresh"
        >
          <template #default>
            <LeftColumn
              v-if="scrollable"
              :albumData="pageSlotProps.albumData"
              :scrollable="scrollable"
            />

            <RightColumn
              :albumData="pageSlotProps.albumData"
              :requestAlbumData="pageSlotProps.requestAlbumData"
              :profileId="pageSlotProps.profileId"
            />
          </template>
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
import AlbumSourceSelect from './MainPage/AlbumSourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseSegmentContainer,
    AlbumSourceSelect,
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
        sourceId: this.sourceId,
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
    sourceId () {
      return this.$route.query.source_id
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
    handleInit (el) {
      this.scrollable = el
    }
  }
}
</script>

<style lang="sass" scoped>
.album-segment
  @extend .flex-full, .d-flex
</style>
