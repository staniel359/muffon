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
      <BaseAlbumsSimpleList
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="!isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-artist-name
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
import BaseAlbumsSimpleList
  from '@/components/lists/albums/BaseAlbumsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'

export default {
  name: 'AlbumsTab',
  components: {
    BaseProfileFavoriteTabContainer,
    BaseAlbumsSimpleList
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
      limit: 3,
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
