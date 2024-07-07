<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getProfileFavorites from '@/helpers/actions/api/profile/favorites/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseProfileFavoritesTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    order: String
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    profileFavoritesArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: 'all',
        order: this.order
      }
    },
    tracksData () {
      return this.profileData?.favorites
    }
  },
  methods: {
    getProfileFavorites,
    getTracksData () {
      return this.getProfileFavorites(
        this.profileFavoritesArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
