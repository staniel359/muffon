<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="feedLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="list grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="feedText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import { feed as formatFeedLink } from '#/formatters/links'

export default {
  name: 'FeedItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    feedLink () {
      return formatFeedLink()
    },
    feedText () {
      return this.$t(
        'layout.navigation.feed'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
