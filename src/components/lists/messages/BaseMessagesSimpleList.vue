<template>
  <MessageItem
    v-for="messageData in messages"
    :key="messageData.uuid"
    :messageData="messageData"
  />
</template>

<script>
import MessageItem from './BaseMessagesSimpleList/MessageItem.vue'

export default {
  name: 'BaseMessagesSimpleList',
  components: {
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
