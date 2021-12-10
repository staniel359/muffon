<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    scope="albums"
    :profileId="profileId"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps.albums"
        :profileId="profileId"
        isWithArtistName
        isLinkToLibrary
        @linkClick="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '@/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseAlbumsSimpleList from '@/lists/albums/BaseAlbumsSimpleList.vue'

export default {
  name: 'BaseCommonProfileAlbumsModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseAlbumsSimpleList
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
