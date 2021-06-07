<template>
  <BaseReleaseDateLabels
    :release_date="release_date"
    :labels="labels"
  />

  <BaseCounters
    :listenersCount="listenersCount"
    :playsCount="playsCount"
  />

  <BaseAlbumTags
    v-if="tags"
    :tags="tags"
    :requestAlbumData="requestAlbumData"
    :isMore="isMoreTags"
  />

  <template v-if="description">
    <BaseDivider />

    <BaseAlbumDescription
      :description="description"
      :requestAlbumData="requestAlbumData"
      :isMore="isMoreDescription"
    />
  </template>
</template>

<script>
import BaseReleaseDateLabels from '@/models/album/BaseReleaseDateLabels.vue'
import BaseAlbumTags from '@/models/album/BaseAlbumTags.vue'
import BaseCounters from '@/BaseCounters.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseAlbumDescription from '@/models/album/BaseAlbumDescription.vue'

export default {
  name: 'SecondarySection',
  components: {
    BaseReleaseDateLabels,
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
    release_date () {
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
      return this.albumData.with_more.tags
    },
    description () {
      return this.albumData.description
    },
    isMoreDescription () {
      return this.albumData.with_more.description
    }
  }
}
</script>

<style lang="sass" scoped></style>
