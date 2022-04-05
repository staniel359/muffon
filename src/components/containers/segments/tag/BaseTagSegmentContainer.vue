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
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
      :profileId="profileId"
    ></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import getTag from '*/helpers/actions/api/tag/get'
import { focusOnSegment } from '*/helpers/actions/layout'

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
      tagData: null,
      topTrackCount: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    getTag,
    fetchData (page) {
      this.getTag({
        ...this.tagArgs,
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
  }
}
</script>

<style lang="sass" scoped></style>
