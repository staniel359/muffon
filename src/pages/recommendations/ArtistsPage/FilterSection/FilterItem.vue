<template>
  <div>
    <div class="middle-aligned">
      <BaseIcon
        class="main-left-small-icon"
        :icon="actionIcon"
      />

      <BaseIcon
        class="main-left-small-icon"
        :icon="model"
      />

      <div
        class="main-left-section"
        v-text="filterTextFormatted"
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
import {
  camelCase
} from 'camel-case'
import BaseIcon from '@/components/icons/BaseIcon.vue'
import SearchBlock from './FilterItem/SearchBlock.vue'
import CollectionList from './FilterItem/CollectionList.vue'
import collectionMixin from '@/mixins/collectionMixin'
import {
  isObjectChanged
} from '@/helpers/utils'

export default {
  name: 'FilterItem',
  components: {
    BaseIcon,
    SearchBlock,
    CollectionList
  },
  mixins: [
    collectionMixin
  ],
  provide () {
    return {
      clearCollection:
        this.clearCollection
    }
  },
  inject: [
    'updateFilterData'
  ],
  props: {
    filterItemData: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isShow: Boolean
  },
  data () {
    return {
      collection: []
    }
  },
  computed: {
    actionIcon () {
      return camelCase(
        this.rawActionName
      )
    },
    rawActionName () {
      return `filter.${this.action}`
    },
    action () {
      return this.filterItemData.action
    },
    model () {
      return this.filterItemData.model
    },
    filterTextFormatted () {
      return `${this.filterText}:`
    },
    filterText () {
      return this.$t(
        `filter.${this.action}.${this.scope}`
      )
    },
    scope () {
      return this.filterItemData.scope
    },
    collectionFormatted () {
      return this.collection.map(
        this.formatCollectionItem
      )
    },
    filterData () {
      return {
        [this.filterNameFormatted]:
          this.collectionFormatted
      }
    },
    filterNameFormatted () {
      return camelCase(
        this.rawFilterName
      )
    },
    rawFilterName () {
      return `${this.scope}.${this.action}`
    },
    isFocusInput () {
      return (
        this.isShow && !this.index
      )
    }
  },
  watch: {
    isShow: 'handleIsShowChange',
    collection: 'handleCollectionChange'
  },
  methods: {
    async handleIsShowChange () {
      if (this.isFocusInput) {
        await this.$nextTick()

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
        this.updateFilterData(
          this.filterData
        )
      }
    },
    focusInput () {
      this.$refs
        .search
        .focusInput()
    },
    formatCollectionItem (
      collectionItemData
    ) {
      return collectionItemData.name
    },
    clearCollection () {
      this.collection = []
    }
  }
}
</script>

<style lang="sass" scoped></style>
