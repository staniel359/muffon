<template>
  <BaseAlbumPageContainer
    :artistName="artistName"
    :albumTitle="albumTitle"
    :sourceParams="sourceParams"
  >
    <template #default="slotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <AlbumSourceSelect
            :albumData="slotProps.albumData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="album-segment"
          :isLoading="slotProps.isLoading"
          :error="slotProps.error"
          @init="handleInit"
          @refresh="slotProps.handleRefresh"
        >
          <template #default>
            <LeftColumn
              v-if="scrollable"
              :albumData="slotProps.albumData"
              :scrollable="scrollable"
            />

            <RightColumn
              :albumData="slotProps.albumData"
              :requestAlbumData="slotProps.requestAlbumData"
              :profileId="slotProps.profileId"
            />
          </template>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseAlbumPageContainer>
</template>

<script>
import BaseAlbumPageContainer
  from '@/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
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
