<template>
  <BaseProfilePaginatedPageContainer
    model="post"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #default="slotProps"
    >
      <BasePostsSimpleList
        :posts="slotProps[scope]"
        :profile-id="profileId"
      />
    </template>
  </BaseProfilePaginatedPageContainer>
</template>

<script>
import BaseProfilePaginatedPageContainer
  from '@/components/containers/pages/profile/BaseProfilePaginatedPageContainer.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  posts as postsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PostsPage',
  components: {
    BaseProfilePaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin
  ],
  props: {
    profileId: String
  },
  data () {
    return {
      limit:
        postsLimits.simple.large,
      scope: 'posts',
      order: 'createdDesc'
    }
  }
}
</script>

<style lang="sass" scoped></style>
