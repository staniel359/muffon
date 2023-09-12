<template>
  <BaseListContainer
    class="divided"
  >
    <PostItem
      v-for="postData in posts"
      :key="postData.uuid"
      :post-data="postData"
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
