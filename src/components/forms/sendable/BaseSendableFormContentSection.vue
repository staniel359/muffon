<template>
  <div
    v-if="isRender"
    class="main-content-container"
  >
    <BaseImagesTableList
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

    <VideosSection
      v-if="videos.length"
      class="main-content-section"
      :videos="videos"
      @link-click="handleLinkClick"
    />

    <VideoPlaylistsSection
      v-if="videoPlaylists.length"
      class="main-content-section"
      :video-playlists="videoPlaylists"
      @link-click="handleLinkClick"
    />

    <PlaylistsSection
      v-if="playlists.length"
      class="main-content-section"
      :playlists="playlists"
      @link-click="handleLinkClick"
    />

    <CommunitiesSection
      v-if="communities.length"
      class="main-content-section"
      :communities="communities"
      @link-click="handleLinkClick"
    />
  </div>
</template>

<script>
import BaseImagesTableList
  from '@/components/lists/images/BaseImagesTableList.vue'
import ArtistsSection
  from './BaseSendableFormContentSection/ArtistsSection.vue'
import AlbumsSection
  from './BaseSendableFormContentSection/AlbumsSection.vue'
import TracksSection
  from './BaseSendableFormContentSection/TracksSection.vue'
import VideosSection
  from './BaseSendableFormContentSection/VideosSection.vue'
import VideoPlaylistsSection
  from './BaseSendableFormContentSection/VideoPlaylistsSection.vue'
import PlaylistsSection
  from './BaseSendableFormContentSection/PlaylistsSection.vue'
import CommunitiesSection
  from './BaseSendableFormContentSection/CommunitiesSection.vue'

export default {
  name: 'BaseSendableFormContentSection',
  components: {
    BaseImagesTableList,
    ArtistsSection,
    AlbumsSection,
    TracksSection,
    VideosSection,
    VideoPlaylistsSection,
    PlaylistsSection,
    CommunitiesSection
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
    albums: {
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
    videos: {
      type: Array,
      default () {
        return []
      }
    },
    videoPlaylists: {
      type: Array,
      default () {
        return []
      }
    },
    playlists: {
      type: Array,
      default () {
        return []
      }
    },
    communities: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'linkClick'
  ],
  computed: {
    isRender () {
      return (
        this.images.length ||
          this.artists.length ||
          this.albums.length ||
          this.tracks.length ||
          this.videos.length ||
          this.videoPlaylists.length ||
          this.playlists.length ||
          this.communities.length
      )
    }
  },
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
