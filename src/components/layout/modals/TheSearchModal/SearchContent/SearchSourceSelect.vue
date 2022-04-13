<template>
  <BaseDropdown
    class="floating scrolling scope-select-container"
    selected="lastfm"
    menu-direction="left"
    :options="options"
    :is-selection="false"
    is-only-icon
    @change="handleChange"
  />
</template>

<script>
import BaseDropdown from '*/components/dropdowns/BaseDropdown.vue'
import audioSources from '*/helpers/data/audio/sources'

export default {
  name: 'SearchSourceSelect',
  components: {
    BaseDropdown
  },
  emits: [
    'select'
  ],
  computed: {
    options () {
      return audioSources
    }
  },
  methods: {
    handleChange (
      value
    ) {
      this.$emit(
        'select',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  @extend .no-padding
  margin-left: 1em
</style>
