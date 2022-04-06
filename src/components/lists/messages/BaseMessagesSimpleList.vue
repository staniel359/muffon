<template>
  <BaseListContainer>
    <MessageItem
      v-for="messageData in messages"
      :key="messageData.uuid"
      :messageData="messageData"
    />
  </BaseListContainer>
</template>

<script>
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import MessageItem from './BaseMessagesSimpleList/MessageItem.vue'

export default {
  name: 'BaseMessagesSimpleList',
  components: {
    BaseListContainer,
    MessageItem
  },
  props: {
    messages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
