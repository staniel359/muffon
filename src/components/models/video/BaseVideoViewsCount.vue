<template>
  <BaseIcon
    v-if="isLoading"
    is-loading
  />
  <BaseListCounterSection
    v-else-if="viewsCountComputed"
    icon="watch"
    :count="viewsCountComputed"
  />
</template>

<script>
import BaseIcon from '@/components/icons/BaseIcon.vue'
import BaseListCounterSection
  from '@/components/sections/BaseListCounterSection.vue'

import getVideo from '@/helpers/actions/api/video/get'

export default {
  name: 'BaseVideoViewsCount',
  components: {
    BaseIcon,
    BaseListCounterSection
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    viewsCount: Number
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      videoData: null,
      isLoading: false,
      scope: 'views_count'
    }
  },
  computed: {
    viewsCountComputed () {
      return (
        this.viewsCount ||
          this.responseViewsCount
      )
    },
    responseViewsCount () {
      return this.videoData?.views_count
    },
    videoArgs () {
      return {
        videoId: this.videoId,
        scope: this.scope
      }
    }
  },
  watch: {
    viewsCountComputed:
      'handleViewsCountComputedChange'
  },
  mounted () {
    if (!this.viewsCount) {
      this.getData()
    }
  },
  methods: {
    getVideo,
    handleViewsCountComputedChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    getData () {
      this.getVideo(
        this.videoArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
