<template>
  <BaseTopPageContainer
    :is-get-data="false"
  >
    <TopSegment
      :country="country"
      @country-select="handleCountrySelect"
    />

    <ArtistsSegment
      :key="key"
      :country="country"
    />

    <AlbumsSegment
      :key="key"
      :country="country"
    />

    <TracksSegment
      :key="key"
      :country="country"
    />

    <TagsSegment
      :key="key"
      :country="country"
    />
  </BaseTopPageContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import topStore from '@/stores/top'
import BaseTopPageContainer
  from '@/components/containers/pages/top/BaseTopPageContainer.vue'
import TopSegment from './MainPage/TopSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import TagsSegment from './MainPage/TagsSegment.vue'
import {
  generateKey
} from '#/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
    TopSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    TagsSegment
  },
  data () {
    return {
      key: null,
      country: null
    }
  },
  computed: {
    ...mapState(
      topStore,
      {
        topCountry: 'country'
      }
    )
  },
  watch: {
    topCountry: {
      immediate: true,
      handler: 'handleTopCountryChange'
    }
  },
  methods: {
    handleTopCountryChange (
      value
    ) {
      this.country = value
      this.key = generateKey()
    },
    handleCountrySelect (
      value
    ) {
      this.country = value
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>
