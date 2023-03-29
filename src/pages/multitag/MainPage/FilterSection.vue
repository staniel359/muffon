<template>
  <div>
    <div class="search-scope-section">
      <SearchSection
        :tags="tags"
      />

      <ScopeSelect
        :selected="scope"
      />
    </div>

    <TagsSection
      v-if="tags.length"
      :tags="tags"
    />
  </div>
</template>

<script>
import SearchSection from './FilterSection/SearchSection.vue'
import ScopeSelect from './FilterSection/ScopeSelect.vue'
import TagsSection from './FilterSection/TagsSection.vue'

export default {
  name: 'FilterSection',
  components: {
    SearchSection,
    ScopeSelect,
    TagsSection
  },
  props: {
    tags: {
      type: Array,
      default () {
        return []
      }
    },
    scope: String
  }
}
</script>

<style lang="sass" scoped>
.search-scope-section
  @extend .d-flex, .align-items-center
</style>
