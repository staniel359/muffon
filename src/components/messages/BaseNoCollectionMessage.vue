<template>
  <BaseMessage
    :icons="icons"
    :header="header"
    :content="content"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseMessage from '@/components/messages/BaseMessage.vue'

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
  data () {
    return {
      icons: [
        'question'
      ]
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
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
