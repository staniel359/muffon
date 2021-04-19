<template>
  <BaseSourceItemContainer
    :types="types"
    :sourceId="sourceId"
    :artistName="artistName"
    :albumTitle="albumTitle"
  >
    <template #default="slotProps">
      <BaseSourceItemClickableContainer
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :albumsData="slotProps.albumsData"
        :sourceId="sourceId"
        :types="types"
      >
        <IconBlock
          :isLoading="slotProps.isLoading"
          :isError="slotProps.isError"
          :icon="icon"
        />

        <InfoBlock
          :sourceName="sourceName"
          :maxBitrate="maxBitrate"
          :isWithMaxBitrate="isWithMaxBitrate"
        />
      </BaseSourceItemClickableContainer>
    </template>
  </BaseSourceItemContainer>
</template>

<script>
import BaseSourceItemContainer
  from '@/containers/album/source_select/BaseSourceItemContainer.vue'
import BaseSourceItemClickableContainer
  from '@/containers/album/source_select/BaseSourceItemClickableContainer.vue'
import IconBlock from './SourceItem/IconBlock.vue'
import InfoBlock from './SourceItem/InfoBlock.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseSourceItemContainer,
    BaseSourceItemClickableContainer,
    IconBlock,
    InfoBlock
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
    icon () {
      return this.sourceData.icon
    },
    sourceName () {
      return this.sourceData.name
    },
    maxBitrate () {
      return this.sourceData.maxBitrate
    },
    sourceId () {
      return this.sourceData.id
    },
    types () {
      return this.sourceData.types
    }
  }
}
</script>

<style lang="sass" scoped></style>
