<template>
  <BaseLinkContainer
    v-if="isAnyOptions"
    class="main-options-dropdown-container"
  >
    <BaseButtonContainer
      :class="[
        'compact basic circular',
        'top right pointing',
        'floating dropdown icon',
        'main-options-dropdown-button',
        buttonColor
      ]"
      @click.prevent
      @init="handleDropdownInit"
    >
      <BaseIcon
        icon="ellipsis vertical"
      />

      <div class="menu">
        <Component
          :is="optionData.component"
          v-for="optionData in optionsCollection"
          :key="optionData.uuid"
          :model="model"
          :model-id="optionData.modelId"
          :artist-name="artistName"
          :track-title="trackTitle"
          :album-title="albumTitle"
          :album-tracks="albumTracks"
          :image-url="imageUrl"
          :profile-data="optionData.profileData"
          :community-data="optionData.communityData"
          @click="optionData.onClick"
          @link-click="handleLinkClick"
        />
      </div>
    </BaseButtonContainer>
  </BaseLinkContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseButtonContainer
  from '*/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '*/components/BaseIcon.vue'
import LibraryOption from './BaseOptionsDropdown/LibraryOption.vue'
import PlaylistOption from './BaseOptionsDropdown/PlaylistOption.vue'
import FavoriteOption from './BaseOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseOptionsDropdown/ListenedOption.vue'
import EditOption from './BaseOptionsDropdown/EditOption.vue'
import DeleteOption from './BaseOptionsDropdown/DeleteOption.vue'
import FollowOption from './BaseOptionsDropdown/FollowOption.vue'
import JoinOption from './BaseOptionsDropdown/JoinOption.vue'
import MessageOption from './BaseOptionsDropdown/MessageOption.vue'
import {
  setDropdown
} from '*/helpers/actions/plugins/semantic'
import {
  mainDropdownOptions
} from '*/helpers/data/plugins/semantic'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseOptionsDropdown',
  components: {
    BaseLinkContainer,
    BaseButtonContainer,
    BaseIcon,
    LibraryOption,
    PlaylistOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    EditOption,
    DeleteOption,
    FollowOption,
    JoinOption,
    MessageOption
  },
  props: {
    isTransparent: {
      type: Boolean,
      default: true
    },
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
    isWithJoinOption: Boolean,
    isWithMessageOption: Boolean,
    profileData: Object,
    communityData: Object
  },
  emits: [
    'linkClick',
    'playlistOptionClick',
    'editOptionClick',
    'deleteOptionClick',
    'messageOptionClick'
  ],
  data () {
    return {
      dropdown: null
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    dropdownOptions () {
      return mainDropdownOptions(
        {
          action: 'nothing'
        }
      )
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
          this.isWithJoinOption &&
            this.joinOption
        ),
        (
          this.isWithMessageOption &&
            this.messageOption
        )
      ].filter(
        e => e
      )
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
        onClick: this.handlePlaylistOptionClick
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
        onClick: this.handleEditOptionClick
      }
    },
    deleteOption () {
      return {
        component: 'DeleteOption',
        onClick: this.handleDeleteOptionClick
      }
    },
    followOption () {
      return {
        component: 'FollowOption',
        profileData: this.profileData
      }
    },
    joinOption () {
      return {
        component: 'joinOption',
        communityData: this.communityData
      }
    },
    messageOption () {
      return {
        component: 'MessageOption',
        onClick: this.handleMessageOptionClick
      }
    },
    optionsCollection () {
      return formatCollection(
        this.options
      )
    },
    buttonColor () {
      if (this.isTransparent) {
        return null
      } else {
        if (this.isDarkMode) {
          return 'black'
        } else {
          return 'white'
        }
      }
    }
  },
  mounted () {
    setDropdown(
      this.dropdown,
      this.dropdownOptions
    )
  },
  methods: {
    handleDropdownInit (
      element
    ) {
      this.dropdown = element
    },
    handlePlaylistOptionClick () {
      this.$emit(
        'playlistOptionClick'
      )
    },
    handleEditOptionClick () {
      this.$emit(
        'editOptionClick'
      )
    },
    handleDeleteOptionClick () {
      this.$emit(
        'deleteOptionClick'
      )
    },
    handleMessageOptionClick () {
      this.$emit(
        'messageOptionClick'
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
