<template>
  <div
    class="track-page-columns-container"
    ref="scrollable"
  >
    <div class="track-page-left-column main-sticky-container">
      <div class="main-image-container">
        <BaseImage
          class="rounded bordered track-image"
          :image="image"
        />
      </div>

      <TrackHeader
        v-if="scrollable"
        :trackData="trackData"
        :scrollable="scrollable"
      />

      <div class="main-self-buttons">
        <BaseLibraryButton
          class="main-self-button"
          model="track"
          :modelId="libraryId"
          :trackTitle="title"
          :artistName="artistName"
          :albumTitle="albumTitle"
          :imageUrl="image"
        />

        <BaseListenedButton
          class="main-self-button"
          model="track"
          :modelId="listenedId"
          :trackTitle="title"
          :artistName="artistName"
          :albumTitle="albumTitle"
          :imageUrl="image"
        />

        <BaseBookmarkButton
          class="main-self-button"
          model="track"
          :modelId="bookmarkId"
          :trackTitle="title"
          :artistName="artistName"
          :albumTitle="albumTitle"
          :imageUrl="image"
        />
      </div>
    </div>

    <div class="track-page-right-column">
      <MainSection
        :trackData="trackData"
      />

      <ExtraSection
        :key="extraSectionKey"
        :trackData="trackData"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import TrackHeader from './TrackPageContent/TrackHeader.vue'
import BaseLibraryButton from '@/models/self/BaseLibraryButton.vue'
import BaseListenedButton from '@/models/self/BaseListenedButton.vue'
import BaseBookmarkButton from '@/models/self/BaseBookmarkButton.vue'
import MainSection from './TrackPageContent/MainSection.vue'
import ExtraSection from './TrackPageContent/ExtraSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackPageContent',
  components: {
    BaseImage,
    TrackHeader,
    BaseLibraryButton,
    BaseListenedButton,
    BaseBookmarkButton,
    MainSection,
    ExtraSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      extraSectionKey: null,
      scrollable: null
    }
  },
  computed: {
    title () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.trackData.album.title
    },
    image () {
      return this.trackData.image.small
    },
    libraryId () {
      return this.trackData.library_id?.toString()
    },
    listenedId () {
      return this.trackData.listened_id?.toString()
    },
    bookmarkId () {
      return this.trackData.bookmark_id?.toString()
    }
  },
  watch: {
    trackData: 'handleTrackDataChange'
  },
  mounted () {
    this.scrollable = this.$refs.scrollable
  },
  methods: {
    handleTrackDataChange () {
      this.extraSectionKey = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>
.track-page-columns-container
  @extend .d-flex

.track-page-left-column
  width: 150px

.track-page-right-column
  @extend .flex-full
  margin-left: 1em
</style>
