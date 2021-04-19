<template>
  <BasePageContainer>
    <template #default="pageSlotProps">
      <InfoSegment :tagName="pageSlotProps.tagName" />
      <ArtistsSegment :tagName="pageSlotProps.tagName" />
      <AlbumsSegment :tagName="pageSlotProps.tagName" />
      <TracksSegment :tagName="pageSlotProps.tagName" />
    </template>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/tag/BasePageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BasePageContainer,
    InfoSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
  }
}
</script>

<style lang="sass" scoped></style>
