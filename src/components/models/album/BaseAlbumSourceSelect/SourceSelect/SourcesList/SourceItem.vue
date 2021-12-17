<template>
  <BaseAlbumSourceItemContainer
    :sourceId="sourceId"
    :types="types"
    :query="query"
  >
    <template #default="slotProps">
      <SourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :albumsData="slotProps.albumsData"
        :isWithMaxBitrate="isWithMaxBitrate"
      />
    </template>
  </BaseAlbumSourceItemContainer>
</template>

<script>
import BaseAlbumSourceItemContainer
  from '@/containers/album/BaseAlbumSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseAlbumSourceItemContainer,
    SourceItemContent
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    query: String,
    isWithMaxBitrate: Boolean
  },
  computed: {
    sourceId () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.albumTypes
    }
  }
}
</script>

<style lang="sass" scoped></style>
