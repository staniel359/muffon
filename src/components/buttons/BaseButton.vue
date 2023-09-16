<template>
  <div
    ref="button"
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
      :is-with-rtl="isIconWithRtl"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <BaseIcon
      v-if="icon && isReverse"
      class="right"
      :icon="icon"
      :is-with-rtl="isIconWithRtl"
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
    isTransparent: {
      type: Boolean,
      default: true
    },
    icon: String,
    text: String,
    isReverse: Boolean,
    isIconWithRtl: Boolean
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
          if (this.isTransparent) {
            return 'inverted'
          } else {
            return 'inverted background-black'
          }
        } else {
          return null
        }
      } else {
        if (this.isTransparent) {
          return null
        } else {
          return 'background-white'
        }
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
    },
    click () {
      this.$refs
        .button
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>
