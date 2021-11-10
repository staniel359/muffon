<template>
  <div class="ui segments">
    <BaseSegmentContainer
      class="main-segment-container"
    >
      <BaseLinkContainer
        class="main-profile-page-info"
        :link="artistMainLinkFormatted"
      >
        <BaseArtistImage
          class="circular bordered main-profile-page-image"
          size="medium"
          :image="image"
          :artistName="artistName"
        />

        <BaseHeader
          class="link"
          tag="h3"
          :text="artistName"
        />

        <BaseSelfIcons
          :favoriteId="favoriteId"
        />
      </BaseLinkContainer>

      <BaseDivider />

      <div class="main-profile-page-info">
        <div>
          {{ sinceFormatted }}
        </div>
        <strong>
          {{ createdFormatted }}
        </strong>
      </div>
    </BaseSegmentContainer>

    <BaseSegmentContainer
      v-if="isRenderOptions"
    >
      <div class="main-options-dropdown-container-right">
        <BaseOptionsDropdown
          model="artist"
          :artistName="artistName"
          :favoriteId="favoriteId"
          isWithFavoriteOption
          isWithDeleteOption
          @delete="handleDeleteOptionClick"
        />
      </div>

      <BaseProfileLibraryDeleteModal
        ref="deleteModal"
        model="artist"
        :profileId="profileId"
        :modelId="artistId"
        :modelTitle="artistName"
        isDeleteWithRedirect
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseDivider from '@/BaseDivider.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BaseProfileLibraryDeleteModal
  from '@/models/profile/library/BaseProfileLibraryDeleteModal.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { isCurrentProfile } from '#/utils'
import { date as formatDate } from '#/formatters'

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
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
    },
    sinceFormatted () {
      return this.$t(
        'pages.library.since'
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
      this.$refs.deleteModal.show()
    },
    setFavoriteId (value) {
      this.favoriteId = value
    }
  }
}
</script>

<style lang="sass" scoped>
.main-profile-page-image
  width: 120px
  height: 120px

.main-self-icons
  margin-top: 0.25em
</style>
