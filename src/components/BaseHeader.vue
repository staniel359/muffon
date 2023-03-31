<template>
  <Component
    :is="tag"
    class="ui header main-header"
    :class="{
      inverted: isDarkMode,
      'center aligned icon': isPage
    }"
  >
    <BaseIcon
      v-if="icon"
      :class="{
        big: isPage
      }"
      :icon="icon"
    />

    {{ text }}

    <div
      v-if="isPage"
      class="sub header"
      v-text="subheader"
    />
  </Component>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'

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
    icon: String,
    isPage: Boolean,
    subheader: String
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    )
  }
}
</script>

<style lang="sass" scoped></style>
