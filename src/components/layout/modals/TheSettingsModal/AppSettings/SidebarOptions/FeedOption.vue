<template>
  <div class="option">
    <BaseIcon
      icon="newspaper"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="feedText"
    />

    <BaseToggle
      store-key="sidebar.isWithFeedItem"
      :is-checked="isSidebarWithFeedItem"
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
  name: 'FeedOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithFeedItem: 'isWithFeedItem'
      }
    ),
    feedText () {
      return this.$t(
        'navigation.feed'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
