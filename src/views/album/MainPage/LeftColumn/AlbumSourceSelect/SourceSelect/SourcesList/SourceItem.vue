<template>
  <BaseSourceItemContainer
    :sourceId="sourceId"
    :types="types"
    :query="query"
  >
    <template #default="slotProps">
      <BaseSourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :albumsData="slotProps.albumsData"
        :isWithMaxBitrate="isWithMaxBitrate"
      />
    </template>
  </BaseSourceItemContainer>
</template>

<script>
import BaseSourceItemContainer
  from '@/containers/album/source_select/BaseSourceItemContainer.vue'
import BaseSourceItemContent
  from '@/models/album/source_select/BaseSourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseSourceItemContainer,
    BaseSourceItemContent
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    artistName: String,
    albumTitle: String,
    isWithMaxBitrate: Boolean
  },
  computed: {
    sourceId () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.types
    },
    query () {
      return `${this.artistName} - ${this.albumTitle}`
    }
  }
}
</script>

<style lang="sass" scoped></style>
