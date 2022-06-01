<template>
  <div
    ref="button"
    class="ui button main-simple-button"
    :class="{
      inverted: isDarkMode,
      icon
    }"
    @click="handleClick"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <slot />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '*/components/BaseIcon.vue'

export default {
  name: 'BaseButtonContainer',
  components: {
    BaseIcon
  },
  props: {
    icon: String
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
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
