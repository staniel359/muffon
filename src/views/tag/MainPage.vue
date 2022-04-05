<template>
  <BaseTagPageContainer
    :tagName="tagName"
  >
    <template #default="slotProps">
      <InfoSegment
        :tagData="slotProps.tagData"
      />

      <ArtistsSegment
        :tagName="slotProps.tagName"
      />

      <AlbumsSegment
        :tagName="slotProps.tagName"
      />

      <TracksSegment
        :tagName="slotProps.tagName"
      />
    </template>
  </BaseTagPageContainer>
</template>

<script>
import BaseTagPageContainer
  from '*/components/containers/pages/tag/BaseTagPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTagPageContainer,
    InfoSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
  },
  props: {
    tagName: String
  }
}
</script>

<style lang="sass" scoped></style>
