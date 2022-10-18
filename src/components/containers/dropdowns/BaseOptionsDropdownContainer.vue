<template>
  <div
    class="main-options-dropdown-container"
    :class="dropdownClass"
    @click.prevent.stop
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseButtonContainer
      ref="dropdown"
      :class="[
        'compact basic circular icon',
        'floating scrolling dropdown',
        'main-options-dropdown-button'
      ]"
    >
      <BaseIcon
        icon="ellipsis vertical"
      />

      <div class="left menu">
        <slot />
      </div>
    </BaseButtonContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  setDropdown
} from '@/helpers/actions/plugins/semantic'
import {
  optionsDropdownOptions
} from '@/helpers/data/plugins/semantic'

export default {
  name: 'BaseOptionsDropdownContainer',
  components: {
    BaseButtonContainer,
    BaseIcon
  },
  emits: [
    'activeChange'
  ],
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    dropdownOptions () {
      return optionsDropdownOptions()
    },
    dropdownClass () {
      if (this.isDarkMode) {
        return 'background black'
      } else {
        return 'background white'
      }
    }
  },
  mounted () {
    setDropdown(
      this.$refs.dropdown.$el,
      this.dropdownOptions
    )
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
