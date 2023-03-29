<template>
  <BaseProfileTabContainer
    :key="key"
    :profile-id="profileId"
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
          post-type="profile"
          :class="[
            'main-segment-container',
            'main-nested-segment-container'
          ]"
          :profile-id="profileId"
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
        :profile-id="profileId"
      />
    </template>
  </BaseProfileTabContainer>
</template>

<script>
import BaseProfileTabContainer
  from '@/components/containers/tabs/profile/BaseProfileTabContainer.vue'
import BasePostsFormSegment
  from '@/components/segments/posts/BasePostsFormSegment.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import {
  generateKey
} from '@/helpers/utils'
import {
  posts as postsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'PostsTab',
  components: {
    BaseProfileTabContainer,
    BasePostsFormSegment,
    BaseDivider,
    BasePostsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: String
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
