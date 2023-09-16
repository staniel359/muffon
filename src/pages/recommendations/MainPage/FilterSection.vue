<template>
  <div>
    <FilterItem
      v-for="(filterItemData, index) in filterItems"
      :key="index"
      ref="filterItem"
      class="filter-item"
      :filter-item-data="filterItemData"
      :index="index"
      :is-show="isShow"
    />

    <div class="main-form-submit-button-container">
      <div class="filter-action-button-section">
        <BaseClearButton
          v-if="isRenderClearButton"
          @click="handleClearButtonClick"
        />
      </div>

      <div class="filter-action-button-section">
        <BaseSubmitButton
          action-key="filter"
          @click="handleSubmitButtonClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterItem from './FilterSection/FilterItem.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'FilterSection',
  components: {
    FilterItem,
    BaseClearButton,
    BaseSubmitButton
  },
  provide () {
    return {
      updateFilterData:
        this.updateFilterData
    }
  },
  inject: [
    'setFilterArgs'
  ],
  props: {
    isShow: Boolean
  },
  data () {
    return {
      filterData: {},
      filterItems: [
        {
          action: 'include',
          scope: 'artists',
          model: 'artist'
        },
        {
          action: 'exclude',
          scope: 'artists',
          model: 'artist'
        },
        {
          action: 'include',
          scope: 'tags',
          model: 'tag'
        },
        {
          action: 'exclude',
          scope: 'tags',
          model: 'tag'
        }
      ]
    }
  },
  computed: {
    isRenderClearButton () {
      return this.isAnyCollections
    },
    isAnyCollections () {
      return !!Object.values(
        this.filterData
      ).flat().length
    }
  },
  methods: {
    handleSubmitButtonClick () {
      this.setFilterArgs(
        this.filterData
      )
    },
    handleClearButtonClick () {
      this.$refs
        .filterItem
        .forEach(
          this.clearFilterItemCollection
        )

      this.setFilterArgs(
        {}
      )
    },
    updateFilterData (
      value
    ) {
      this.filterData = {
        ...this.filterData,
        ...value
      }
    },
    clearFilterItemCollection (
      filterItem
    ) {
      filterItem.clearCollection()
    }
  }
}
</script>

<style lang="sass" scoped>
.filter-item
  &:not(:first-child)
    margin-top: 1.5em

.filter-action-button-section
  @extend .d-flex, .align-items-center
[dir="ltr"]
  .filter-action-button-section
    &:not(:first-child)
      margin-left: 1em
[dir="rtl"]
  .filter-action-button-section
    &:not(:first-child)
      margin-right: 1em
</style>
