<template>
  <div class="ui raised segments main-segment-container">
    <HeaderSegment
      :profileId="profileId"
    />

    <FormSegment
      :profileId="profileId"
      @success="handleSuccess"
    />

    <PostsListSegment
      :key="key"
      :profileId="profileId"
    />
  </div>
</template>

<script>
import HeaderSegment from './PostsSegment/HeaderSegment.vue'
import FormSegment from './PostsSegment/FormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import { generateKey } from '*/helpers/utils'

export default {
  name: 'PostsSegment',
  components: {
    HeaderSegment,
    FormSegment,
    PostsListSegment
  },
  props: {
    profileId: String
  },
  data () {
    return {
      key: null
    }
  },
  methods: {
    handleSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
