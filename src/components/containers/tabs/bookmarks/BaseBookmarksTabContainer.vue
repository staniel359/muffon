<template>
  <BasePaginatedTabContainer
    :response-data="bookmarksData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[scope]="slotProps[scope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getBookmarks from '@/helpers/actions/api/bookmarks/get'
import {
  artists as formatBookmarksArtistsLink,
  albums as formatBookmarksAlbumsLink,
  tracks as formatBookmarksTracksLink,
  videos as formatBookmarksVideosLink,
  videoChannels as formatBookmarksVideoChannelsLink,
  videoPlaylists as formatBookmarksVideoPlaylistsLink
} from '@/helpers/formatters/links/bookmarks'

export default {
  name: 'BaseBookmarksTabContainer',
  mixins: [
    tabContainerMixin
  ],
  data () {
    return {
      bookmarksData: null
    }
  },
  computed: {
    bookmarksArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatBookmarksArtistsLink()
        case 'albums':
          return formatBookmarksAlbumsLink()
        case 'tracks':
          return formatBookmarksTracksLink()
        case 'videos':
          return formatBookmarksVideosLink()
        case 'videoChannels':
          return formatBookmarksVideoChannelsLink()
        case 'videoPlaylists':
          return formatBookmarksVideoPlaylistsLink()
        default:
          return {}
      }
    }
  },
  methods: {
    getBookmarks,
    getData (
      {
        page
      } = {}
    ) {
      this.getBookmarks(
        {
          ...this.bookmarksArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
