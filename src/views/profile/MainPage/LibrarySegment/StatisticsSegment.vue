<template>
  <BaseSegmentContainer
    :response-data="libraryData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <BaseProfileLibraryStatistics
      v-if="libraryData"
      :library-data="libraryData"
    />
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLibraryStatistics
  from '*/components/models/profile/library/BaseProfileLibraryStatistics.vue'
import getProfileLibrary from '*/helpers/actions/api/profile/library/get'

export default {
  name: 'StatisticsSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLibraryStatistics
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryData () {
      return this.profileData?.library
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileLibrary,
    handleRefresh () {
      this.fetchData()
    },
    fetchData () {
      this.getProfileLibrary(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
