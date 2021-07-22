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
import { localize } from '#/actions/plugins/i18n'

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
      return localize(
        'shared.paginated.noCollection.header',
        { collection: this.scope }
      )
    },
    content () {
      return localize(
        'shared.paginated.noCollection.content',
        { collection: this.scope }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
