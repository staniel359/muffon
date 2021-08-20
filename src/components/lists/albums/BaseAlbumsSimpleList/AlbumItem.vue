<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseImage
      class="rounded bordered"
      :image="image"
    />

    <InfoBlock
      :albumTitle="albumTitle"
      :artistName="artistName"
      :listenersCount="listenersCount"
      :uuid="uuid"
      :isWithArtistName="isWithArtistName"
      :isArtistNameActive="isArtistNameActive"
      :isWithListenersCount="isWithListenersCount"
    />

    <BaseProfileLibraryLinkButton
      v-if="isShowLibraryLink"
      model="album"
      :modelId="libraryId"
      :profileId="profileId"
      @click="handleLinkClick"
    />

    <BaseClearButton
      v-if="isWithClearButton"
      class="delete-button"
      @click="handleDeleteButtonClick"
    />
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './AlbumItem/InfoBlock.vue'
import BaseProfileLibraryLinkButton from '@/BaseProfileLibraryLinkButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    InfoBlock,
    BaseProfileLibraryLinkButton,
    BaseClearButton
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
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithLibraryLink: Boolean,
    profileId: String,
    isWithClearButton: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
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
        artistName: this.artistName
      })
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.extrasmall
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    uuid () {
      return this.albumData.uuid
    },
    isShowLibraryLink () {
      return (
        this.isWithLibraryLink &&
          !!this.libraryId
      )
    },
    libraryId () {
      return this.albumData.library_id?.toString()
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    },
    handleDeleteButtonClick () {
      this.$emit(
        'deleteButtonClick',
        { uuid: this.albumData.uuid }
      )
    },
    setIsArtistNameActive (value) {
      this.isArtistNameActive = value
    }
  }
}
</script>

<style lang="sass" scoped>
.delete-button
  margin-left: 0.5em !important
</style>
