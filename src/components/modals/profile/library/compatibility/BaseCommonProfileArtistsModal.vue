<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    scope="artists"
    :profileId="profileId"
  >
    <template #default="slotProps">
      <BaseArtistsSimpleList
        :artists="slotProps.artists"
        :profileId="profileId"
        isLinkToLibrary
        @linkClick="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '@/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseArtistsSimpleList from '@/lists/artists/BaseArtistsSimpleList.vue'

export default {
  name: 'BaseCommonProfileArtistsModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseArtistsSimpleList
  },
  props: {
    profileId: String
  },
  methods: {
    handleLinkClick () {
      this.$refs.modal.hide()
    },
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
