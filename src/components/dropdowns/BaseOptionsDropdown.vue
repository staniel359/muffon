<template>
  <BaseLinkContainer
    v-if="isAnyOptions"
    class="main-options-dropdown-container"
  >
    <BaseButtonContainer
      class="compact basic circular top right pointing floating dropdown icon main-options-dropdown-button"
      :class="{ white: isWhite && !isDarkMode }"
      @click.prevent
      @init="handleDropdownInit"
    >
      <i class="ellipsis vertical icon"></i>
      <div class="menu">
        <Component
          v-for="optionData in optionsCollection"
          :key="optionData.uuid"
          :is="optionData.component"
          :model="model"
          :modelId="optionData.modelId"
          :artistName="artistName"
          :trackTitle="trackTitle"
          :albumTitle="albumTitle"
          :albumTracks="albumTracks"
          :imageUrl="imageUrl"
          :profileData="optionData.profileData"
          @click="optionData.action"
          @linkClick="handleLinkClick"
        />
      </div>
    </BaseButtonContainer>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseButtonContainer from '@/containers/buttons/BaseButtonContainer.vue'
import LibraryOption from './BaseOptionsDropdown/LibraryOption.vue'
import PlaylistOption from './BaseOptionsDropdown/PlaylistOption.vue'
import FavoriteOption from './BaseOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseOptionsDropdown/ListenedOption.vue'
import EditOption from './BaseOptionsDropdown/EditOption.vue'
import DeleteOption from './BaseOptionsDropdown/DeleteOption.vue'
import FollowOption from './BaseOptionsDropdown/FollowOption.vue'
import MessageOption from './BaseOptionsDropdown/MessageOption.vue'
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseOptionsDropdown',
  components: {
    BaseLinkContainer,
    BaseButtonContainer,
    LibraryOption,
    PlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    EditOption,
    DeleteOption,
    FollowOption,
    MessageOption
  },
  props: {
    model: String,
    artistName: String,
    trackTitle: String,
    albumTitle: String,
    albumTracks: Array,
    imageUrl: String,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isWithLibraryOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    isWithFollowOption: Boolean,
    isWithMessageOption: Boolean,
    profileData: Object,
    isWhite: Boolean
  },
  emits: [
    'playlist',
    'edit',
    'delete',
    'message',
    'linkClick'
  ],
  data () {
    return {
      dropdown: null
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    dropdownOptions () {
      return mainDropdownOptions({
        action: 'nothing'
      })
    },
    isAnyOptions () {
      return this.options.length
    },
    options () {
      return [
        (
          this.isWithLibraryOption &&
            this.libraryOption
        ),
        (
          this.isWithPlaylistOption &&
            this.playlistOption
        ),
        (
          this.isWithFavoriteOption &&
            this.favoriteOption
        ),
        (
          this.isWithBookmarkOption &&
            this.bookmarkOption
        ),
        (
          this.isWithListenedOption &&
            this.listenedOption
        ),
        (
          this.isWithEditOption &&
            this.editOption
        ),
        (
          this.isWithDeleteOption &&
            this.deleteOption
        ),
        (
          this.isWithFollowOption &&
            this.followOption
        ),
        (
          this.isWithMessageOption &&
            this.messageOption
        )
      ].filter(e => e)
    },
    libraryOption () {
      return {
        component: 'LibraryOption',
        modelId: this.libraryId
      }
    },
    playlistOption () {
      return {
        component: 'PlaylistOption',
        action: this.handlePlaylistOptionClick
      }
    },
    favoriteOption () {
      return {
        component: 'FavoriteOption',
        modelId: this.favoriteId
      }
    },
    bookmarkOption () {
      return {
        component: 'BookmarkOption',
        modelId: this.bookmarkId
      }
    },
    listenedOption () {
      return {
        component: 'ListenedOption',
        modelId: this.listenedId
      }
    },
    editOption () {
      return {
        component: 'EditOption',
        action: this.handleEditOptionClick
      }
    },
    deleteOption () {
      return {
        component: 'DeleteOption',
        action: this.handleDeleteOptionClick
      }
    },
    followOption () {
      return {
        component: 'FollowOption',
        profileData: this.profileData
      }
    },
    messageOption () {
      return {
        component: 'MessageOption',
        action: this.handleMessageOptionClick
      }
    },
    optionsCollection () {
      return formatCollection(
        this.options
      )
    }
  },
  mounted () {
    setDropdown(
      this.dropdown,
      this.dropdownOptions
    )
  },
  methods: {
    handleDropdownInit (el) {
      this.dropdown = el
    },
    handlePlaylistOptionClick () {
      this.$emit('playlist')
    },
    handleEditOptionClick () {
      this.$emit('edit')
    },
    handleDeleteOptionClick () {
      this.$emit('delete')
    },
    handleMessageOptionClick () {
      this.$emit('message')
    },
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>
