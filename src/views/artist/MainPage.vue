<template>
  <BaseArtistPageContainer
    class="page-container"
    :artist-name="artistName"
    @init="handleContainerInit"
  >
    <template #default="slotProps">
      <LeftColumn
        :artist-data="slotProps.artistData"
        :scrollable="container"
      />
      <RightColumn
        :artist-data="slotProps.artistData"
      />
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer
  from '*/components/containers/pages/artist/BaseArtistPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseArtistPageContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    artistName: String
  },
  data () {
    return {
      container: null
    }
  },
  methods: {
    handleContainerInit (
      element
    ) {
      this.container = element
    }
  }
}
</script>

<style lang="sass" scoped>
.page-container
  @extend .d-flex
</style>
