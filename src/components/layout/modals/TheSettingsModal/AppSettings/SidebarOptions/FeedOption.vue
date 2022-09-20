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
      :is-checked="isWithFeedItem"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseToggle from '@/components/BaseToggle.vue'

export default {
  name: 'FeedOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      'sidebar',
      [
        'isWithFeedItem'
      ]
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
