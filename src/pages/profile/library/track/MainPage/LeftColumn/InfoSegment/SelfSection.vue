<template>
  <div class="main-self-container main-bottom-small-section">
    <BaseSelfIcons
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-icon="!isSelf"
    />

    <BaseTrackOptionsPopup
      :track-data="trackData"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
      :is-with-library-option="!isSelf"
      :is-with-delete-option="isSelf"
      is-link-to-library
      is-with-playlist-option
      is-with-favorite-option
      is-with-bookmark-option
      is-with-listened-option
      is-with-queue-option
      is-with-save-option
      is-with-share-option
      is-with-external-link-option
      is-delete-with-redirect
    />
  </div>
</template>

<script>
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseTrackOptionsPopup
  from '@/components/popups/track/BaseTrackOptionsPopup.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseTrackOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    trackData: {
      type: Object,
      required: true
    },
    profileId: {
      type: Number,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.trackData
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
