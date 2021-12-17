<template>
  <BaseMessage
    :icons="icons"
    :header="header"
    :content="content"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseMessage from '@/messages/BaseMessage.vue'

export default {
  name: 'BaseNoCollectionMessage',
  components: {
    BaseMessage
  },
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    icons () {
      return ['question']
    },
    header () {
      return this.$t(
        `noCollection.header.${this.scope}`
      )
    },
    content () {
      return this.$t(
        'noCollection.content'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
