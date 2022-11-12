<template>
  <BaseAlbumSourceItemContainer
    :source="source"
    :types="types"
    :query="query"
  >
    <template
      #default="slotProps"
    >
      <SourceItemContent
        :source-data="sourceData"
        :is-loading="slotProps.isLoading"
        :is-error="slotProps.isError"
        :albums-data="slotProps.albumsData"
        :is-with-max-bitrate="isWithMaxBitrate"
      />
    </template>
  </BaseAlbumSourceItemContainer>
</template>

<script>
import BaseAlbumSourceItemContainer
  from '@/components/containers/album/BaseAlbumSourceItemContainer.vue'
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
    source () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.albumTypes
    }
  }
}
</script>

<style lang="sass" scoped></style>
