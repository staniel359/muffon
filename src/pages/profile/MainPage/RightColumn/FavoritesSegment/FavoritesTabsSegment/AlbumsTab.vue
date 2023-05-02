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
      <BaseAlbumsSimpleList
        :albums="slotProps[scope]"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-artist-name
        is-with-source
        is-with-created
        is-favorite
        is-with-library-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseProfileFavoritesTabContainer>
</template>

<script>
import BaseProfileFavoritesTabContainer
  from '@/components/containers/tabs/profile/favorites/BaseProfileFavoritesTabContainer.vue'
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'

export default {
  name: 'AlbumsTab',
  components: {
    BaseProfileFavoritesTabContainer,
    BaseAlbumsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    isActive: Boolean
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      limit:
        albumsLimits.simple.extrasmall,
      scope: 'albums'
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
