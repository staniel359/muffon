<template>
  <div
    :class="{
      loading: isActive && isLoading,
      inverted: isDarkMode
    }"
  >
    <BasePaginatedListContainer
      :response-data="libraryData"
      :scope="tabData.scope"
      :limit="tabData.limit"
      :is-loading="isLoading"
      :error="error"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <Component
          :is="tabData.component"
          :[tabData.scope]="slotProps[tabData.scope]"
          :items-in-row="tabData.itemsInRow"
          :profile-id="profileId"
          :is-with-playlist-option="isSelf"
          :is-with-favorite-option="isSelf"
          :is-with-delete-option="isWithDeleteOption(tabData.scope)"
          is-with-image
          is-with-artist-name
          is-with-album-title
          is-with-created
          is-with-library
          is-link-to-library
        />
      </template>
    </BasePaginatedListContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BaseArtistsTableList
  from '*/components/lists/artists/BaseArtistsTableList.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import BaseTagsList from '*/components/lists/tags/BaseTagsList.vue'
import getProfileLibrary from '*/helpers/actions/api/profile/library/get'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'BaseProfileLibraryTabContainer',
  components: {
    BasePaginatedListContainer,
    BaseArtistsTableList,
    BaseAlbumsTableList,
    BaseTracksSimpleList,
    BaseTagsList
  },
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    tabData: {
      type: Object,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      isActivated: false
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.tabData.scope,
        limit: this.tabData.limit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  watch: {
    isActive: {
      immediate: true,
      handler: 'handleIsActive'
    },
    isActivated: {
      immediate: true,
      handler: 'handleIsActivated'
    }
  },
  methods: {
    getProfileLibrary,
    handleIsActive (
      value
    ) {
      if (value) {
        this.isActivated = true
      }
    },
    handleIsActivated (
      value
    ) {
      if (value) {
        this.getData()
      }
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibrary(
        {
          ...this.libraryArgs,
          page
        }
      )
    },
    isWithDeleteOption (
      scope
    ) {
      return (
        scope === 'tracks' &&
          this.isSelf
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
