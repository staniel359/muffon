<template>
  <div
    class="ui raised segments main-segment-container"
    ref="segment"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :profileData="profileData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :refresh="refresh"
    ></slot>
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getProfile from '*/helpers/actions/api/profile/get'
import { focusOnSegment } from '*/helpers/actions/layout'

export default {
  name: 'BaseProfileSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isFetchData: {
      type: Boolean,
      default: true
    },
    profileId: String,
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
    profileArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    if (this.isFetchData) {
      this.fetchData()
    }
  },
  methods: {
    getProfile,
    fetchData (page) {
      this.getProfile({
        ...this.profileArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
    },
    focus () {
      focusOnSegment(
        this.$refs.segment
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
