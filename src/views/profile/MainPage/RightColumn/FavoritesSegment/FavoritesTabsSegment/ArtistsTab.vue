<template>
  <BaseProfileFavoriteTabContainer
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
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
      />
    </template>
  </BaseProfileFavoriteTabContainer>
</template>

<script>
import BaseProfileFavoriteTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import BaseArtistsSimpleList
  from '@/components/lists/artists/BaseArtistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  artists as artistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ArtistsTab',
  components: {
    BaseProfileFavoriteTabContainer,
    BaseArtistsSimpleList
  },
  props: {
    profileId: String,
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      limit:
        artistsLimits.simple.extrasmall,
      scope: 'artists'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
