<template>
  <div
    class="ui segments main-segment-container"
    ref="segment"
  >
    <HeaderSegment
      v-if="headerTextKey"
      :headerTextKey="headerTextKey"
      :formatHeaderLink="formatHeaderLink"
      :tagName="tagName"
    />

    <slot
      :isLoading="isLoading"
      :error="error"
      :tagData="tagData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </div>
</template>

<script>
import HeaderSegment from './BaseSegmentContainer/HeaderSegment.vue'
import fetchTagData from '#/actions/api/tag/fetchData'
import { focusOnSegment } from '#/actions/document'

export default {
  name: 'BaseSegmentContainer',
  components: {
    HeaderSegment
  },
  props: {
    tagName: {
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
      isLoading: false,
      error: null,
      tagData: null,
      topTrackCount: null
    }
  },
  computed: {
    tagDataArgs () {
      return {
        tagName: this.tagName,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.error = null

      this.fetchData(page)
    },
    fetchTagData,
    fetchData (page) {
      this.fetchTagData({
        ...this.tagDataArgs,
        page
      })
    },
    focus () {
      this.$nextTick(() => {
        focusOnSegment(this.$refs.segment)
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
