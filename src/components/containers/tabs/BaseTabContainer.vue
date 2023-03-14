<template>
  <div
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot
      v-if="isActivated"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseTabContainer',
  props: {
    isActive: Boolean
  },
  data () {
    return {
      isActivated: false
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  },
  watch: {
    isActive: {
      immediate: true,
      handler: 'handleIsActiveChange'
    }
  },
  methods: {
    handleIsActiveChange (
      value
    ) {
      if (value) {
        this.isActivated = true
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
