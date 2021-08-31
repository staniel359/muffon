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

    <div class="main-simple-self-buttons">
      <BaseLibrarySimpleButton
        v-if="isShowLibraryLink"
        class="main-simple-self-button"
        model="album"
        :modelId="libraryId"
        @click="handleLinkClick"
      />

      <BaseListenedSimpleButton
        v-if="isShowListenedButton"
        class="main-simple-self-button"
        model="album"
        :modelId="listenedId"
      />
    </div>

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
import BaseLibrarySimpleButton from '@/models/self/BaseLibrarySimpleButton.vue'
import BaseListenedSimpleButton
  from '@/models/self/BaseListenedSimpleButton.vue'
import BaseClearButton from '@/BaseClearButton.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseImage,
    InfoBlock,
    BaseListenedSimpleButton,
    BaseLibrarySimpleButton,
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
    isWithClearButton: Boolean,
    isWithListenedButton: Boolean
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
    },
    isShowListenedButton () {
      return (
        this.isWithListenedButton &&
          !!this.listenedId
      )
    },
    listenedId () {
      return this.albumData.listened_id?.toString()
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
.main-simple-self-buttons
  margin-left: 0.5em

.delete-button
  margin-left: 0.5em !important
</style>
