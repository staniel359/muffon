<template>
  <BaseAccordionContainer
    :title="filterText"
    @open="handleOpen"
  >
    <div class="filters-block-container">
      <FilterScopeSelect
        @select="handleFilterScopeSelect"
      />

      <Component
        :is="filterComponent"
        ref="filter"
        :[filterScope]="filterItems"
        @change="handleFilterItemsChange"
      />
    </div>

    <FilterItems
      :filter-items="filterItems"
      @change="handleFilterItemsChange"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import ProfileArtistsFilterBlock
  from './BaseRecommendationsFilters/ProfileArtistsFilterBlock.vue'
import TagsFilterBlock
  from './BaseRecommendationsFilters/TagsFilterBlock.vue'
import FilterScopeSelect
  from './BaseRecommendationsFilters/FilterScopeSelect.vue'
import FilterItems from './BaseRecommendationsFilters/FilterItems.vue'

export default {
  name: 'BaseRecommendationsFilters',
  components: {
    BaseAccordionContainer,
    ProfileArtistsFilterBlock,
    TagsFilterBlock,
    FilterScopeSelect,
    FilterItems
  },
  props: {
    filterScope: String
  },
  emits: [
    'filterScopeChange',
    'filterValueChange'
  ],
  data () {
    return {
      filterItems: [],
      filters: {
        artists: 'ProfileArtistsFilterBlock',
        tags: 'TagsFilterBlock'
      }
    }
  },
  computed: {
    filterText () {
      return this.$t(
        'recommendations.filter'
      )
    },
    filterComponent () {
      return this.filters[
        this.filterScope
      ]
    },
    filterValue () {
      return this.filterItems.map(
        this.formatFilterItem
      )
    }
  },
  watch: {
    filterScope: 'handleFilterScopeChange',
    filterValue: 'handleFilterValueChange'
  },
  methods: {
    handleOpen () {
      this.$refs
        .filter
        .focusInput()
    },
    handleFilterScopeSelect (
      value
    ) {
      this.filterItems = []

      this.$emit(
        'filterScopeChange',
        value
      )
    },
    async handleFilterScopeChange (
      value
    ) {
      await this.$nextTick()

      this.$refs
        .filter
        .focusInput()
    },
    handleFilterItemsChange (
      value
    ) {
      this.filterItems = value
    },
    handleFilterValueChange (
      newValue,
      oldValue
    ) {
      const isChanged = (
        JSON.stringify(
          newValue
        ) !==
          JSON.stringify(
            oldValue
          )
      )

      if (isChanged) {
        this.$emit(
          'filterValueChange',
          newValue
        )
      }
    },
    formatFilterItem (
      filterItemData
    ) {
      return filterItemData.id
    }
  }
}
</script>

<style lang="sass" scoped>
.filters-block-container
  @extend .d-flex, .align-items-center
</style>
