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
        'compact basic circular',
        'icon floating dropdown',
        'main-options-dropdown-button',
        {
          scrolling: isScrolling
        }
      ]"
    >
      <BaseIcon
        icon="dotsVertical"
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
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseButtonContainer
  from '@/components/containers/buttons/BaseButtonContainer.vue'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import {
  setDropdown
} from '@/helpers/actions/plugins/semantic'
import {
  optionsDropdownOptions
} from '@/helpers/formatters/semantic'

export default {
  name: 'BaseOptionsDropdownContainer',
  components: {
    BaseButtonContainer,
    BaseIcon
  },
  props: {
    isScrolling: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'activeChange'
  ],
  computed: {
    ...mapState(
      layoutStore,
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
  async mounted () {
    await this.$nextTick()

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
