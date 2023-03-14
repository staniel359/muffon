<template>
  <BasePaginatedTabContainer
    :response-data="tagData"
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
import getTag from '@/helpers/actions/api/tag/get'
import {
  artists as formatTagArtistsLink,
  albums as formatTopAlbumsLink,
  tracks as formatTagTracksLink
} from '@/helpers/formatters/links/tag'

export default {
  name: 'BaseTagTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    tagName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tagData: null
    }
  },
  computed: {
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatTagArtistsLink(
            {
              tagName: this.tagName
            }
          )
        case 'albums':
          return formatTopAlbumsLink(
            {
              tagName: this.tagName
            }
          )
        case 'tracks':
          return formatTagTracksLink(
            {
              tagName: this.tagName
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getTag(
        {
          ...this.tagArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
