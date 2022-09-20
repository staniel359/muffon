<template>
  <div
    ref="button"
    class="ui button main-simple-button"
    :class="{
      inverted: isDarkMode,
      icon: !!icon && !text
    }"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <span
      v-if="text"
      v-text="text"
    />

    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseButtonContainer',
  components: {
    BaseIcon
  },
  props: {
    icon: String,
    text: String
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
    )
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
