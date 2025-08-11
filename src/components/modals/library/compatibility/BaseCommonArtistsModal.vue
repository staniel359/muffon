<template>
  <BaseLibraryCommonModalContainer
    ref="modal"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        :top-albums-count="slotProps.topAlbumsCount"
        is-link-to-library
        is-compatibility
        is-with-library
        is-with-created
        is-with-page-option
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        @link-click="handleLinkClick"
      />
    </template>
  </BaseLibraryCommonModalContainer>
</template>

<script>
import BaseLibraryCommonModalContainer
  from '@/components/containers/modals/library/BaseLibraryCommonModalContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseCommonArtistsModal',
  components: {
    BaseLibraryCommonModalContainer,
    BaseArtistsSimpleList
  },
  props: {
    profileId: Number
  },
  data () {
    return {
      limit:
        artistsLimits.simple.large,
      scope: 'artists'
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
