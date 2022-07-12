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
      <BaseTracksSimpleList
        :[scope]="slotProps[scope]"
        :profile-id="profileId"
        :is-with-favorite-option="isSelf"
        :is-with-delete-option="isSelf"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-with-created
        is-link-to-library
        is-with-playlist-option
        is-with-share-option
        is-with-queue-option
      />
    </template>
  </BaseProfileLibraryTabContainer>
</template>

<script>
import BaseProfileLibraryTabContainer
  from '*/components/containers/tabs/profile/library/BaseProfileLibraryTabContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'TracksTab',
  components: {
    BaseProfileLibraryTabContainer,
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
      scope: 'tracks',
      limit: 5
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
