<template>
  <BaseProfilePaginatedPageContainer
    :key="refreshKey"
    model="playlist"
    :profile-id="profileId"
    :scope="scope"
    :limit="limit"
    :order="order"
    :is-with-options="isSelf"
    is-with-top-segment
    is-with-order-change
  >
    <template
      #top
    >
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
      #options
    >
      <BasePlaylistsOptionsPopup
        is-with-create-option
        is-with-import-option
      />
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
import BaseLinkContainer
  from '@/components/containers/links/BaseLinkContainer.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import BasePlaylistsOptionsPopup
  from '@/components/popups/playlists/BasePlaylistsOptionsPopup.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  isCurrentProfile
} from '@/helpers/utils'
import {
  playlists as formatPlaylistsLink
} from '@/helpers/formatters/links'
import orderChangeMixin from '@/mixins/orderChangeMixin'
import pageMixin from '@/mixins/pageMixin'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePaginatedPageContainer,
    BaseLinkContainer,
    BaseButton,
    BasePlaylistsOptionsPopup,
    BasePlaylistsSimpleList
  },
  mixins: [
    orderChangeMixin,
    pageMixin
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

<style lang="sass" scoped></style>
