<template>
  <BaseIcon
    v-if="isOnlyIcon"
    class="main-dropdown-icon"
    :class="{
      colored: isIconColored
    }"
    :icon="icon"
  />
  <div
    v-else
    class="text main-dropdown-item flex-full"
    :class="{
      inverted: isDarkMode,
      default: (
        isFormField && !value
      )
    }"
  >
    <template
      v-if="header"
    >
      <div
        v-if="isFormField"
        v-text="header"
      />
      <h5
        v-else
        class="header main-header"
        v-text="header"
      />
    </template>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseIcon from '@/components/icons/BaseIcon.vue'

export default {
  name: 'SelectedSection',
  components: {
    BaseIcon
  },
  props: {
    isOnlyIcon: Boolean,
    isIconColored: Boolean,
    icon: String,
    isFormField: Boolean,
    value: String,
    header: String
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
