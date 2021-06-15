<template>
  <BaseArtistPageContainer
    class="page-container"
    @init="handleContainerInit"
  >
    <template #default="slotProps">
      <LeftColumn
        :artistName="slotProps.artistData.name"
        :scrollable="container"
      />
      <RightColumn :artistName="slotProps.artistData.name" />
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer
  from '@/containers/pages/artist/BaseArtistPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseArtistPageContainer,
    LeftColumn,
    RightColumn
  },
  data () {
    return {
      container: null
    }
  },
  methods: {
    handleContainerInit (el) {
      this.container = el
    }
  }
}
</script>

<style lang="sass" scoped>
.page-container
  @extend .d-flex
</style>
