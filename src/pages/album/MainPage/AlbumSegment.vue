<template>
  <BaseSegmentContainer
    class="main-page-segment-container"
    :is-loading="isLoading"
    :error="error"
    @init="handleInit"
    @refresh="handleRefresh"
  >
    <div class="main-columns-container">
      <LeftColumn
        v-if="scrollable"
        :album-data="albumData"
        :scrollable="scrollable"
      />

      <RightColumn
        :album-data="albumData"
        :request-album-data="requestAlbumData"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import LeftColumn from './AlbumSegment/LeftColumn.vue'
import RightColumn from './AlbumSegment/RightColumn.vue'

export default {
  name: 'AlbumSegment',
  components: {
    BaseSegmentContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    albumData: Object,
    requestAlbumData: Object,
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'refresh'
  ],
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
    },
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>
