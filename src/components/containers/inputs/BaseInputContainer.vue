<template>
  <div
    class="ui input main-input"
    :class="{
      inverted: isDarkMode
    }"
  >
    <slot />

    <BaseIcon
      v-if="icon"
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
  name: 'BaseInputContainer',
  components: {
    BaseIcon
  },
  props: {
    icon: String
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
