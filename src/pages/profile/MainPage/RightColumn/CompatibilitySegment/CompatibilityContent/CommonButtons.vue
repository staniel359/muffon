<template>
  <div class="d-inline-flex main-bottom-small-section">
    <ArtistsButton
      :compatibility-data="compatibilityData"
      :profile-id="profileId"
    />

    <AlbumsButton
      :compatibility-data="compatibilityData"
      :profile-id="profileId"
    />

    <TracksButton
      :compatibility-data="compatibilityData"
      :profile-id="profileId"
    />
  </div>
</template>

<script>
import ArtistsButton from './CommonButtons/ArtistsButton.vue'
import AlbumsButton from './CommonButtons/AlbumsButton.vue'
import TracksButton from './CommonButtons/TracksButton.vue'

export default {
  name: 'CommonButtons',
  components: {
    ArtistsButton,
    AlbumsButton,
    TracksButton
  },
  props: {
    compatibilityData: Object,
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>
