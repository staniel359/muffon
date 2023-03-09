<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-created
        is-link-to-library
        is-compatibility
        is-with-page-option
        is-with-source-option
        is-with-library-option
        is-with-playlist-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-queue-option
        is-with-share-option
        @link-click="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '@/components/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseCommonTracksModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      limit:
        tracksLimits.simple.large,
      scope: 'tracks'
    }
  },
  methods: {
    handleLinkClick () {
      this.hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>
