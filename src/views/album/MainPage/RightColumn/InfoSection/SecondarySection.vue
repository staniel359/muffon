<template>
  <BaseCounterLabels
    :counters="counters"
  />

  <BaseDateLabel
    v-if="releaseDate"
    :date="releaseDate"
  />

  <div
    v-if="labels"
    class="ui labels large"
  >
    <BaseLabel
      v-for="(label, index) in labels"
      :key="index"
      :text="label"
    />
  </div>

  <BaseAlbumTags
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
import BaseCounterLabels from '*/components/labels/BaseCounterLabels.vue'
import BaseDateLabel from '*/components/labels/BaseDateLabel.vue'
import BaseLabel from '*/components/BaseLabel.vue'
import BaseAlbumTags from '*/components/models/album/BaseAlbumTags.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import BaseAlbumDescription
  from '*/components/models/album/BaseAlbumDescription.vue'

export default {
  name: 'SecondarySection',
  components: {
    BaseCounterLabels,
    BaseDateLabel,
    BaseLabel,
    BaseAlbumTags,
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
    counters () {
      return [
        {
          scope: 'listeners',
          count: this.listenersCount
        },
        {
          scope: 'plays',
          count: this.playsCount
        }
      ]
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
