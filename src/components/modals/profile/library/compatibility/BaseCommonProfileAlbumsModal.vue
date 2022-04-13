<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    :profile-id="profileId"
    :scope="scope"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :profile-id="profileId"
        is-with-artist-name
        is-link-to-library
        @link-click="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '*/components/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'BaseCommonProfileAlbumsModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      scope: 'albums'
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
