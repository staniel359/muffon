<template>
  <BaseListContainer class="divided">
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :postData="postData"
      :profileId="profileId"
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
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
