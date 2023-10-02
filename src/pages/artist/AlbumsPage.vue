<template>
  <BaseArtistPaginatedPageContainer
    ref="page"
    :key="refreshKey"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :view-id="viewId"
    is-with-top-segment
    is-with-view-change
  >
    <template
      #top
    >
      <BaseSearchButton
        scope="sources"
        :is-active="isShowSourceSelect"
        @click="handleSearchButtonClick"
      />
    </template>

    <template
      #topExtra="topExtraSlotProps"
    >
      <div
        v-if="isSourceSelectCalled"
        v-show="isShowSourceSelect"
        class="main-bottom-section"
      >
        <BaseArtistAlbumsSourceSelect
          :artist-name="topExtraSlotProps.artistName"
        />
      </div>
    </template>

    <template
      #default="slotProps"
    >
      <BaseAlbumsList
        :albums="slotProps[scope]"
        :artist-name="slotProps.artistName"
        :view-id="viewId"
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
        is-with-multiple-artist-names
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseSearchButton from '@/components/buttons/BaseSearchButton.vue'
import BaseArtistAlbumsSourceSelect
  from '@/components/models/artist/BaseArtistAlbumsSourceSelect.vue'
import BaseAlbumsList from '@/components/lists/albums/BaseAlbumsList.vue'
import viewChangeMixin from '@/mixins/viewChangeMixin'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'AlbumsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseSearchButton,
    BaseArtistAlbumsSourceSelect,
    BaseAlbumsList
  },
  mixins: [
    viewChangeMixin,
    pageMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      isSourceSelectCalled: false,
      isShowSourceSelect: false,
      scope: 'albums'
    }
  },
  methods: {
    handleSearchButtonClick () {
      this.isSourceSelectCalled = true

      this.isShowSourceSelect =
        !this.isShowSourceSelect
    }
  }
}
</script>

<style lang="sass" scoped></style>
