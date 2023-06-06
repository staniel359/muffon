<template>
  <BaseArtistPageContainer
    :key="refreshKey"
    :artist-name="artistName"
    @init="handleInit"
  >
    <template
      #default="slotProps"
    >
      <div class="main-columns-container">
        <LeftColumn
          :artist-data="slotProps.artistData"
          :scrollable="scrollable"
        />

        <RightColumn
          :artist-data="slotProps.artistData"
        />
      </div>
    </template>
  </BaseArtistPageContainer>
</template>

<script>
import BaseArtistPageContainer
  from '@/components/containers/pages/artist/BaseArtistPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseArtistPageContainer,
    LeftColumn,
    RightColumn
  },
  mixins: [
    pageMixin
  ],
  props: {
    artistName: String
  },
  data () {
    return {
      scrollable: null
    }
  },
  methods: {
    handleInit (
      element
    ) {
      this.scrollable = element
    }
  }
}
</script>

<style lang="sass" scoped></style>
