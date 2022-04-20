<template>
  <div class="profile-artists-search-container">
    <SearchInput
      ref="input"
      :artists="artists"
      @select="handleSelect"
    />

    <BaseClearButton
      v-if="artists.length"
      class="reset-button"
      @click="handleClearButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './ProfileArtistsFilterBlock/SearchInput.vue'
import BaseClearButton from '*/components/buttons/BaseClearButton.vue'

export default {
  name: 'ProfileArtistsFilterBlock',
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
.profile-artists-search-container
  @extend .d-flex, .align-items-center

.reset-button
  margin-left: 1em
</style>
