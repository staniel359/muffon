<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode
    }"
  >
    <BaseIcon
      v-if="icon"
      :icon="icon"
    />

    <span
      v-text="text"
    />
  </Component>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseIcon from '@/components/BaseIcon.vue'

export default {
  name: 'BaseHeader',
  components: {
    BaseIcon
  },
  props: {
    tag: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: String
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
