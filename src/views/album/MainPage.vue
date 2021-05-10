<template>
  <BaseAlbumPageContainer @init="handleContainerInit">
    <template #default="pageSlotProps">
      <BaseAlbumPageSegmentContainer :key="key">
        <template #default="segmentSlotProps">
          <div class="columns-container">
            <LeftColumn
              :albumData="segmentSlotProps.albumData || pageSlotProps.albumData"
              :scrollable="container"
            />
            <RightColumn
              :albumData="segmentSlotProps.albumData || pageSlotProps.albumData"
              :requestAlbumData="segmentSlotProps.requestAlbumData || pageSlotProps.requestAlbumData"
            />
          </div>
        </template>
      </BaseAlbumPageSegmentContainer>
    </template>
  </BaseAlbumPageContainer>
</template>

<script>
import BaseAlbumPageContainer
  from '@/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseAlbumPageSegmentContainer
  from '@/containers/pages/album/BaseAlbumPageSegmentContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import { generateKey } from '#/utils'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseAlbumPageSegmentContainer,
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
.columns-container
  @extend .d-flex
</style>
