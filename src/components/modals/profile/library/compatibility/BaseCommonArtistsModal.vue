<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    :profile-id="profileId"
    :scope="scope"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :profile-id="profileId"
        is-link-to-library
        is-with-page-option
        is-with-share-option
        @link-click="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '@/components/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'BaseCommonArtistsModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseArtistsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
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
