<template>
  <BaseOption
    icon="bookmark"
    :text="actionText"
    :is-loading="isLoading"
    @click="handleClick"
  />
</template>

<script>
import BaseOption from '../BaseOption.vue'

export default {
  name: 'BaseBookmarkOption',
  components: {
    BaseOption
  },
  props: {
    action: {
      type: String,
      required: true
    },
    isLoading: Boolean
  },
  emits: [
    'click'
  ],
  data () {
    return {
      actionTextKeys: {
        add: 'addTo',
        delete: 'deleteFrom'
      }
    }
  },
  computed: {
    actionText () {
      return this.$t(
        `actions.${this.actionTextKey}.bookmarks`
      )
    },
    actionTextKey () {
      return this.actionTextKeys[
        this.action
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
