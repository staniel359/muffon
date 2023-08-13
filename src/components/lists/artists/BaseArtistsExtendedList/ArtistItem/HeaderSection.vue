<template>
  <BaseHeaderContainer
    class="main-artist-name"
    tag="h2"
  >
    <BaseArtistLinkContainer
      class="main-link"
      :artist-data="artistData"
      :is-link-to-library="isLinkToLibrary"
      :profile-id="profileId"
      :is-with-popup="false"
    >
      {{ artistName }}
    </BaseArtistLinkContainer>
  </BaseHeaderContainer>
</template>

<script>
import BaseHeaderContainer
  from '@/components/containers/BaseHeaderContainer.vue'
import BaseArtistLinkContainer
  from '@/components/containers/links/artist/BaseArtistLinkContainer.vue'

export default {
  name: 'HeaderSection',
  components: {
    BaseHeaderContainer,
    BaseArtistLinkContainer
  },
  props: {
    artistData: {
      type: Object,
      required: true
    },
    profileId: String,
    isLinkToLibrary: Boolean
  },
  computed: {
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.main-artist-name
  @extend .width-fit-content
</style>
