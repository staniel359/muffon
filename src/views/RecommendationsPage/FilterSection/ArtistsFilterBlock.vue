<template>
  <div class="artists-search-container">
    <SearchInput
      ref="input"
      :artists="artists"
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="artists.length"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './ArtistsFilterBlock/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'ArtistsFilterBlock',
  components: {
    SearchInput,
    BaseClearButton
  },
  props: {
    artists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'change'
  ],
  methods: {
    handleSelect (
      value
    ) {
      const artists = [
        ...this.artists,
        value
      ]

      this.changeArtists(
        artists
      )
    },
    handleClearButtonClick () {
      this.changeArtists(
        []
      )

      this.clearInput()
    },
    changeArtists (
      value
    ) {
      this.$emit(
        'change',
        value
      )
    },
    focusInput () {
      this.$refs
        .input
        .focus()
    },
    clearInput () {
      this.$refs
        .input
        .clear()
    }
  }
}
</script>

<style lang="sass" scoped>
.artists-search-container
  @extend .d-flex, .align-items-center
</style>
