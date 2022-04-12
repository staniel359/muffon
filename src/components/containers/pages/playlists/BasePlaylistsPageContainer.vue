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
      :refresh="refresh"
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
    limit: Number
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
        limit: this.limit
      }
    }
  },
  mounted () {
    this.setNavigation()

    this.fetchData()
  },
  methods: {
    getPlaylists,
    fetchData (page) {
      this.getPlaylists({
        ...this.playlistsArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
    }
  }
}
</script>

<style lang="sass" scoped></style>
