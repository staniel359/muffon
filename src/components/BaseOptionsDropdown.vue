<template>
  <BaseLinkContainer
    v-if="isAnyOptions"
    class="main-options-dropdown-container"
  >
    <div
      class="main-options-dropdown"
      :class="{ inverted: isDarkMode }"
    >
      <BaseButtonContainer
        class="compact basic circular top right pointing floating dropdown icon main-options-dropdown-button"
        @init="handleDropdownInit"
      >
        <i class="ellipsis vertical icon"></i>
        <div class="menu">
          <Component
            v-for="optionData in optionsFormatted"
            :key="optionData.uuid"
            :is="optionData.component"
            :model="model"
            :modelId="modelId"
            :optionModelId="optionData.optionModelId"
            :albumTitle="albumTitle"
            :albumTracks="albumTracks"
            :imageUrl="imageUrl"
            @click="optionData.action"
            @linkClick="handleLinkClick"
          />
        </div>
      </BaseButtonContainer>
    </div>
  </BaseLinkContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseButtonContainer from '@/containers/BaseButtonContainer.vue'
import LibraryOption from './BaseOptionsDropdown/LibraryOption.vue'
import FavoriteOption from './BaseOptionsDropdown/FavoriteOption.vue'
import BookmarkOption from './BaseOptionsDropdown/BookmarkOption.vue'
import ListenedOption from './BaseOptionsDropdown/ListenedOption.vue'
import PlaylistOption from './BaseOptionsDropdown/PlaylistOption.vue'
import EditOption from './BaseOptionsDropdown/EditOption.vue'
import DeleteOption from './BaseOptionsDropdown/DeleteOption.vue'
import { setDropdown } from '#/actions/plugins/semantic'
import { mainDropdownOptions } from '#/data/plugins/semantic'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseOptionsDropdown',
  components: {
    BaseLinkContainer,
    BaseButtonContainer,
    LibraryOption,
    FavoriteOption,
    BookmarkOption,
    ListenedOption,
    PlaylistOption,
    EditOption,
    DeleteOption
  },
  props: {
    model: String,
    modelId: String,
    libraryId: String,
    favoriteId: String,
    bookmarkId: String,
    listenedId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithPlaylistOption: Boolean,
    isWithEditOption: Boolean,
    isWithDeleteOption: Boolean,
    albumTitle: String,
    albumTracks: Array,
    imageUrl: String
  },
  emits: [
    'playlist',
    'edit',
    'delete',
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
          this.isWithPlaylistOption &&
            this.playlistOption
        ),
        (
          this.isWithEditOption &&
            this.editOption
        ),
        (
          this.isWithDeleteOption &&
            this.deleteOption
        )
      ].filter(e => e)
    },
    libraryOption () {
      return {
        component: 'LibraryOption',
        optionModelId: this.libraryId
      }
    },
    favoriteOption () {
      return {
        component: 'FavoriteOption',
        optionModelId: this.favoriteId
      }
    },
    bookmarkOption () {
      return {
        component: 'BookmarkOption',
        optionModelId: this.bookmarkId
      }
    },
    listenedOption () {
      return {
        component: 'ListenedOption',
        optionModelId: this.listenedId
      }
    },
    playlistOption () {
      return {
        component: 'PlaylistOption',
        action: this.handlePlaylistOptionClick
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
    optionsFormatted () {
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
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.main-options-dropdown-button
  padding: 0.5em !important
</style>
