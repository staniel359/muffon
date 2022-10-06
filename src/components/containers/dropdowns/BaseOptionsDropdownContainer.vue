<template>
  <div
    class="main-options-dropdown-container"
    :class="dropdownClass"
    @click.prevent.stop
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <BaseButtonContainer
      :class="[
        'compact basic circular',
        'top right pointing',
        'floating dropdown icon',
        'main-options-dropdown-button'
      ]"
      @init="handleDropdownInit"
    >
      <BaseIcon
        icon="ellipsis vertical"
      />

      <div class="menu">
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
import BaseIcon from '@/components/BaseIcon.vue'
import {
  setDropdown
} from '@/helpers/actions/plugins/semantic'
import {
  mainDropdownOptions
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
  data () {
    return {
      dropdown: null
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    dropdownOptions () {
      return mainDropdownOptions(
        {
          action: 'nothing'
        }
      )
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
      this.dropdown,
      this.dropdownOptions
    )
  },
  methods: {
    handleDropdownInit (
      element
    ) {
      this.dropdown = element
    },
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
