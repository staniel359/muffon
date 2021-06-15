<template>
  <BaseAlbumPageContainer
    @init="handleContainerInit"
  >
    <template #default="slotProps">
      <BaseAlbumPageSegmentContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template #default>
          <div class="columns-container">
            <LeftColumn
              :albumData="slotProps.albumData"
              :scrollable="scrollable"
            />
            <RightColumn
              :albumData="slotProps.albumData"
              :requestAlbumData="slotProps.requestAlbumData"
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

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseAlbumPageSegmentContainer,
    LeftColumn,
    RightColumn
  },
  data () {
    return {
      scrollable: null
    }
  },
  methods: {
    handleContainerInit (el) {
      this.scrollable = el
    }
  }
}
</script>

<style lang="sass" scoped>
.columns-container
  @extend .d-flex
</style>
