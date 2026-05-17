<template>
  <div class="fitted item">
    <BaseButton
      class="basic large main-navbar-button"
      :class="{
        disabled: isDisabled
      }"
      :icon="icon"
      is-icon-with-rtl
      @click="handleClick"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'

export default {
  name: 'NavbarHistoryButton',
  components: {
    BaseButton
  },
  props: {
    direction: {
      type: String,
      required: true
    },
    icon: String
  },
  data () {
    return {
      isDisabled: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: 'handleRouteChange'
    }
  },
  methods: {
    handleRouteChange () {
      this.isDisabled = this.checkIfDisabled()
    },
    handleClick () {
      this.$router[this.direction]()
    },
    checkIfDisabled () {
      switch (this.direction) {
        case 'back': {
          return !navigation.canGoBack
        }
        case 'forward': {
          return !navigation.canGoForward
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
