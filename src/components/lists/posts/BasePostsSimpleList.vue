<template>
  <BaseFeedContainer
    class="divided"
  >
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :post-data="postData"
    />
  </BaseFeedContainer>
</template>

<script>
import BaseFeedContainer
  from '@/components/containers/feed/BaseFeedContainer.vue'
import PostItem from './BasePostsSimpleList/PostItem.vue'

export default {
  name: 'BasePostsSimpleList',
  components: {
    BaseFeedContainer,
    PostItem
  },
  inject: [
    'prependItemToPaginatedList'
  ],
  props: {
    posts: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    addPostToPosts (
      value
    ) {
      this.prependItemToPaginatedList(
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
