<template>
  <BaseSegmentContainer
    class="raised top attached variants-list"
    @init="handleSegmentInit"
  >
    <BaseListContainer class="selection">
      <BaseTrackVariantContainer
        v-for="variantData in variantsCollection"
        :key="variantData.uuid"
        class="item main-simple-list-item"
        :variant-data="variantData"
      >
        <template #default="slotProps">
          <BaseTrackContent
            :track-data="variantData"
            :is-loading="slotProps.isLoading"
            :is-error="slotProps.isError"
            :is-current="slotProps.isCurrent"
            :is-with-self-icons="false"
            is-with-image
            is-with-artist-name
            is-with-album-title
            is-with-duration
          />
        </template>
      </BaseTrackVariantContainer>
    </BaseListContainer>
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import BaseTrackVariantContainer
  from '*/components/containers/track/BaseTrackVariantContainer.vue'
import BaseTrackContent from '*/components/models/track/BaseTrackContent.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'VariantsList',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseTrackVariantContainer,
    BaseTrackContent
  },
  data () {
    return {
      segment: null
    }
  },
  computed: {
    ...mapState(
      'player',
      {
        playerVariants: 'variants'
      }
    ),
    variantsCollection () {
      return formatCollection(
        this.playerVariants
      )
    }
  },
  watch: {
    playerVariants: 'handleVariantsChange'
  },
  methods: {
    handleSegmentInit (
      element
    ) {
      this.segment = element
    },
    handleVariantsChange () {
      this.scrollToListTop()
    },
    scrollToListTop () {
      this.segment.scrollTo(
        0,
        0
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.variants-list
  @extend .no-margin, .h-100, .overflow-y-auto, .pointer-events-auto
  &.inverted
    border-color: $colorGreyInverted !important
</style>
