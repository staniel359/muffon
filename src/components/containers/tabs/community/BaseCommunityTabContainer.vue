<template>
  <BasePaginatedTabContainer
    :response-data="communityData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    :is-with-top-section="isWithTopSection"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #top
    >
      <slot
        name="top"
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
import getCommunity from '@/helpers/actions/api/community/get'
import {
  posts as formatCommunityPostsLink
} from '@/helpers/formatters/links/community'

export default {
  name: 'BaseCommunityTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    communityId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      communityData: null
    }
  },
  computed: {
    communityArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'posts':
          return formatCommunityPostsLink(
            {
              communityId: this.communityId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getCommunity,
    getData (
      {
        page
      } = {}
    ) {
      this.getCommunity(
        {
          ...this.communityArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
