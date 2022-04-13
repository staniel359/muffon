<template>
  <div
    ref="segment"
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseHeaderSegment
      :scope="scope"
      :link="headerLink"
    />

    <slot
      :tag-data="tagData"
      :profile-id="profileId"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTag from '*/helpers/actions/api/tag/get'
import {
  focusOnSegment
} from '*/helpers/actions/layout'

export default {
  name: 'BaseTagSegmentContainer',
  components: {
    BaseHeaderSegment
  },
  props: {
    tagName: {
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
      isLoading: false,
      error: null,
      tagData: null
    }
  },
  computed: {
    ...mapState(
      'profile',
      {
        profileInfo: 'info'
      }
    ),
    profileId () {
      return this.profileInfo.id.toString()
    },
    tagArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getTag,
    fetchData (
      page
    ) {
      this.getTag(
        {
          ...this.tagArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
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
