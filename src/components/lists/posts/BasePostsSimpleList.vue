<template>
  <BaseListContainer class="divided">
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :post-data="postData"
      :profile-id="profileId"
      :community-creator-id="communityCreatorId"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
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
    communityCreatorId: String
  }
}
</script>

<style lang="sass" scoped></style>
