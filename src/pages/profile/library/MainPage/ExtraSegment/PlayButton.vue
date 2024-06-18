<template>
  <BasePlayableListPlayButton
    :is-loading="isLoading"
    :error="error"
    :checked-options="checkedOptions"
    @click="handleClick"
  />
</template>

<script>
import BasePlayableListPlayButton
  from '@/components/buttons/BasePlayableListPlayButton.vue'
import getProfileLibrary from '@/helpers/actions/api/profile/library/get'
import playableListMixin from '@/mixins/playableListMixin'
import {
  getObjectKeysWithTrueValues
} from '@/helpers/utils'

export default {
  name: 'PlayButton',
  components: {
    BasePlayableListPlayButton
  },
  mixins: [
    playableListMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.tracksCount
      }
    },
    tracksCount () {
      return this.libraryData.tracks_count
    },
    queueTracks () {
      return this.profileData?.library?.tracks
    },
    checkedOptions () {
      return getObjectKeysWithTrueValues(
        this.checkableOptions
      )
    }
  },
  methods: {
    getProfileLibrary,
    handleClick () {
      this.getProfileLibrary(
        this.libraryArgs
      ).then(
        this.handleQueueTracksGet
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
