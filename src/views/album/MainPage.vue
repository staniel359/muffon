<template>
  <BasePageContainer @init="handleContainerInit">
    <template #default="pageSlotProps">
      <BasePageSegmentContainer
        class="segment-container"
        :key="key"
      >
        <template #default="segmentSlotProps">
          <LeftColumn
            :albumData="segmentSlotProps.albumData || pageSlotProps.albumData"
            :scrollable="container"
          />
          <RightColumn
            :albumData="segmentSlotProps.albumData || pageSlotProps.albumData"
            :requestAlbumData="segmentSlotProps.requestAlbumData || pageSlotProps.requestAlbumData"
          />
        </template>
      </BasePageSegmentContainer>
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/album/BasePageContainer.vue'
import BasePageSegmentContainer
  from '@/containers/pages/album/BasePageSegmentContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import { generateKey } from '#/utils'

export default {
  name: 'MainPage',
  components: {
    BasePageContainer,
    BasePageSegmentContainer,
    LeftColumn,
    RightColumn
  },
  provide () {
    return {
      resetAlbum: this.resetAlbum
    }
  },
  data () {
    return {
      container: null,
      key: null
    }
  },
  methods: {
    handleContainerInit (el) {
      this.container = el
    },
    resetAlbum () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>
