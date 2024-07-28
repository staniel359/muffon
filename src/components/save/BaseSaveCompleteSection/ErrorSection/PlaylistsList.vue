<template>
  <BasePaginatedListContainer
    :response-data="playlistsData"
    :scope="scope"
    :limit="limit"
    :response-page-limit="playlistsCount"
    is-reset
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BasePlaylistsSimpleList
        :playlists="slotProps[scope]"
        :is-link="false"
        is-with-source
        is-with-external-link-option
        is-with-clear-button
        is-with-tracks
        @clear-button-click="handleClearButtonClick"
      />
    </template>
  </BasePaginatedListContainer>
</template>

<script>
import BasePaginatedListContainer
  from '@/components/containers/lists/paginated/BasePaginatedListContainer.vue'
import BasePlaylistsSimpleList
  from '@/components/lists/playlists/BasePlaylistsSimpleList.vue'
import {
  playlists as playlistsLimits
} from '@/helpers/data/limits'

export default {
  name: 'PlaylistsList',
  components: {
    BasePaginatedListContainer,
    BasePlaylistsSimpleList
  },
  inject: [
    'deleteCollectionItem'
  ],
  props: {
    playlists: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'focus'
  ],
  data () {
    return {
      limit:
        playlistsLimits.simple.large,
      scope: 'playlists'
    }
  },
  computed: {
    playlistsData () {
      return {
        page: 1,
        total_pages: 1,
        playlists: this.playlists
      }
    },
    playlistsCount () {
      return this.playlists.length
    }
  },
  methods: {
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    handleClearButtonClick (
      {
        uuid
      }
    ) {
      this.deleteCollectionItem(
        {
          collection: 'errorPlaylists',
          uuid
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
