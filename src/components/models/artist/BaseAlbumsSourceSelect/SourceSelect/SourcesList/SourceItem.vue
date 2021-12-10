<template>
  <BaseSourceItemContainer
    :sourceId="sourceId"
    :query="query"
  >
    <template #default="slotProps">
      <SourceItemContent
        :sourceData="sourceData"
        :isLoading="slotProps.isLoading"
        :isError="slotProps.isError"
        :artists="slotProps.artists"
      />
    </template>
  </BaseSourceItemContainer>
</template>

<script>
import BaseSourceItemContainer
  from '@/containers/artist/BaseSourceItemContainer.vue'
import SourceItemContent from './SourceItem/SourceItemContent.vue'

export default {
  name: 'SourceItem',
  components: {
    BaseSourceItemContainer,
    SourceItemContent
  },
  props: {
    sourceData: {
      type: Object,
      required: true
    },
    query: String
  },
  computed: {
    sourceId () {
      return this.sourceData.id
    }
  }
}
</script>

<style lang="sass" scoped></style>
