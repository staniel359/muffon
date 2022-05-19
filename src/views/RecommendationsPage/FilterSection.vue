<template>
  <BaseAccordionContainer
    :title="filterText"
    @open="handleOpen"
  >
    <div class="filter-section">
      <ScopeSelect
        :selected="scope"
      />

      <SearchBlock
        ref="search"
        :scope="scope"
        :collection="collection"
      />
    </div>

    <CollectionList
      :collection="collection"
    />
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer
  from '*/components/containers/BaseAccordionContainer.vue'
import ScopeSelect from './FilterSection/ScopeSelect.vue'
import SearchBlock from './FilterSection/SearchBlock.vue'
import CollectionList from './FilterSection/CollectionList.vue'
import collectionMixin from '*/mixins/collectionMixin'
import {
  isObjectChanged
} from '*/helpers/utils'

export default {
  name: 'FilterSection',
  components: {
    BaseAccordionContainer,
    ScopeSelect,
    SearchBlock,
    CollectionList
  },
  mixins: [
    collectionMixin
  ],
  provide () {
    return {
      setScope: this.setScope,
      reset: this.reset
    }
  },
  inject: [
    'setFilterScope',
    'setFilterValue'
  ],
  data () {
    return {
      scope: 'artists',
      collection: []
    }
  },
  computed: {
    filterText () {
      return this.$t(
        'recommendations.filter'
      )
    },
    collectionFormatted () {
      return this.collection.map(
        this.formatCollectionItem
      )
    }
  },
  watch: {
    scope: 'handleScopeChange',
    collection: 'handleCollectionChange'
  },
  methods: {
    handleOpen () {
      this.focusInput()
    },
    async handleScopeChange (
      value
    ) {
      this.setFilterScope(
        value
      )

      this.reset()

      await this.$nextTick()

      this.focusInput()
    },
    handleCollectionChange (
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
          this.collectionFormatted
        )
      }
    },
    setScope (
      value
    ) {
      this.scope = value
    },
    formatCollectionItem (
      collectionItemData
    ) {
      return collectionItemData.name
    },
    reset () {
      this.collection = []
    },
    focusInput () {
      this.$refs
        .search
        .focusInput()
    }
  }
}
</script>

<style lang="sass" scoped>
.filter-section
  @extend .d-flex, .align-items-center
</style>
