<template>
  <BaseAlbumPageContainer>
    <template #default="slotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <AlbumSourceSelect
            :albumData="slotProps.albumData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="album-segment"
          :isLoading="slotProps.isLoading"
          :error="slotProps.error"
          @init="handleInit"
          @refresh="slotProps.handleRefresh"
        >
          <template #default>
            <LeftColumn
              v-if="scrollable"
              :albumData="slotProps.albumData"
              :scrollable="scrollable"
            />

            <RightColumn
              :albumData="slotProps.albumData"
              :requestAlbumData="slotProps.requestAlbumData"
              :profileId="slotProps.profileId"
            />
          </template>
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseAlbumPageContainer>
</template>

<script>
import BaseAlbumPageContainer
  from '@/containers/pages/album/BaseAlbumPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import AlbumSourceSelect from './MainPage/AlbumSourceSelect.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlbumPageContainer,
    BaseSegmentContainer,
    AlbumSourceSelect,
    LeftColumn,
    RightColumn
  },
  data () {
    return {
      scrollable: null
    }
  },
  methods: {
    handleInit (el) {
      this.scrollable = el
    }
  }
}
</script>

<style lang="sass" scoped>
.main-page-segment-container
  @extend .d-flex

.album-segment
  @extend .flex-full, .d-flex
</style>
