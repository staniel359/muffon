<template>
  <BaseSegmentContainer
    class="main-profile-page-info"
  >
    <div class="main-self-container">
      <BaseSelfIcons
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-icon="!isSelf"
      />

      <BaseAlbumOptionsPopup
        :album-data="albumData"
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
        is-delete-with-redirect
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseAlbumOptionsPopup
  from '@/components/popups/album/BaseAlbumOptionsPopup.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSegment',
  components: {
    BaseSegmentContainer,
    BaseSelfIcons,
    BaseAlbumOptionsPopup
  },
  mixins: [
    selfMixin
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.albumData
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
