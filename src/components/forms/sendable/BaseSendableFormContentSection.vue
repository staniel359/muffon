<template>
  <div class="main-content-container">
    <ImagesSection
      v-if="images.length"
      class="main-content-section"
      :images="images"
    />

    <ArtistsSection
      v-if="artists.length"
      class="main-content-section"
      :artists="artists"
      @link-click="handleLinkClick"
    />

    <AlbumsSection
      v-if="albums.length"
      class="main-content-section"
      :albums="albums"
      @link-click="handleLinkClick"
    />

    <TracksSection
      v-if="tracks.length"
      class="main-content-section"
      :tracks="tracks"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import ImagesSection
  from './BaseSendableFormContentSection/ImagesSection.vue'
import ArtistsSection
  from './BaseSendableFormContentSection/ArtistsSection.vue'
import AlbumsSection
  from './BaseSendableFormContentSection/AlbumsSection.vue'
import TracksSection
  from './BaseSendableFormContentSection/TracksSection.vue'

export default {
  name: 'BaseSendableFormContentSection',
  components: {
    ImagesSection,
    ArtistsSection,
    AlbumsSection,
    TracksSection
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    artists: {
      type: Array,
      default () {
        return []
      }
    },
    tracks: {
      type: Array,
      default () {
        return []
      }
    },
    albums: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'linkClick'
  ],
  methods: {
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
