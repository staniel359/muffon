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
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        :top-tracks-count="slotProps.topTracksCount"
        is-with-artist-name
        is-link-to-library
        is-compatibility
        is-with-library
        is-with-source
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
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'BaseCommonAlbumsModal',
  components: {
    BaseLibraryCommonModalContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: Number
  },
  data () {
    return {
      limit:
        albumsLimits.simple.large,
      scope: 'albums'
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
