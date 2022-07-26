<template>
  <div class="main-settings-options-block">
    <BaseDivider
      :text="searchText"
      is-horizontal
    />

    <div>
      <SourceOption />
    </div>
  </div>
</template>

<script>
import BaseDivider from '*/components/BaseDivider.vue'
import SourceOption from './SearchOptions/SourceOption.vue'

export default {
  name: 'SearchOptions',
  components: {
    BaseDivider,
    SourceOption
  },
  computed: {
    searchText () {
      return this.$t(
        'settings.sections.app.search'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
