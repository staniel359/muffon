<template>
  <BaseLinkContainer
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer :image="image">
      <InfoSection
        :albumTitle="albumTitle"
        :artistName="albumArtistName"
        :listenersCount="listenersCount"
        :uuid="uuid"
        :isWithArtistName="isWithArtistName"
        :isArtistNameActive="isArtistNameActive"
        :isWithListenersCount="isWithListenersCount"
      />
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import InfoSection from './AlbumItem/InfoSection.vue'
import {
  artistMain as formatArtistMainLink,
  albumMain as formatAlbumMainLink
} from '#/formatters/links'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    InfoSection
  },
  provide () {
    return {
      setIsArtistNameActive: this.setIsArtistNameActive
    }
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    artistName: String,
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isArtistNameActive: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isArtistNameActive) {
        return this.artistMainLinkFormatted
      } else {
        return this.albumMainLinkFormatted
      }
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.albumArtistName
      })
    },
    albumArtistName () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.albumArtistName,
        albumTitle: this.albumTitle
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.small
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    uuid () {
      return this.albumData.uuid
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    setIsArtistNameActive (value) {
      this.isArtistNameActive = value
    }
  }
}
</script>

<style lang="sass" scoped></style>
