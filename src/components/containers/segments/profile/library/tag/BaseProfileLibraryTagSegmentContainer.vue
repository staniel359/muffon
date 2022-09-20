<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :tag-data="tagData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getProfileLibraryTag
  from '@/helpers/actions/api/profile/library/tag/get'

export default {
  name: 'BaseProfileLibraryTagSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTagId: {
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
    libraryTagArgs () {
      return {
        profileId: this.profileId,
        libraryTagId: this.libraryTagId,
        scope: this.scope,
        limit: this.limit
      }
    },
    tagData () {
      return this.profileData?.library?.tag
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfileLibraryTag,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryTag(
        {
          ...this.libraryTagArgs,
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
