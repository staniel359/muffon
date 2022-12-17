<template>
  <Component
    :is="component"
    icon="library"
    :text="actionText"
    :is-loading="isLoading"
    :link="link"
    @click="handleClick"
  />
</template>

<script>
import BaseLinkOption from '../BaseLinkOption.vue'
import BaseOption from '../BaseOption.vue'

export default {
  name: 'BaseLibraryOption',
  components: {
    BaseLinkOption,
    BaseOption
  },
  props: {
    action: {
      type: String,
      required: true
    },
    isLoading: Boolean,
    link: Object
  },
  emits: [
    'click'
  ],
  data () {
    return {
      actionTextKeys: {
        add: 'addTo',
        show: 'show'
      }
    }
  },
  computed: {
    component () {
      if (this.link) {
        return 'BaseLinkOption'
      } else {
        return 'BaseOption'
      }
    },
    actionText () {
      return this.$t(
        `actions.${this.actionTextKey}.library`
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
