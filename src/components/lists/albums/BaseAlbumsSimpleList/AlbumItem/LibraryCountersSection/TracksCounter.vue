<template>
  <div
    v-if="tracksCount"
    class="description middle-aligned"
  >
    <BaseCounterBar
      :count="tracksCount"
      :top-count="topTracksCount"
    />

    <BaseLinkContainer
      class="ui main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
      @click="handleLinkClick"
    >
      <BaseListCounterSection
        icon="track"
        :count="tracksCount"
      />
    </BaseLinkContainer>
  </div>
</template>

<script>
import BaseCounterBar from '@/components/BaseCounterBar.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'
import {
  tracks as formatProfileLibraryAlbumTracksLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'TracksCounter',
  components: {
    BaseCounterBar,
    BaseLinkContainer,
    BaseListCounterSection
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    topTracksCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    tracksCount () {
      return this.albumData.tracks_count
    },
    link () {
      return formatProfileLibraryAlbumTracksLink(
        {
          profileId: this.profileId,
          libraryAlbumId: this.libraryAlbumId
        }
      )
    },
    libraryAlbumId () {
      return this.albumData.library.id
    }
  },
  methods: {
    handleLinkActiveChange (
      value
    ) {
      this.$emit(
        'linkActiveChange',
        value
      )
    },
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
