<template>
  <BaseCommunityTabContainer
    :key="key"
    :community-id="communityId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    is-with-top-section
    @focus="handleFocus"
  >
    <template
      #top
    >
      <BasePostsFormSection
        :key="formKey"
        post-type="community"
        :community-id="communityId"
        :is-community-creator="isCommunityCreator"
        @success="handlePostCreateSuccess"
      />

      <BaseDivider />
    </template>

    <template
      #default="slotProps"
    >
      <BasePostsSimpleList
        ref="list"
        :posts="slotProps[scope]"
      />
    </template>
  </BaseCommunityTabContainer>
</template>

<script>
import BaseCommunityTabContainer
  from '@/components/containers/tabs/community/BaseCommunityTabContainer.vue'
import BasePostsFormSection
  from '@/components/sections/posts/BasePostsFormSection.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import tabMixin from '@/mixins/tabMixin'
import postsTabMixin from '@/mixins/postsTabMixin'

export default {
  name: 'PostsTab',
  components: {
    BaseCommunityTabContainer,
    BasePostsFormSection,
    BaseDivider,
    BasePostsSimpleList
  },
  mixins: [
    tabMixin,
    postsTabMixin
  ],
  props: {
    communityId: Number,
    isCommunityCreator: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
