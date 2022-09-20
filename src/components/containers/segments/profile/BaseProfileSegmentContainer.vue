<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :profile-data="profileData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getProfile from '@/helpers/actions/api/profile/get'

export default {
  name: 'BaseProfileSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isGetData: {
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
    if (this.isGetData) {
      this.getData()
    }
  },
  methods: {
    getProfile,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfile(
        {
          ...this.profileArgs,
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
