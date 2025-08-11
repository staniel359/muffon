<template>
  <BasePaginatedTabContainer
    :response-data="favoritesData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    :is-with-top-section="isWithTopSection"
    :is-with-play-button="isWithPlayButton"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #topPlayButton
    >
      <slot
        name="topPlayButton"
      />
    </template>

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
import getProfileFavorites from '@/helpers/actions/api/profile/favorites/get'
import {
  artists as formatProfileFavoritesArtistsLink,
  albums as formatProfileFavoritesAlbumsLink,
  tracks as formatProfileFavoritesTracksLink,
  videos as formatProfileFavoritesVideosLink
} from '@/helpers/formatters/links/profile/favorites'

export default {
  name: 'BaseProfileFavoritesTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    favoritesArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    favoritesData () {
      return this.profileData?.favorites
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatProfileFavoritesArtistsLink(
            {
              profileId: this.profileId
            }
          )
        case 'albums':
          return formatProfileFavoritesAlbumsLink(
            {
              profileId: this.profileId
            }
          )
        case 'tracks':
          return formatProfileFavoritesTracksLink(
            {
              profileId: this.profileId
            }
          )
        case 'videos':
          return formatProfileFavoritesVideosLink(
            {
              profileId: this.profileId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileFavorites,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileFavorites(
        {
          ...this.favoritesArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
