<template>
  <BaseReleasesTabContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseAlbumsTableList
        :albums="slotProps[listScope]"
        :items-in-row="itemsInRow"
        is-with-artist-name
        is-with-listeners-count
        is-with-library-option
        is-with-favorite-option
        is-with-bookmark-option
        is-with-listened-option
        is-with-share-option
        is-with-external-link-option
      />
    </template>
  </BaseReleasesTabContainer>
</template>

<script>
import BaseReleasesTabContainer
  from '@/components/containers/tabs/releases/BaseReleasesTabContainer.vue'
import BaseAlbumsTableList
  from '@/components/lists/albums/BaseAlbumsTableList.vue'
import {
  albums as albumsLimits
} from '@/helpers/data/limits'
import tabMixin from '@/mixins/tabMixin'

export default {
  name: 'NewTab',
  components: {
    BaseReleasesTabContainer,
    BaseAlbumsTableList
  },
  mixins: [
    tabMixin
  ],
  data () {
    return {
      limit:
        albumsLimits.table.small,
      itemsInRow: (
        albumsLimits.table.small / 2
      ),
      responsePageLimit: 20,
      scope: 'new',
      listScope: 'albums'
    }
  }
}
</script>

<style lang="sass" scoped></style>
