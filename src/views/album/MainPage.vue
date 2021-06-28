<template>
  <BaseAlbumPageContainer>
    <template #default="slotProps">
      <BaseAlbumPageSegmentContainer
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <template #default>
          <AlbumSourceSelect
            :albumData="slotProps.albumData"
          />

          <BaseDivider />

          <div
            class="columns-container"
            ref="scrollable"
          >
            <LeftColumn
              v-if="$refs.scrollable"
              :albumData="slotProps.albumData"
              :scrollable="$refs.scrollable"
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
import AlbumSourceSelect from './MainPage/AlbumSourceSelect.vue'
import BaseDivider from '@/BaseDivider.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseAlbumPageSegmentContainer,
    AlbumSourceSelect,
    BaseDivider,
    LeftColumn,
    RightColumn
  }
}
</script>

<style lang="sass" scoped>
.columns-container
  @extend .d-flex
</style>
