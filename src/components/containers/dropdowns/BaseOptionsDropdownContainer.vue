<template>
  <div
    class="main-options-dropdown-container"
    :class="dropdownClass"
    @click.prevent.stop
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
  mounted () {
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
