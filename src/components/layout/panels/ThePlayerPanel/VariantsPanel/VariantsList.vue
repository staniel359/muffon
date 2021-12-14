<template>
  <BaseSegmentContainer
    class="raised top attached variants-list"
    @init="handleSegmentInit"
  >
    <BaseListContainer class="selection">
      <BaseTrackVariantContainer
        v-for="variantData in variantsCollection"
        class="item main-simple-list-item"
        :key="variantData.uuid"
        :variantData="variantData"
      >
        <template #default="slotProps">
          <BaseTrackContent
            :trackData="variantData"
            :isLoading="slotProps.isLoading"
            :isError="slotProps.isError"
            :isCurrent="slotProps.isCurrent"
            :isWithSelfIcons="false"
            isWithImage
            isWithArtistName
            isWithAlbumTitle
            isWithDuration
          />
        </template>
      </BaseTrackVariantContainer>
    </BaseListContainer>
  </BaseSegmentContainer>
</template>

<script>
import { mapState } from 'vuex'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer from '@/containers/lists/BaseListContainer.vue'
import BaseTrackVariantContainer
  from '@/containers/track/BaseTrackVariantContainer.vue'
import BaseTrackContent from '@/models/track/BaseTrackContent.vue'
import { collection as formatCollection } from '#/formatters'

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
    ...mapState('player', {
      playerVariants: 'variants'
    }),
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
    handleSegmentInit (el) {
      this.segment = el
    },
    handleVariantsChange () {
      this.scrollToListTop()
    },
    scrollToListTop () {
      this.segment.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.variants-list
  @extend .no-margin, .h-100, .overflow-y-auto, .pointer-events-auto, .no-border
</style>
