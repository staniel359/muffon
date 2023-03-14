<template>
  <BaseCommunityTabContainer
    :key="key"
    :community-id="communityId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    is-with-top-segment
    @focus="handleFocus"
  >
    <template
      #top
    >
      <div>
        <BasePostsFormSegment
          post-type="community"
          :class="[
            'main-segment-container',
            'main-nested-segment-container'
          ]"
          :community-id="communityId"
          :is-with-as-community-option="isCommunityCreator"
          @success="handlePostCreateSuccess"
        />
      </div>

      <BaseDivider />
    </template>

    <template
      #default="slotProps"
    >
      <BasePostsSimpleList
        :posts="slotProps[scope]"
        :is-community-creator="isCommunityCreator"
      />
    </template>
  </BaseCommunityTabContainer>
</template>

<script>
import BaseCommunityTabContainer
  from '@/components/containers/tabs/community/BaseCommunityTabContainer.vue'
import BasePostsFormSegment
  from '@/components/segments/posts/BasePostsFormSegment.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import {
  generateKey
} from '#/helpers/utils'
import {
  posts as postsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PostsTab',
  components: {
    BaseCommunityTabContainer,
    BasePostsFormSegment,
    BaseDivider,
    BasePostsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    communityId: String,
    isCommunityCreator: Boolean
  },
  data () {
    return {
      key: null,
      limit:
        postsLimits.simple.small,
      scope: 'posts'
    }
  },
  methods: {
    handlePostCreateSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
