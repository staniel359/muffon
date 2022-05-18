<template>
  <div
    v-if="favoriteId || isSelf"
    class="main-self-container"
  >
    <BaseSelfIcons
      :favorite-id="favoriteId"
    />

    <template
      v-if="isSelf"
    >
      <BaseOptionsDropdown
        model="album"
        :album-title="albumTitle"
        :artist-name="artistName"
        :favorite-id="favoriteId"
        is-with-favorite-option
        is-with-delete-option
        @delete-option-click="handleDeleteOptionClick"
      />

      <BaseLibraryDeleteModal
        ref="deleteModal"
        model="album"
        :profile-id="profileId"
        :model-id="libraryAlbumId"
        :model-name="albumFullTitle"
        is-delete-with-redirect
      />
    </template>
  </div>
</template>

<script>
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseLibraryDeleteModal
  from '*/components/modals/library/BaseLibraryDeleteModal.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'SelfSection',
  components: {
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseLibraryDeleteModal
  },
  provide () {
    return {
      setFavoriteId: this.setFavoriteId
    }
  },
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
  data () {
    return {
      favoriteId: null
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
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
    }
  },
  mounted () {
    this.favoriteId =
      this.albumData.favorite_id?.toString()
  },
  methods: {
    handleDeleteOptionClick () {
      this.showDeleteModal()
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
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
