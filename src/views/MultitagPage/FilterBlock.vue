<template>
  <div>
    <div class="scope-search-section">
      <ScopeSelect
        :selected="scope"
      />

      <SearchSection
        :tags="tags"
      />
    </div>

    <TagsSection
      v-if="tags.length"
      :tags="tags"
    />
  </div>
</template>

<script>
import ScopeSelect from './FilterBlock/ScopeSelect.vue'
import SearchSection from './FilterBlock/SearchSection.vue'
import TagsSection from './FilterBlock/TagsSection.vue'

export default {
  name: 'FilterBlock',
  components: {
    ScopeSelect,
    SearchSection,
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
.scope-search-section
  @extend .d-flex, .align-items-center
</style>
