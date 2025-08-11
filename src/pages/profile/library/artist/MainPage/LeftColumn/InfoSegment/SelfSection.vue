<template>
  <div class="main-self-container main-bottom-small-section">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-icon="!isSelf"
    />

    <BaseArtistOptionsPopup
      :artist-data="artistData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-option="!isSelf"
      :is-with-delete-option="isSelf"
      is-link-to-library
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-share-option
      is-with-external-link-option
      is-delete-with-redirect
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsPopup
  from '@/components/popups/artist/BaseArtistOptionsPopup.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseArtistOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    profileId: {
      type: Number,
      required: true
    },
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.artistData
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
