<template>
  <BaseMessage
    :icons="icons"
    :header="header"
    :content="content"
  />
</template>

<script>
import { mapState } from 'vuex'
import BaseMessage from '@/BaseMessage.vue'

export default {
  name: 'NoCollectionMessage',
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
        `shared.paginated.noCollection.header.${this.scope}`
      )
    },
    content () {
      return this.$t(
        'shared.paginated.noCollection.content'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
