<template>
  <BaseProfilePaginatedTabContainer
    :key="key"
    :profile-id="profileId"
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
        post-type="profile"
        :profile-id="profileId"
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
  </BaseProfilePaginatedTabContainer>
</template>

<script>
import BaseProfilePaginatedTabContainer
  from '@/components/containers/tabs/profile/BaseProfilePaginatedTabContainer.vue'
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
    BaseProfilePaginatedTabContainer,
    BasePostsFormSection,
    BaseDivider,
    BasePostsSimpleList
  },
  mixins: [
    tabMixin,
    postsTabMixin
  ],
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
