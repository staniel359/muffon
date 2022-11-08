<template>
  <div>
    <div class="filter-top-section">
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
      v-if="collection.length"
      :collection="collection"
    />
  </div>
</template>

<script>
import ScopeSelect from './FilterSection/ScopeSelect.vue'
import SearchBlock from './FilterSection/SearchBlock.vue'
import CollectionList from './FilterSection/CollectionList.vue'
import collectionMixin from '@/mixins/collectionMixin'
import {
  isObjectChanged
} from '@/helpers/utils'

export default {
  name: 'FilterSection',
  components: {
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
  props: {
    isShow: Boolean
  },
  data () {
    return {
      scope: 'artists',
      collection: []
    }
  },
  computed: {
    collectionFormatted () {
      return this.collection.map(
        this.formatCollectionItem
      )
    }
  },
  watch: {
    scope: {
      immediate: true,
      handler: 'handleScopeChange'
    },
    isShow: 'handleIsShowChange',
    collection: 'handleCollectionChange'
  },
  methods: {
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
    async handleIsShowChange (
      value
    ) {
      await this.$nextTick()

      if (value) {
        this.focusInput()
      }
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
.filter-top-section
  @extend .d-flex, .align-items-center
</style>
