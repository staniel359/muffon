<template>
  <BaseReleasedLabels
    :released="released"
    :labels="labels"
  />

  <BaseAlbumTags
    v-if="tags"
    :tags="tags"
    :requestAlbumData="requestAlbumData"
    isMore
  />

  <BaseCounters
    :listenersCount="listenersCount"
    :playsCount="playsCount"
  />
</template>

<script>
import BaseReleasedLabels from '@/models/album/BaseReleasedLabels.vue'
import BaseAlbumTags from '@/models/album/BaseAlbumTags.vue'
import BaseCounters from '@/BaseCounters.vue'

export default {
  name: 'SecondarySection',
  components: {
    BaseReleasedLabels,
    BaseAlbumTags,
    BaseCounters
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    requestAlbumData: Object
  },
  computed: {
    released () {
      return this.albumData.released
    },
    labels () {
      return this.albumData.labels
    },
    tags () {
      return this.albumData.tags
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    playsCount () {
      return this.albumData.plays_count
    }
  }
}
</script>

<style lang="sass" scoped></style>
