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
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseButton',
  components: {
    BaseIcon
  },
  props: {
    icon: String,
    text: String,
    isReverse: Boolean,
    isPlain: Boolean
  },
  emits: [
    'init',
    'click'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    buttonColorClass () {
      if (this.isPlain) {
        if (this.isDarkMode) {
          return 'black'
        } else {
          return 'white'
        }
      } else {
        if (this.isDarkMode) {
          return 'inverted'
        } else {
          return null
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
  mounted () {
    this.$emit(
      'init',
      this.$refs.button
    )
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
