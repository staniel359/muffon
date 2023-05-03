<template>
  <BaseProfilePaginatedPageContainer
    model="playlist"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #top
    >
      <BasePlaylistCreateButton
        v-if="isSelf"
        class="create-button"
        is-with-redirect
      />

      <BaseLinkContainer
        :link="playlistsLink"
      >
        <BaseButton
          class="basic circular"
          :text="playlistsLinkText"
        />
      </BaseLinkContainer>
    </template>

    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        is-with-created
        is-with-share-option
        is-with-edit-option
        is-with-delete-option
      />
    </template>
  </BaseProfilePaginatedPageContainer>
</template>

<script>
import BaseProfilePaginatedPageContainer
  from '@/components/containers/pages/profile/BaseProfilePaginatedPageContainer.vue'
import BasePlaylistCreateButton
  from '@/components/buttons/playlist/BasePlaylistCreateButton.vue'
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  playlists as formatPlaylistsLink
} from '@/helpers/formatters/links'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePaginatedPageContainer,
    BasePlaylistCreateButton,
    BaseLinkContainer,
    BaseButton,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin
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
        playlistsLimits.simple.large,
      scope: 'playlists',
      order: 'createdDesc'
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    },
    playlistsLink () {
      return formatPlaylistsLink()
    },
    playlistsLinkText () {
      return this.$t(
        'links.playlists'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.create-button
  margin-right: 0.75em !important
</style>
