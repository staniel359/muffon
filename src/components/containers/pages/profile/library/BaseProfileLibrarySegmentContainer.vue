<template>
  <div
    class="ui segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :profileId="profileId"
      :scope="scope"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :libraryData="libraryData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import HeaderSegment
  from './BaseProfileLibrarySegmentContainer/HeaderSegment.vue'
import fetchLibraryData from '#/actions/api/profile/library/fetchData'
import { focusOnSegment } from '#/actions/layout'

export default {
  name: 'BaseProfileLibrarySegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    libraryDataArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryData () {
      return this.profileData?.library
    }
  },
  methods: {
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    fetchLibraryData,
    fetchData (page) {
      this.fetchLibraryData({
        ...this.libraryDataArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(
          this.$refs.segment
        )
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="sass" scoped></style>
