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
        ref="filter"
        :is="filterComponent"
        :[filterScope]="filterItems"
        @change="handleFilterItemsChange"
      />
    </div>

    <FilterItems
      :filterItems="filterItems"
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
      return this.filterItems.map(filterItemData => {
        return filterItemData.id
      })
    }
  },
  watch: {
    filterScope: 'handleFilterScopeChange',
    filterValue: 'handleFilterValueChange'
  },
  methods: {
    handleOpen () {
      this.$refs.filter.focusInput()
    },
    handleFilterScopeSelect (value) {
      this.filterItems = []

      this.$emit(
        'filterScopeChange',
        value
      )
    },
    handleFilterScopeChange (value) {
      this.$nextTick(() => {
        this.$refs.filter.focusInput()
      })
    },
    handleFilterItemsChange (value) {
      this.filterItems = value
    },
    handleFilterValueChange (newValue, oldValue) {
      const isChanged = (
        JSON.stringify(newValue) !==
          JSON.stringify(oldValue)
      )

      if (isChanged) {
        this.$emit(
          'filterValueChange',
          newValue
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.filters-block-container
  @extend .d-flex, .align-items-center
</style>
