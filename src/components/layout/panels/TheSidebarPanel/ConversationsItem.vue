<template>
  <BaseLinkContainer
    class="item main-sidebar-item"
    :link="conversationsLink"
  >
    <div class="main-sidebar-item-icon-container">
      <i class="comments grey icon"></i>
    </div>

    <div class="main-sidebar-item-content-container">
      <BaseHeader
        tag="h4"
        :text="conversationsText"
      />
    </div>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import {
  main as formatConversationsLink
} from '#/formatters/links/conversations'

export default {
  name: 'ConversationsItem',
  components: {
    BaseLinkContainer,
    BaseHeader
  },
  computed: {
    conversationsLink () {
      return formatConversationsLink()
    },
    conversationsText () {
      return this.$t(
        'layout.navigation.conversations'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
