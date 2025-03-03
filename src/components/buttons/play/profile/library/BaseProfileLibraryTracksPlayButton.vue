<template>
  <BasePlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import getProfileLibrary from '@/helpers/actions/api/profile/library/get'
import getProfileLibrarySearch
  from '@/helpers/actions/api/profile/library/search/get'
import playableListMixin from '@/mixins/playableListMixin'

export default {
  name: 'BaseProfileLibraryTracksPlayButton',
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    order: String,
    query: String
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    profileLibraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: 'all',
        order: this.order,
        query: this.query
      }
    },
    tracksData () {
      return this.profileData?.library
    }
  },
  methods: {
    getProfileLibrary,
    getProfileLibrarySearch,
    getTracksData () {
      if (this.query) {
        return this.getProfileLibrarySearch(
          this.profileLibraryArgs
        )
      } else {
        return this.getProfileLibrary(
          this.profileLibraryArgs
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
