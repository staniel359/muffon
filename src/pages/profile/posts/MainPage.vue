<template>
  <BaseProfilePaginatedPageContainer
    :key="refreshKey"
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
import pageMixin from '@/mixins/pageMixin'
import {
  posts as postsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePaginatedPageContainer,
    BasePostsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
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
