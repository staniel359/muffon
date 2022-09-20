<template>
  <BaseHeaderSegmentsContainer
    ref="segment"
    :scope="scope"
    :header-link="headerLink"
  >
    <slot
      :releases-data="releasesData"
      :is-loading="isLoading"
      :error="error"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import getReleases from '@/helpers/actions/api/releases/get'

export default {
  name: 'BaseReleasesSegmentContainer',
  components: {
    BaseHeaderSegmentsContainer
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    headerLink: Object
  },
  data () {
    return {
      releasesData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    releasesArgs () {
      return {
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getReleases,
    getData (
      {
        page
      } = {}
    ) {
      this.getReleases(
        {
          ...this.releasesArgs,
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
