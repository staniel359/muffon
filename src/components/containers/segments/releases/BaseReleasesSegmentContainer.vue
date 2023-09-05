<template>
  <slot
    :releases-data="releasesData"
    :is-loading="isLoading"
    :error="error"
  />
</template>

<script>
import getReleases from '@/helpers/actions/api/releases/get'

export default {
  name: 'BaseReleasesSegmentContainer',
  provide () {
    return {
      getData: this.getData
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number
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
    }
  }
}
</script>

<style lang="sass" scoped></style>
