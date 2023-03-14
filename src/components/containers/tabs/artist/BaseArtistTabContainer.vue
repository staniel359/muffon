<template>
  <BasePaginatedTabContainer
    :response-data="artistData"
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
        :artist-name="responseArtistName"
        :top-track-count="topTrackCount"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getArtist from '@/helpers/actions/api/artist/get'
import {
  tracks as formatArtistTracksLink,
  albums as formatArtistAlbumsLink,
  similar as formatArtistSimilarLink
} from '@/helpers/formatters/links/artist'

export default {
  name: 'BaseArtistTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      artistData: null,
      topTrackCount: null
    }
  },
  computed: {
    artistArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        limit: this.limit
      }
    },
    responseArtistName () {
      return this.artistData?.name
    },
    moreLink () {
      switch (this.scope) {
        case 'tracks':
          return formatArtistTracksLink(
            {
              artistName: this.artistName
            }
          )
        case 'albums':
          return formatArtistAlbumsLink(
            {
              artistName: this.artistName
            }
          )
        case 'similar':
          return formatArtistSimilarLink(
            {
              artistName: this.artistName
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getArtist,
    getData (
      {
        page
      } = {}
    ) {
      this.getArtist(
        {
          ...this.artistArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
