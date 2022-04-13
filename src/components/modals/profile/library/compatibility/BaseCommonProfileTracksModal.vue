<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    :profile-id="profileId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :profile-id="profileId"
        is-with-artist-name
        is-link-to-library
        is-with-image
        @link-click="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '*/components/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'BaseCommonProfileTracksModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      scope: 'tracks'
    }
  },
  methods: {
    handleLinkClick () {
      this.$refs
        .modal
        .hide()
    },
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
