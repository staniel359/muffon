<template>
  <BaseSegmentContainer>
    <div class="main-search-container">
      <ScopeSelect
        :scope="scope"
        @select="handleScopeSelect"
      />

      <template
        v-if="scope"
      >
        <div
          v-if="isScopeWithModel"
          class="main-right-section"
        >
          <Component
            :is="searchComponent"
            ref="input"
            @select="handleSearchSelect"
          />
        </div>

        <BaseClearButton
          v-if="modelName"
          @click="handleClearButtonClick"
        />

        <div class="main-right-section">
          <Component
            :is="modelScopeSelectComponent"
            @select="handleModelScopeSelect"
          />
        </div>
      </template>
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import ScopeSelect from './SearchSegment/selects/ScopeSelect.vue'
import TopScopeSelect from './SearchSegment/selects/TopScopeSelect.vue'
import TagScopeSelect from './SearchSegment/selects/TagScopeSelect.vue'
import ArtistScopeSelect from './SearchSegment/selects/ArtistScopeSelect.vue'
import TagsSearchInput from './SearchSegment/inputs/TagsSearchInput.vue'
import ArtistsSearchInput from './SearchSegment/inputs/ArtistsSearchInput.vue'
import BaseClearButton from '@/components/buttons/BaseClearButton.vue'
import RecommendationsScopeSelect
  from './SearchSegment/selects/RecommendationsScopeSelect.vue'

export default {
  name: 'SearchSegment',
  components: {
    BaseSegmentContainer,
    ScopeSelect,
    TopScopeSelect,
    TagScopeSelect,
    ArtistScopeSelect,
    TagsSearchInput,
    ArtistsSearchInput,
    BaseClearButton,
    RecommendationsScopeSelect
  },
  props: {
    scope: String,
    modelName: String,
    isScopeWithModel: Boolean
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
        top: 'TopScopeSelect',
        tag: 'TagScopeSelect',
        artist: 'ArtistScopeSelect',
        recommendations: 'RecommendationsScopeSelect'
      }
    }
  },
  computed: {
    searchComponent () {
      return this.searchComponents[this.scope]
    },
    modelScopeSelectComponent () {
      return this.modelScopeSelectComponents[this.scope]
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

      if (this.isScopeWithModel) {
        this.focusInput()
      }
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

      this.clearInput()

      this.focusInput()
    },
    handleModelScopeSelect (
      value
    ) {
      this.$emit(
        'modelScopeChange',
        value
      )

      if (this.isScopeWithModel) {
        this.focusInput()
      }
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
