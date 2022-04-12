<template>
  <div class="right-column">
    <PostsSegment
      :communityId="communityId"
      :communityCreatorId="communityCreatorId"
      :currentProfileId="currentProfileId"
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
    communityCreatorId: String,
    currentProfileId: String
  }
}
</script>

<style lang="sass" scoped>
.right-column
  @extend .flex-full
  margin-left: 1.5em
</style>
