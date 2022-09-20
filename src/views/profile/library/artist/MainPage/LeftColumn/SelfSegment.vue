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

      <BaseArtistOptionsDropdown
        :artist-data="artistData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        @delete-option-click="handleDeleteOptionClick"
      />

      <BaseLibraryDeleteModal
        v-if="isSelf"
        ref="deleteModal"
        model="artist"
        :profile-id="profileId"
        :model-id="libraryArtistId"
        :model-name="artistName"
        is-delete-with-redirect
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseArtistOptionsDropdown
  from '@/components/dropdowns/artist/BaseArtistOptionsDropdown.vue'
import BaseLibraryDeleteModal
  from '@/components/modals/library/BaseLibraryDeleteModal.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import selfMixin from '@/mixins/selfMixin'

export default {
  name: 'SelfSegment',
  components: {
    BaseSegmentContainer,
    BaseSelfIcons,
    BaseArtistOptionsDropdown,
    BaseLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.artistData
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    artistName () {
      return this.artistData.name
    },
    libraryArtistId () {
      return this.artistData.library.id.toString()
    }
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    showDeleteModal () {
      this.$refs
        .deleteModal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>
