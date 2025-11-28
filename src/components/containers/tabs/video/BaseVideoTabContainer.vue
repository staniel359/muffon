<template>
  <BasePaginatedTabContainer
    :response-data="videoData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[scope]="slotProps[scope]"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getVideo from '@/helpers/actions/api/video/get'
import {
  similar as formatVideoSimilarLink
} from '@/helpers/formatters/links/video'

export default {
  name: 'BaseVideoTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      videoData: null
    }
  },
  computed: {
    videoArgs () {
      return {
        videoId: this.videoId,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'similar':
          return formatVideoSimilarLink(
            {
              videoId: this.videoId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getVideo,
    getData (
      {
        page
      } = {}
    ) {
      this.getVideo(
        {
          ...this.videoArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
