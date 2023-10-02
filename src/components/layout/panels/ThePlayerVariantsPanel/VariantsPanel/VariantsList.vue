<template>
  <BaseSegmentContainer
    ref="segment"
    class="raised top attached blurred main-segment no-margin variants-list height-100 overflow-y-auto pointer-events-auto"
  >
    <BaseListContainer
      class="selection"
    >
      <BaseTrackVariantContainer
        v-for="variantData in variantsCollection"
        :key="variantData.uuid"
        class="item main-simple-list-item middle-aligned"
        :variant-data="variantData"
        :is-from-radio="isFromRadio"
      >
        <template
          #default="slotProps"
        >
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
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseListContainer
  from '@/components/containers/lists/BaseListContainer.vue'
import BaseTrackVariantContainer
  from '@/components/containers/track/BaseTrackVariantContainer.vue'
import BaseTrackContent from '@/components/models/track/BaseTrackContent.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'VariantsList',
  components: {
    BaseSegmentContainer,
    BaseListContainer,
    BaseTrackVariantContainer,
    BaseTrackContent
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        playerVariants: 'variants'
      }
    ),
    variantsCollection () {
      return formatCollection(
        this.playerVariants
      )
    },
    isFromRadio () {
      return this.playerPlaying?.from_radio
    }
  },
  watch: {
    playerVariants: 'handleVariantsChange'
  },
  methods: {
    handleVariantsChange () {
      this.scrollToTop()
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>
