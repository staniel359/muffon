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
import getProfileLibraryTag
  from '@/helpers/actions/api/profile/library/tag/get'
import {
  artists as formatProfileLibraryTagArtistsLink
} from '@/helpers/formatters/links/profile/library/tag'

export default {
  name: 'BaseProfileLibraryTagTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTagId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    libraryTagArgs () {
      return {
        profileId: this.profileId,
        libraryTagId:
          this.libraryTagId,
        scope: this.scope,
        limit: this.limit
      }
    },
    tagData () {
      return this.profileData?.library?.tag
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatProfileLibraryTagArtistsLink(
            {
              profileId: this.profileId,
              libraryTagId:
                this.libraryTagId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileLibraryTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryTag(
        {
          ...this.libraryTagArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
