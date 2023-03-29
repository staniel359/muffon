<template>
  <BaseProfileFavoritesTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistsSimpleList
        :artists="slotProps[scope]"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoritesTabContainer>
</template>

<script>
import BaseProfileFavoritesTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoritesTabContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'ArtistsTab',
  components: {
    BaseProfileFavoritesTabContainer,
    BaseArtistsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      limit:
        artistsLimits.simple.small,
      scope: 'artists'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
