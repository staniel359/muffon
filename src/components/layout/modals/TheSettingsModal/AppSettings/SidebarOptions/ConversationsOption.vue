<template>
  <div class="option">
    <BaseIcon
      icon="conversation"
    />

    <BaseHeader
      class="option-header"
      tag="h4"
      :text="conversationsText"
    />

    <BaseToggle
      store-key="sidebar.isWithConversationsItem"
      :is-checked="isSidebarWithConversationsItem"
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
  name: 'ConversationsOption',
  components: {
    BaseIcon,
    BaseHeader,
    BaseToggle
  },
  computed: {
    ...mapState(
      sidebarStore,
      {
        isSidebarWithConversationsItem:
          'isWithConversationsItem'
      }
    ),
    conversationsText () {
      return this.$t(
        'navigation.conversations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
