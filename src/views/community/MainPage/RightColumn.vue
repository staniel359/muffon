<template>
  <div class="right-column">
    <PostsSegment
      :community-id="communityId"
      :is-community-creator="isCommunityCreator"
    />
  </div>
</template>

<script>
import PostsSegment from './RightColumn/PostsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    PostsSegment
  },
  props: {
    communityId: String,
    isCommunityCreator: Boolean
  }
}
</script>

<style lang="sass" scoped>
.right-column
  @extend .flex-full
  margin-left: 1.5em
</style>
