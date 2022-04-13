<template>
  <div class="ui raised segments main-segment-container">
    <BaseSegmentContainer>
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="artistMainLink"
      >
        <BaseArtistImage
          class="circular bordered main-profile-page-image"
          size="medium"
          :image-data="imageData"
          :artist-name="artistName"
        />

        <BaseHeader
          class="link"
          tag="h3"
          :text="artistName"
        />
      </BaseLinkContainer>

      <div
        v-if="favoriteId || isRenderOptions"
        class="main-self-container"
      >
        <BaseSelfIcons
          :favorite-id="favoriteId"
        />

        <template
          v-if="isRenderOptions"
        >
          <BaseOptionsDropdown
            model="artist"
            :artist-name="artistName"
            :favorite-id="favoriteId"
            is-with-favorite-option
            is-with-delete-option
            @delete="handleDeleteOptionClick"
          />

          <BaseProfileLibraryDeleteModal
            ref="deleteModal"
            model="artist"
            :profile-id="profileId"
            :model-id="artistId"
            :model-name="artistName"
            is-delete-with-redirect
          />
        </template>
      </div>

      <BaseDivider />

      <div class="main-profile-page-info">
        <div
          v-text="sinceText"
        />

        <strong
          v-text="createdFormatted"
        />
      </div>
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLinkContainer
  from '*/components/containers/links/BaseLinkContainer.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseProfileLibraryDeleteModal
  from '*/components/modals/profile/library/BaseProfileLibraryDeleteModal.vue'
import BaseDivider from '*/components/BaseDivider.vue'
import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'
import {
  isCurrentProfile
} from '*/helpers/utils'
import {
  date as formatDate
} from '*/helpers/formatters'

export default {
  name: 'InfoSegment',
  components: {
    BaseSegmentContainer,
    BaseLinkContainer,
    BaseArtistImage,
    BaseHeader,
    BaseSelfIcons,
    BaseDivider,
    BaseOptionsDropdown,
    BaseProfileLibraryDeleteModal
  },
  provide () {
    return {
      setFavoriteId: this.setFavoriteId
    }
  },
  props: {
    artistData: Object,
    profileId: String,
    artistId: String
  },
  data () {
    return {
      favoriteId: null
    }
  },
  computed: {
    artistMainLink () {
      return formatArtistMainLink(
        {
          artistName: this.artistName
        }
      )
    },
    artistName () {
      return this.artistData.name
    },
    imageData () {
      return this.artistData.image
    },
    sinceText () {
      return this.$t(
        'library.since'
      )
    },
    createdFormatted () {
      return formatDate(
        this.created
      )
    },
    created () {
      return this.artistData.created
    },
    isRenderOptions () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  mounted () {
    this.favoriteId =
      this.artistData.favorite_id?.toString()
  },
  methods: {
    handleDeleteOptionClick () {
      this.$refs
        .deleteModal
        .show()
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px
</style>
