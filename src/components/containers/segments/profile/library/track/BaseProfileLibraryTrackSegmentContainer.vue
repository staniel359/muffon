<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :track-data="trackData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '*/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getProfileLibraryTrack
  from '*/helpers/actions/api/profile/library/track/get'

export default {
  name: 'BaseProfileLibraryTrackSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    libraryTrackArgs () {
      return {
        profileId: this.profileId,
        libraryTrackId: this.libraryTrackId,
        scope: this.scope,
        limit: this.limit
      }
    },
    trackData () {
      return this.profileData?.library?.track
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibraryTrack,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryTrack(
        {
          ...this.libraryTrackArgs,
          page
        }
      )
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>
