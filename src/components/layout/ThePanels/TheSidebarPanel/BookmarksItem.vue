<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="bookmarksLinkFormatted"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="bookmark grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="textFormatted"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import { bookmarks as formatBookmarksLink } from '#/formatters/links'

export default {
  name: 'RecommendationsItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    bookmarksLinkFormatted () {
      return formatBookmarksLink()
    },
    textFormatted () {
      return this.$t(
        'layout.navigation.bookmarks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
