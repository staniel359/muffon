<template>
  <BaseAlbumPageContainer
    ref="page"
    :source-params="sourceParams"
  >
    <template
      #default="slotProps"
    >
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <SourceSelectSegment
          :album-data="slotProps.albumData"
        />

        <AlbumSegment
          :album-data="slotProps.albumData"
          :request-album-data="slotProps.requestAlbumData"
          :is-loading="slotProps.isLoading"
          :error="slotProps.error"
          @refresh="handleRefresh"
        />
      </div>
    </template>
  </BaseAlbumPageContainer>
</template>

<script>
import BaseAlbumPageContainer
  from '@/components/containers/pages/album/BaseAlbumPageContainer.vue'
import SourceSelectSegment from './MainPage/SourceSelectSegment.vue'
import AlbumSegment from './MainPage/AlbumSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    SourceSelectSegment,
    AlbumSegment
  },
  props: {
    artistName: String,
    albumTitle: String
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
    handleRefresh () {
      this.$refs
        .page
        .getData()
    }
  }
}
</script>

<style lang="sass" scoped></style>
