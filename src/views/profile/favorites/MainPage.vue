<template>
  <BaseProfileFavoritesPageContainer
    :profileId="profileId"
  >
    <ArtistsSegment
      :profileId="profileId"
      :isWithDeleteOption="isWithDeleteOption"
    />

    <AlbumsSegment
      :profileId="profileId"
      :isWithDeleteOption="isWithDeleteOption"
    />

    <TracksSegment
      :profileId="profileId"
      :isWithDeleteOption="isWithDeleteOption"
    />
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import { isCurrentProfile } from '*/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileFavoritesPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
