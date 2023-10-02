<template>
  <div>
    <div class="middle-aligned">
      <SearchSection
        :tags="tags"
      />

      <ScopeSelect
        :selected="scope"
      />
    </div>
  </div>
</template>

<script>
import SearchSection from './FilterSection/SearchSection.vue'
import ScopeSelect from './FilterSection/ScopeSelect.vue'

export default {
  name: 'FilterSection',
  components: {
    SearchSection,
    ScopeSelect
  },
  props: {
    tags: Array,
    scope: String
  }
}
</script>

<style lang="sass" scoped></style>
