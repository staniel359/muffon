<template>
  <div class="option">
    <BaseIcon
      icon="bookmark"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="bookmarksText"
    />

    <BaseToggle
      store-key="sidebar.isWithBookmarksItem"
      :is-checked="isWithBookmarksItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseToggle from '*/components/BaseToggle.vue'

export default {
  name: 'BookmarksOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithBookmarksItem'
      ]
    ),
    bookmarksText () {
      return this.$t(
        'navigation.bookmarks'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
