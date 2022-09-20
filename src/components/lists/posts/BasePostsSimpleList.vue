<template>
  <BaseListContainer
    class="divided"
  >
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :post-data="postData"
      :profile-id="profileId"
      :is-community-creator="isCommunityCreator"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import PostItem from './BasePostsSimpleList/PostItem.vue'

export default {
  name: 'BasePostsSimpleList',
  components: {
    BaseListContainer,
    PostItem
  },
  props: {
    posts: {
      type: Array,
      default () {
        return []
      }
    },
    profileId: String,
    isCommunityCreator: Boolean
  }
}
</script>

<style lang="sass" scoped></style>
