<template>
  <BasePaginatedTabContainer
    :response-data="trackData"
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
import getTrack from '@/helpers/actions/api/track/get'
import {
  similar as formatTrackSimilarLink,
  albums as formatTrackAlbumsLink
} from '@/helpers/formatters/links/track'

export default {
  name: 'BaseTrackTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    artistName: {
      type: String,
      required: true
    },
    trackTitle: {
      type: String,
      required: true
    },
    requestTrackData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      trackData: null
    }
  },
  computed: {
    trackArgs () {
      return {
        ...this.requestTrackData,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'similar':
          return formatTrackSimilarLink(
            {
              artistName: this.artistName,
              trackTitle: this.trackTitle
            }
          )
        case 'albums':
          return formatTrackAlbumsLink(
            {
              artistName: this.artistName,
              trackTitle: this.trackTitle,
              sourceParams:
                this.requestTrackData
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getTrack,
    getData (
      {
        page
      } = {}
    ) {
      this.getTrack(
        {
          ...this.trackArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
