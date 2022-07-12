<template>
  <BaseProfileLibraryTabContainer
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsTableList
        :[scope]="slotProps[scope]"
        :items-in-row="itemsInRow"
        :profile-id="profileId"
        :is-with-favorite-option="isSelf"
        is-with-image
        is-with-artist-name
        is-with-library
        is-link-to-library
      />
    </template>
  </BaseProfileLibraryTabContainer>
</template>

<script>
import BaseProfileLibraryTabContainer
  from '*/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import BaseAlbumsTableList
  from '*/components/lists/albums/BaseAlbumsTableList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'AlbumsTab',
  components: {
    BaseProfileLibraryTabContainer,
    BaseAlbumsTableList
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
      scope: 'albums',
      limit: 3,
      itemsInRow: 3
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
