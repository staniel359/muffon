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

      <BaseAlbumOptionsDropdown
        :album-data="albumData"
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
        model="album"
        :profile-id="profileId"
        :model-id="libraryAlbumId"
        :model-name="albumFullTitle"
        is-with-redirect
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseSelfIcons from '@/components/models/self/BaseSelfIcons.vue'
import BaseAlbumOptionsDropdown
  from '@/components/dropdowns/album/BaseAlbumOptionsDropdown.vue'
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
    BaseAlbumOptionsDropdown,
    BaseLibraryDeleteModal
  },
  mixins: [
    selfMixin
  ],
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    modelData () {
      return this.albumData
    },
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    libraryAlbumId () {
      return this.albumData.library.id.toString()
    },
    albumFullTitle () {
      return [
        this.artistName,
        this.albumTitle
      ].join(
        ' - '
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
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
