<template>
  <BaseListContainer class="divided">
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :postData="postData"
      :profileId="profileId"
      :communityCreatorId="communityCreatorId"
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
