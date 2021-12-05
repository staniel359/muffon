<template>
  <div class="profile-artists-search-container">
    <SearchInput
      ref="input"
      :artists="artists"
      @addArtist="handleAddArtist"
    />

    <BaseClearButton
      v-if="artists.length"
      class="reset-button"
      @click="handleResetButtonClick"
    />
  </div>
</template>

<script>
import SearchInput from './ProfileArtistsFilterBlock/SearchInput.vue'
import BaseClearButton from '@/buttons/BaseClearButton.vue'

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
    handleAddArtist (value) {
      const artists = [
        ...this.artists,
        value
      ]

      this.changeArtists(
        artists
      )
    },
    handleResetButtonClick () {
      this.changeArtists([])

      this.$refs.input.clear()
    },
    changeArtists (value) {
      this.$emit(
        'change',
        value
      )
    },
    focusInput () {
      this.$refs.input.focus()
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
