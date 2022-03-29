<template>
  <BaseDropdown
    class="scope-select-container"
    selected="lastfm"
    :options="options"
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
    handleChange (value) {
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
  margin-left: 1em
  width: 135px
</style>
