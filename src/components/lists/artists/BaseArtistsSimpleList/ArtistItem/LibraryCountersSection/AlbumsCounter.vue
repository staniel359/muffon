<template>
  <div
    v-if="albumsCount"
    class="description middle-aligned"
  >
    <BaseCounterBar
      :count="albumsCount"
      :top-count="topAlbumsCount"
    />

    <BaseLinkContainer
      class="ui main-link"
      :link="link"
      @active-change="handleLinkActiveChange"
      @click="handleLinkClick"
    >
      <BaseListCounterSection
        icon="album"
        :count="albumsCount"
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
  albums as formatProfileLibraryArtistAlbumsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'AlbumsCounter',
  components: {
    BaseCounterBar,
    BaseLinkContainer,
    BaseListCounterSection
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    },
    topAlbumsCount: Number
  },
  emits: [
    'linkActiveChange',
    'linkClick'
  ],
  computed: {
    albumsCount () {
      return this.artistData.albums_count
    },
    link () {
      return formatProfileLibraryArtistAlbumsLink(
        {
          profileId: this.profileId,
          libraryArtistId: this.libraryArtistId
        }
      )
    },
    libraryArtistId () {
      return this.artistData.library.id
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
