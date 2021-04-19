<template>
  <div
    class="ui top attached segment variants-list"
    ref="list"
  >
    <div class="ui selection list">
      <BaseVariantContainer
        v-for="(variantData, index) in variantsFormatted"
        class="item main-simple-list-item"
        :key="variantData.uuid"
        :variantData="variantData"
        :index="index"
      >
        <template #default="variantSlotProps">
          <BaseTrackContent
            :trackData="variantData"
            :isLoading="variantSlotProps.isLoading"
            :isError="variantSlotProps.isError"
            :isCurrent="variantSlotProps.isCurrent"
            isWithArtistName
            isWithLength
          />
        </template>
      </BaseVariantContainer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseVariantContainer
  from '@/containers/track/variant/BaseVariantContainer.vue'
import BaseTrackContent from '@/models/track/BaseTrackContent.vue'
import { collection as formatCollection } from '#/formatters'
import {
  resetCurrentVariantIndex as resetPlayerCurrentVariantIndex
} from '#/actions/player'

export default {
  name: 'VariantsList',
  components: {
    BaseVariantContainer,
    BaseTrackContent
  },
  computed: {
    ...mapState('player', {
      playerVariants: 'variants'
    }),
    variantsFormatted () {
      return formatCollection(
        this.playerVariants
      )
    }
  },
  watch: {
    playerVariants: 'handleVariantsChange'
  },
  methods: {
    handleVariantsChange () {
      this.scrollToListTop()

      resetPlayerCurrentVariantIndex()
    },
    scrollToListTop () {
      this.$refs.list.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="sass" scoped>
.variants-list
  @extend .no-margin, .h-100, .overflow-y-auto, .pointer-events-auto
</style>
