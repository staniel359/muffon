<template>
  <BaseProfileFavoritesPaginatedSegmentContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="slotProps">
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :is-with-delete-option="isWithDeleteOption"
        is-with-artist-name
        is-favorite
      />
    </template>
  </BaseProfileFavoritesPaginatedSegmentContainer>
</template>

<script>
import BaseProfileFavoritesPaginatedSegmentContainer
  from '*/components/containers/segments/profile/favorites/BaseProfileFavoritesPaginatedSegmentContainer.vue'
import BaseAlbumsSimpleList
  from '*/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  albums as formatProfileFavoriteAlbumsLink
} from '*/helpers/formatters/links/profile/favorites'

export default {
  name: 'AlbumsSegment',
  components: {
    BaseProfileFavoritesPaginatedSegmentContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    isWithDeleteOption: Boolean
  },
  data () {
    return {
      limit: 5,
      scope: 'albums'
    }
  },
  computed: {
    headerLink () {
      return formatProfileFavoriteAlbumsLink(
        {
          profileId: this.profileId
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
