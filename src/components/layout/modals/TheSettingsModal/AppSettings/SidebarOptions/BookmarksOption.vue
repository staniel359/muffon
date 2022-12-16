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
      :is-checked="isSidebarWithBookmarksItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import sidebarStore from '@/stores/sidebar'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/toggles/BaseToggle.vue'

export default {
  name: 'BookmarksOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithBookmarksItem:
          'isWithBookmarksItem'
      }
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
