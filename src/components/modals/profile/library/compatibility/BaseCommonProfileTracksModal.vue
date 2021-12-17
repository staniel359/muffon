<template>
  <BaseProfileLibraryCommonModalContainer
    ref="modal"
    scope="tracks"
    :profileId="profileId"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :profileId="profileId"
        isWithArtistName
        isLinkToLibrary
        isWithImage
        @linkClick="handleLinkClick"
      />
    </template>
  </BaseProfileLibraryCommonModalContainer>
</template>

<script>
import BaseProfileLibraryCommonModalContainer
  from '@/containers/modals/profile/library/BaseProfileLibraryCommonModalContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'BaseCommonProfileTracksModal',
  components: {
    BaseProfileLibraryCommonModalContainer,
    BaseTracksSimpleList
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
