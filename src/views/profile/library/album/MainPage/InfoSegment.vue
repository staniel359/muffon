<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <BaseSegmentContainer>
      <div class="main-profile-page-info">
        <AlbumSection
          :album-data="albumData"
        />

        <ArtistSection
          :album-data="albumData"
          :profile-id="profileId"
        />
      </div>

      <SelfSection
        :album-data="albumData"
        :profile-id="profileId"
      />

      <BaseDivider />

      <SinceSection
        :album-data="albumData"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import AlbumSection from './InfoSegment/AlbumSection.vue'
import ArtistSection from './InfoSegment/ArtistSection.vue'
import SelfSection from './InfoSegment/SelfSection.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import SinceSection from './InfoSegment/SinceSection.vue'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    AlbumSection,
    ArtistSection,
    SelfSection,
    BaseDivider,
    SinceSection
  },
  props: {
    albumData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
