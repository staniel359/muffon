<template>
  <BaseArtistTabContainer
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :response-page-limit="responsePageLimit"
    :is-active="isActive"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BaseArtistShowsSimpleList
        :shows="slotProps[scope]"
      />
    </template>
  </BaseArtistTabContainer>
</template>

<script>
import BaseArtistTabContainer
  from '@/components/containers/tabs/artist/BaseArtistTabContainer.vue'
import BaseArtistShowsSimpleList
  from '@/components/lists/artist/shows/BaseArtistShowsSimpleList.vue'
import tabMixin from '@/mixins/tabMixin'
import {
  shows as showsLimits
} from '@/helpers/data/limits'

export default {
  name: 'ShowsTab',
  components: {
    BaseArtistTabContainer,
    BaseArtistShowsSimpleList
  },
  mixins: [
    tabMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      scope: 'shows',
      limit:
        showsLimits.simple.small,
      responsePageLimit: 30
    }
  }
}
</script>

<style lang="sass" scoped></style>
