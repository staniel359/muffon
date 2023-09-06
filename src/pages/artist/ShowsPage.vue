<template>
  <BaseArtistPaginatedPageContainer
    :key="refreshKey"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistShowsSimpleList
        :shows="slotProps[scope]"
      />
    </template>
  </BaseArtistPaginatedPageContainer>
</template>

<script>
import BaseArtistPaginatedPageContainer
  from '@/components/containers/pages/artist/BaseArtistPaginatedPageContainer.vue'
import BaseArtistShowsSimpleList
  from '@/components/lists/artist/shows/BaseArtistShowsSimpleList.vue'
import pageMixin from '@/mixins/pageMixin'
import {
  shows as showsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ShowsPage',
  components: {
    BaseArtistPaginatedPageContainer,
    BaseArtistShowsSimpleList
  },
  mixins: [
    pageMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      limit:
        showsLimits.simple.large,
      scope: 'shows'
    }
  }
}
</script>

<style lang="sass" scoped></style>
