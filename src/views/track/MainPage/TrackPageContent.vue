<template>
  <div
    class="track-page-columns-container"
    ref="scrollable"
  >
    <div class="track-page-left-column main-sticky-container">
      <BaseImage
        class="rounded bordered track-image"
        :image="image"
      />

      <TrackHeader
        v-if="scrollable"
        :trackData="trackData"
        :scrollable="scrollable"
      />

      <BaseProfileLibraryButton
        class="library-button"
        model="track"
        :profileId="profileId"
        :modelId="libraryId"
        :trackTitle="title"
        :artistName="artistName"
      />
    </div>

    <div class="track-page-right-column">
      <MainSection :trackData="trackData" />
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
import BaseProfileLibraryButton from '@/BaseProfileLibraryButton.vue'
import MainSection from './TrackPageContent/MainSection.vue'
import ExtraSection from './TrackPageContent/ExtraSection.vue'
import { generateKey } from '#/utils'

export default {
  name: 'TrackPageContent',
  components: {
    BaseImage,
    TrackHeader,
    BaseProfileLibraryButton,
    MainSection,
    ExtraSection
  },
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: String
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
    image () {
      return this.trackData.image.small
    },
    libraryId () {
      return this.trackData.library_id?.toString()
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

.library-button
  margin-top: 1em

.track-page-right-column
  @extend .flex-full
  margin-left: 1em
</style>
