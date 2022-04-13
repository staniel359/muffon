<template>
  <div class="right-column">
    <PostsSegment
      :community-id="communityId"
      :community-creator-id="communityCreatorId"
      :current-profile-id="currentProfileId"
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
