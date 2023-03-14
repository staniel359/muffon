<template>
  <BasePaginatedTabContainer
    :response-data="topData"
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
import getTop from '@/helpers/actions/api/top/get'
import {
  artists as formatTopArtistsLink,
  albums as formatTopAlbumsLink,
  tracks as formatTopTracksLink,
  tags as formatTopTagsLink
} from '@/helpers/formatters/links/top'

export default {
  name: 'BaseTopTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    country: String
  },
  data () {
    return {
      topData: null
    }
  },
  computed: {
    topArgs () {
      return {
        scope: this.scope,
        country: this.country,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatTopArtistsLink(
            {
              country: this.country
            }
          )
        case 'albums':
          return formatTopAlbumsLink(
            {
              country: this.country
            }
          )
        case 'tracks':
          return formatTopTracksLink(
            {
              country: this.country
            }
          )
        case 'tags':
          return formatTopTagsLink(
            {
              country: this.country
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getTop,
    getData (
      {
        page
      } = {}
    ) {
      this.getTop(
        {
          ...this.topArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
