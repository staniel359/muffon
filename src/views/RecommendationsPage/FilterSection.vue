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
import ArtistsFilterBlock from './FilterSection/ArtistsFilterBlock.vue'
import TagsFilterBlock from './FilterSection/TagsFilterBlock.vue'
import FilterScopeSelect from './FilterSection/FilterScopeSelect.vue'
import FilterItems from './FilterSection/FilterItems.vue'
import {
  isObjectChanged
} from '*/helpers/utils'

export default {
  name: 'FilterSection',
  components: {
    BaseAccordionContainer,
    ArtistsFilterBlock,
    TagsFilterBlock,
    FilterScopeSelect,
    FilterItems
  },
  inject: [
    'setFilterScope',
    'setFilterValue'
  ],
  data () {
    return {
      filterScope: null,
      filterItems: [],
      filterComponents: {
        artists: 'ArtistsFilterBlock',
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
      return this.filterComponents[
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
      this.focusInput()
    },
    handleFilterScopeSelect (
      value
    ) {
      this.filterScope = value
    },
    async handleFilterScopeChange (
      value
    ) {
      this.filterItems = []

      this.setFilterScope(
        value
      )

      await this.$nextTick()

      this.focusInput()
    },
    handleFilterItemsChange (
      value
    ) {
      this.filterItems = value
    },
    handleFilterValueChange (
      value,
      oldValue
    ) {
      const isChanged =
        isObjectChanged(
          value,
          oldValue
        )

      if (isChanged) {
        this.setFilterValue(
          value
        )
      }
    },
    formatFilterItem (
      filterItemData
    ) {
      return filterItemData.id
    },
    focusInput () {
      this.$refs
        .filter
        .focusInput()
    }
  }
}
</script>

<style lang="sass" scoped>
.filters-block-container
  @extend .d-flex, .align-items-center
</style>
