<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="bookmarksLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="bookmark grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="bookmarksText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import { bookmarks as formatBookmarksLink } from '#/formatters/links'

export default {
  name: 'BookmarksItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    bookmarksLink () {
      return formatBookmarksLink()
    },
    bookmarksText () {
      return this.$t(
        'layout.navigation.bookmarks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
