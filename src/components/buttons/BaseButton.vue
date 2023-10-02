<template>
  <div
    ref="button"
    class="ui button main-button"
    :class="[
      buttonColorClass,
      buttonIconClass
    ]"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      class="main-icon"
      :icon="icon"
      :is-with-rtl="isIconWithRtl"
    />

    <BaseIcon
      v-if="leftIcon"
      class="main-list-left-small-icon"
      :class="{
        colored: isLeftIconColored
      }"
      :icon="leftIcon"
      :is-with-rtl="isIconWithRtl"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <BaseIcon
      v-if="rightIcon"
      class="main-list-right-small-icon"
      :icon="rightIcon"
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
    leftIcon: String,
    rightIcon: String,
    text: String,
    isIconWithRtl: Boolean,
    isLeftIconColored: Boolean
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
