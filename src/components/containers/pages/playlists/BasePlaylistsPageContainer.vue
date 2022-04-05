<template>
  <BasePageContainer
    :responseData="playlistsData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :playlistsData="playlistsData"
      :isLoading="isLoading"
      :error="error"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import {
  playlists as formatPlaylistsPageNavigation
} from '*/helpers/formatters/navigation'
import formatPlaylistsPageTab from '*/helpers/formatters/tabs/playlists'
import getPlaylists from '*/helpers/actions/api/playlists/get'

export default {
  name: 'BasePlaylistsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    responsePageLimit: Number
  },
  data () {
    return {
      playlistsData: null,
      error: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatPlaylistsPageNavigation()
    },
    tabData () {
      return formatPlaylistsPageTab()
    },
    playlistsArgs () {
      return {
        limit: this.responsePageLimit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getPlaylists,
    fetchData (page) {
      this.getPlaylists({
        ...this.playlistsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
