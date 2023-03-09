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
      <BaseTracksSimpleList
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-source
        is-with-created
        is-favorite
        is-with-source-option
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseProfileFavoriteTabContainer>
</template>

<script>
import BaseProfileFavoriteTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoriteTabContainer.vue'
import BaseTracksSimpleList
  from '@/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  tracks as tracksLimits
} from '@/helpers/data/limits'

export default {
  name: 'TracksTab',
  components: {
    BaseProfileFavoriteTabContainer,
    BaseTracksSimpleList
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
        tracksLimits.simple.extrasmall,
      scope: 'tracks'
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
