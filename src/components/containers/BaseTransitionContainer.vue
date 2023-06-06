<template>
  <Transition>
    <slot
      v-if="isShow"
    />
  </Transition>
</template>

<script>
import {
  set as setVisibility
} from '@/helpers/actions/plugins/semantic/visibility'
import {
  main as mainVisibilityOptions
} from '@/helpers/formatters/plugins/semantic/options/visibility'

export default {
  name: 'BaseTransitionContainer',
  props: {
    scrollable: {
      type: HTMLDivElement,
      required: true
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    visibilityOptions () {
      return mainVisibilityOptions(
        {
          onTopPassed:
            this.handleTopPass,
          onTopPassedReverse:
            this.handleTopReversePass
        }
      )
    }
  },
  mounted () {
    this.initialize()
  },
  activated () {
    this.initialize()
  },
  methods: {
    handleTopPass () {
      this.isShow = true
    },
    handleTopReversePass () {
      this.isShow = false
    },
    initialize () {
      setVisibility(
        this.scrollable,
        this.visibilityOptions
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.v-enter-active,
.v-leave-active
  transition: opacity 0.15s ease

.v-enter-from,
.v-leave-to
  opacity: 0
</style>
