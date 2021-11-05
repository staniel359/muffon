<template>
  <BaseAccordionContainer
    :title="textFormatted"
    @open="handleOpen"
  >
    <div class="filters-block-container">
      <ProfileArtistsFilterBlock
        v-if="filter === 'artists'"
        ref="filter"
        :artists="artists"
        @change="handleArtistsFilterValueChange"
      />

      <FilterScopeSelect
        @select="handleFilterChange"
      />
    </div>

    <div class="profile-artists-container">
      <div class="ui labels">
        <BaseLabel
          v-for="artistData in artists"
          icon="close"
          :key="artistData.uuid"
          :text="artistData.name"
          isReverse
          @iconClick="handleArtistDeleteButtonClick(artistData.uuid)"
        />
      </div>
    </div>
  </BaseAccordionContainer>
</template>

<script>
import BaseAccordionContainer from '@/containers/BaseAccordionContainer.vue'
import ProfileArtistsFilterBlock
  from './FiltersBlock/ProfileArtistsFilterBlock.vue'
import FilterScopeSelect from './FiltersBlock/FilterScopeSelect.vue'
import BaseLabel from '@/BaseLabel.vue'

export default {
  name: 'FiltersBlock',
  components: {
    BaseAccordionContainer,
    ProfileArtistsFilterBlock,
    FilterScopeSelect,
    BaseLabel
  },
  props: {
    filter: String
  },
  emits: [
    'filterChange',
    'filterValueChange'
  ],
  data () {
    return {
      artists: []
    }
  },
  computed: {
    textFormatted () {
      return this.$t(
        'pages.recommendations.filter'
      )
    },
    artistIds () {
      return this.artists.map(artistData => {
        return artistData.id
      })
    }
  },
  watch: {
    artists: 'handleArtistsChange'
  },
  methods: {
    handleOpen () {
      this.$refs.filter.focusInput()
    },
    handleFilterChange (value) {
      this.$emit(
        'filterChange',
        value
      )
    },
    handleArtistsChange (value) {
      this.$emit(
        'filterValueChange',
        this.artistIds
      )
    },
    handleArtistsFilterValueChange (value) {
      this.artists = value
    },
    handleArtistDeleteButtonClick (uuid) {
      const isMatchedArtist = artistData => {
        return artistData.uuid !== uuid
      }

      this.artists = [
        ...this.artists.filter(
          isMatchedArtist
        )
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.filters-block-container
  @extend .d-flex, .align-items-center

.profile-artists-container
  margin-top: 1em
</style>
