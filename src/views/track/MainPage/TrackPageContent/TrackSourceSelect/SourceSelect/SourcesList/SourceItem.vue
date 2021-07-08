<template>
  <BaseSourceItemContainer
    :sourceId="sourceId"
    :query="query"
  >
    <template #default="slotProps">
      <BaseSourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :tracks="slotProps.tracks"
        :isWithMaxBitrate="isWithMaxBitrate"
      />
    </template>
  </BaseSourceItemContainer>
</template>

<script>
import BaseSourceItemContainer
  from '@/containers/track/source_select/BaseSourceItemContainer.vue'
import BaseSourceItemContent
  from '@/models/track/source_select/BaseSourceItemContent.vue'

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
    query: String,
    isWithMaxBitrate: Boolean
  },
  computed: {
    sourceId () {
      return this.sourceData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
