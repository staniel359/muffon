<template>
  <BaseSegmentContainer>
    <div class="scope-select-container">
      <ScopeSelect
        @select="handleScopeSelect"
      />

      <template v-if="scope">
        <Component
          :is="searchComponent"
          ref="input"
          class="search-container"
          @select="handleSearchSelect"
        />

        <BaseClearButton
          v-if="modelName"
          class="clear-button"
          @click="handleClearButtonClick"
        />

        <Component
          :is="modelScopeSelectComponent"
          class="model-scope-select-container"
          @select="handleModelScopeSelect"
        />
      </template>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import ScopeSelect from './SearchSegment/selects/ScopeSelect.vue'
import TagScopeSelect from './SearchSegment/selects/TagScopeSelect.vue'
import ArtistScopeSelect from './SearchSegment/selects/ArtistScopeSelect.vue'
import TagsSearchInput from './SearchSegment/inputs/TagsSearchInput.vue'
import ArtistsSearchInput from './SearchSegment/inputs/ArtistsSearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'SearchSegment',
  components: {
    BaseSegmentContainer,
    ScopeSelect,
    TagScopeSelect,
    ArtistScopeSelect,
    TagsSearchInput,
    ArtistsSearchInput,
    BaseClearButton
  },
  props: {
    scope: String,
    modelName: String
  },
  emits: [
    'scopeChange',
    'modelNameChange',
    'modelScopeChange'
  ],
  data () {
    return {
      searchComponents: {
        tag: 'TagsSearchInput',
        artist: 'ArtistsSearchInput'
      },
      modelScopeSelectComponents: {
        tag: 'TagScopeSelect',
        artist: 'ArtistScopeSelect'
      }
    }
  },
  computed: {
    searchComponent () {
      return this.searchComponents[
        this.scope
      ]
    },
    modelScopeSelectComponent () {
      return this.modelScopeSelectComponents[
        this.scope
      ]
    }
  },
  methods: {
    async handleScopeSelect (
      value
    ) {
      this.$emit(
        'scopeChange',
        value
      )

      this.$emit(
        'modelNameChange',
        null
      )

      await this.$nextTick()

      this.$refs
        .input
        .focus()
    },
    handleSearchSelect (
      value
    ) {
      this.$emit(
        'modelNameChange',
        value
      )
    },
    handleClearButtonClick () {
      this.$emit(
        'modelNameChange',
        null
      )

      this.$refs
        .input
        .clear()
    },
    handleModelScopeSelect (
      value
    ) {
      this.$emit(
        'modelScopeChange',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.scope-select-container
  @extend .d-flex, .align-items-center

.search-container
  margin-left: 1em

.clear-button
  margin-left: 1em !important

.model-scope-select-container
  margin-left: 1em
  width: 150px
</style>
