<template>
  <div
    class="ui button main-simple-button"
    :class="[
      buttonColorClass,
      buttonIconClass
    ]"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon && !isReverse"
      :icon="icon"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <BaseIcon
      v-if="icon && isReverse"
      :icon="icon"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'BaseButton',
  components: {
    BaseIcon
  },
  props: {
    isInvertable: {
      type: Boolean,
      default: true
    },
    icon: String,
    text: String,
    isReverse: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    buttonColorClass () {
      if (this.isDarkMode) {
        if (this.isInvertable) {
          return 'inverted'
        } else {
          return null
        }
      } else {
        return null
      }
    },
    buttonIconClass () {
      if (
        !!this.icon &&
          !this.text
      ) {
        return 'icon'
      } else {
        return null
      }
    }
  },
  methods: {
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
