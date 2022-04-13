<template>
  <BaseAlbumReleaseDateLabels
    :release-date="releaseDate"
    :labels="labels"
  />

  <BaseCounters
    :listeners-count="listenersCount"
    :plays-count="playsCount"
  />

  <BaseAlbumTags
    v-if="tags?.length"
    :tags="tags"
    :request-album-data="requestAlbumData"
    :is-more="isMoreTags"
  />

  <template v-if="description">
    <BaseDivider />

    <BaseAlbumDescription
      :description="description"
      :request-album-data="requestAlbumData"
      :is-more="isMoreDescription"
    />
  </template>
</template>

<script>
import BaseAlbumReleaseDateLabels
  from '*/components/models/album/BaseAlbumReleaseDateLabels.vue'
import BaseAlbumTags from '*/components/models/album/BaseAlbumTags.vue'
import BaseCounters from '*/components/BaseCounters.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseAlbumDescription
  from '*/components/models/album/BaseAlbumDescription.vue'

export default {
  name: 'SecondarySection',
  components: {
    BaseAlbumReleaseDateLabels,
    BaseAlbumTags,
    BaseCounters,
    BaseDivider,
    BaseAlbumDescription
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    releaseDate () {
      return this.albumData.release_date
    },
    labels () {
      return this.albumData.labels
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    playsCount () {
      return this.albumData.plays_count
    },
    tags () {
      return this.albumData.tags
    },
    isMoreTags () {
      return this.albumData.with_more?.tags
    },
    description () {
      return this.albumData.description
    },
    isMoreDescription () {
      return this.albumData.with_more?.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
